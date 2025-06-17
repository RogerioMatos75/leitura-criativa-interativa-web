
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas'; // No longer primary for PDF text, but keep for potential future use
import { GeneratedStoryContent, SyllabifiedWord } from '../types';
import KidFriendlyButton from './KidFriendlyButton';
import { SpeakerWaveIcon, StopIcon, ChevronRightIcon, ChevronLeftIcon, MicrophoneIcon, PrinterIcon } from './Icons';

interface StoryInteractionDisplayProps {
  storyContent: GeneratedStoryContent;
  flatSyllables: SyllabifiedWord[];
  sectionTitle: string;
  storyKey: string; // Unique key to reset component state when story changes
}

// No longer attempting to embed custom fonts for PDF, relying on jsPDF standards.
// const CAVEAT_REGULAR_BASE64 = 'PLACEHOLDER_FOR_CAVEAT_REGULAR_TTF_BASE64_STRING...';
// const CAVEAT_BOLD_BASE64 = 'PLACEHOLDER_FOR_CAVEAT_BOLD_TTF_BASE64_STRING...';


const StoryInteractionDisplay: React.FC<StoryInteractionDisplayProps> = ({ storyContent, flatSyllables, sectionTitle, storyKey }) => {
  const [isMigReadingStory, setIsMigReadingStory] = useState<boolean>(false);
  const [currentSpokenWordIndex, setCurrentSpokenWordIndex] = useState<number | null>(null);
  const storyWordsRef = useRef<string[]>([]);

  const [isSyllablePracticeMode, setIsSyllablePracticeMode] = useState<boolean>(false);
  const [currentSyllablePracticeIdx, setCurrentSyllablePracticeIdx] = useState<number>(0);
  const [migSpeakingSyllable, setMigSpeakingSyllable] = useState<boolean>(false);
  const [childsTurnToRepeatSyllable, setChildsTurnToRepeatSyllable] = useState<boolean>(false);
  
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const speechSynthesisRef = useRef(window.speechSynthesis);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsMigReadingStory(false);
    setCurrentSpokenWordIndex(null);
    setIsSyllablePracticeMode(false);
    setCurrentSyllablePracticeIdx(0);
    setMigSpeakingSyllable(false);
    setChildsTurnToRepeatSyllable(false);
    setSpeechError(null);
    setIsPrinting(false);
    if (speechSynthesisRef.current && currentUtteranceRef.current) {
        speechSynthesisRef.current.cancel();
        currentUtteranceRef.current = null;
    }
    storyWordsRef.current = storyContent.storyParagraphs.join(' ').split(/\s+/).filter(Boolean);
  }, [storyKey, storyContent]);


  const speakText = useCallback((text: string, onEnd?: () => void, onBoundary?: (event: SpeechSynthesisEvent) => void, lang: string = "pt-BR") => {
    stopMigSpeakingInternal(); 
    if (!speechSynthesisRef.current) return;
    setSpeechError(null);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0; 

    const voices = speechSynthesisRef.current.getVoices().filter(v => v.lang.startsWith("pt-BR"));
    const maleVoice = voices.find(v => 
      v.name.toLowerCase().includes("male") || 
      v.name.toLowerCase().includes("homem") || 
      v.name.toLowerCase().includes("masculino") ||
      v.name.toLowerCase().includes("ricardo") || 
      v.name.toLowerCase().includes("felipe") 
    );
    const googleVoice = voices.find(v => v.name.toLowerCase().includes("google")); 

    if (maleVoice) utterance.voice = maleVoice;
    else if (googleVoice) utterance.voice = googleVoice;
    else if (voices.length > 0) utterance.voice = voices[0];

    utterance.onend = () => {
      currentUtteranceRef.current = null;
      if (onEnd) onEnd();
    };
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      setSpeechError(`MIG teve um probleminha na voz: ${event.error}. Tente recarregar a página.`);
      currentUtteranceRef.current = null;
      if (onEnd) onEnd(); 
    };
    if (onBoundary) utterance.onboundary = onBoundary;
    
    currentUtteranceRef.current = utterance;
    speechSynthesisRef.current.speak(utterance);
  }, []); 


  const stopMigSpeakingInternal = useCallback(() => {
    if (speechSynthesisRef.current && currentUtteranceRef.current) {
      speechSynthesisRef.current.cancel();
      currentUtteranceRef.current = null;
    }
  }, []);

  const stopMigSpeakingAndResetStates = useCallback(() => {
    stopMigSpeakingInternal();
    setIsMigReadingStory(false);
    setCurrentSpokenWordIndex(null);
    setMigSpeakingSyllable(false);
  }, [stopMigSpeakingInternal]);
  
  const handleReadStoryFull = useCallback(() => {
    if (isMigReadingStory) return;
    const fullStoryText = storyContent.storyParagraphs.join('\n\n');
    setIsMigReadingStory(true);
    setCurrentSpokenWordIndex(null); 
    speakText(fullStoryText, 
      () => { 
        setIsMigReadingStory(false);
        setCurrentSpokenWordIndex(null);
      },
      (event: SpeechSynthesisEvent) => { 
        if (event.name === 'word') {
           setCurrentSpokenWordIndex(prevIndex => (prevIndex === null ? 0 : prevIndex + 1));
        }
      }
    );
  }, [storyContent, isMigReadingStory, speakText]);

  const speakCurrentSyllableForPractice = useCallback((syllableIndex: number) => {
    if (syllableIndex < 0 || syllableIndex >= flatSyllables.length) return;
    
    const syllableToSpeak = flatSyllables[syllableIndex].text;
    setMigSpeakingSyllable(true);
    setChildsTurnToRepeatSyllable(false);
    
    speakText(syllableToSpeak, () => {
      setMigSpeakingSyllable(false);
      setChildsTurnToRepeatSyllable(true);
    });
  }, [flatSyllables, speakText]);

  const startSyllablePractice = useCallback(() => {
    if (flatSyllables.length === 0) return;
    stopMigSpeakingAndResetStates();
    setIsSyllablePracticeMode(true);
    setCurrentSyllablePracticeIdx(0);
    setChildsTurnToRepeatSyllable(false);
    speakCurrentSyllableForPractice(0);
  }, [flatSyllables, stopMigSpeakingAndResetStates, speakCurrentSyllableForPractice]); 

  const handleNextSyllable = useCallback(() => {
    if (migSpeakingSyllable) return;
    const nextIdx = currentSyllablePracticeIdx + 1;
    if (nextIdx < flatSyllables.length) {
      setCurrentSyllablePracticeIdx(nextIdx);
      speakCurrentSyllableForPractice(nextIdx);
    } else {
      setChildsTurnToRepeatSyllable(false); 
    }
  }, [migSpeakingSyllable, currentSyllablePracticeIdx, flatSyllables.length, speakCurrentSyllableForPractice]);
  
  const handlePreviousSyllable = useCallback(() => {
    if (migSpeakingSyllable) return;
    const prevIdx = currentSyllablePracticeIdx - 1;
    if (prevIdx >= 0) {
      setCurrentSyllablePracticeIdx(prevIdx);
      speakCurrentSyllableForPractice(prevIdx);
    }
  }, [migSpeakingSyllable, currentSyllablePracticeIdx, speakCurrentSyllableForPractice]);

  const exitSyllablePractice = useCallback(() => {
    stopMigSpeakingAndResetStates();
    setIsSyllablePracticeMode(false);
    setCurrentSyllablePracticeIdx(0);
    setMigSpeakingSyllable(false);
    setChildsTurnToRepeatSyllable(false);
  }, [stopMigSpeakingAndResetStates]);
  
  useEffect(() => {
    const loadVoices = () => {
        if (!speechSynthesisRef.current) return;
        let voices = speechSynthesisRef.current.getVoices();
        if (voices.length === 0) {
            speechSynthesisRef.current.onvoiceschanged = () => {
                 speechSynthesisRef.current.onvoiceschanged = null; 
            };
        }
    };
    loadVoices();
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
         if(typeof speechSynthesisRef.current.onvoiceschanged === 'function') {
            speechSynthesisRef.current.onvoiceschanged = null;
        }
      }
    };
  }, []);

  const handlePrintStory = useCallback(async () => {
    if (!storyContent) return;
    setIsPrinting(true);
    setSpeechError(null); // Clear previous errors

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    try {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // mm
      let currentY = margin;

      if (storyContent.storyImageBase64) {
          try {
              const imgData = `data:image/png;base64,${storyContent.storyImageBase64}`;
              const imgProps = pdf.getImageProperties(imgData);
              
              const aspectRatio = imgProps.width / imgProps.height;
              let imgWidth = pageWidth - 2 * margin;
              let imgHeight = imgWidth / aspectRatio;

              const maxImageHeight = pageHeight * 0.45; 
              if (imgHeight > maxImageHeight) {
                  imgHeight = maxImageHeight;
                  imgWidth = imgHeight * aspectRatio;
              }
              
              const imgX = (pageWidth - imgWidth) / 2;
              pdf.addImage(imgData, 'PNG', imgX, currentY, imgWidth, imgHeight);
              currentY += imgHeight + 10; 
          } catch (imgError) {
              console.error("Error adding image to PDF:", imgError);
          }
      }

      if (storyContent.storyTitle) {
          if (currentY + 20 > pageHeight - margin) { 
              pdf.addPage();
              currentY = margin;
          }
          pdf.setFontSize(24);
          // Use a standard jsPDF font (e.g., Helvetica)
          pdf.setFont('Helvetica', 'bold'); 

          const titleText = storyContent.storyTitle;
          const titleLines = pdf.splitTextToSize(titleText, pageWidth - 2 * margin);
          pdf.text(titleLines, pageWidth / 2, currentY, { align: 'center' });
          currentY += (titleLines.length * 9) + 10;
      }
      
      // Use a standard jsPDF font (e.g., Helvetica)
      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(20); 
      const lineHeight = 14; 

      storyContent.storyParagraphs.forEach(paragraph => {
          const paragraphLines = pdf.splitTextToSize(paragraph, pageWidth - 2 * margin);
          paragraphLines.forEach((line: string) => {
              if (currentY + lineHeight > pageHeight - margin) {
                  pdf.addPage();
                  currentY = margin;
              }
              pdf.text(line, margin, currentY);
              currentY += lineHeight;
          });
          currentY += lineHeight / 2; 
      });
      
      pdf.save(`${(storyContent.storyTitle || 'minha-historia').toLowerCase().replace(/\s+/g, '-')}-com-desenho.pdf`);

    } catch (error) {
        console.error("Error generating PDF:", error);
        setSpeechError("Oops! Algo deu errado ao tentar criar o PDF da história.");
    } finally {
        setIsPrinting(false);
    }
  }, [storyContent]);


  const renderStoryForSyllablePractice = () => {
    if (!storyContent.syllabifiedWords || flatSyllables.length === 0) return null;
    let currentFlatSyllableCounter = 0;
    
    return storyContent.syllabifiedWords.map((wordSyllables, wordSetIndex) => {
      if (!Array.isArray(wordSyllables)) return <span key={`invalid-word-${wordSetIndex}-${storyKey}`}></span>;

      return (
        <span key={`word-${wordSetIndex}-${storyKey}`} className="inline-block mr-1.5">
          {wordSyllables.map((syllableText, syllableInWordIdx) => {
            const isCurrentSyllable = currentFlatSyllableCounter === currentSyllablePracticeIdx;
            let highlightClass = "";
            if (isCurrentSyllable) {
              if (migSpeakingSyllable) {
                highlightClass = "bg-yellow-300 text-yellow-900 animate-pulse";
              } else if (childsTurnToRepeatSyllable) {
                highlightClass = "bg-green-300 text-green-900";
              }
            }
            const currentSyllableRenderKey = `syllable-${wordSetIndex}-${syllableInWordIdx}-${currentFlatSyllableCounter}-${storyKey}`;
            currentFlatSyllableCounter++;
            return (
              <span key={currentSyllableRenderKey} className={`px-0.5 rounded ${highlightClass} transition-all duration-200`}>
                {syllableText}
              </span>
            );
          })}
        </span>
      );
    }).filter(Boolean); 
  };

  const hasContentToDisplay = storyContent.storyParagraphs.length > 0 || storyContent.storyImageBase64;

  if (!hasContentToDisplay && !isSyllablePracticeMode) { 
    return null;
  }

  return (
    <div className={`mt-8 p-6 ${isSyllablePracticeMode ? 'bg-purple-50/80 border-purple-300' : 'bg-sky-50/70 border-sky-200'} backdrop-blur-sm rounded-xl shadow-inner border space-y-4`} key={storyKey}>
      
      {!isSyllablePracticeMode && storyContent.storyImageBase64 && (
        <div className="mb-6 text-center">
          <img 
            src={`data:image/png;base64,${storyContent.storyImageBase64}`} 
            alt="Desenho para colorir da história" 
            className="max-w-md mx-auto rounded-lg border-2 border-slate-300 shadow-md"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
      )}
      
      <h3 className={`text-2xl font-bold ${isSyllablePracticeMode ? 'text-purple-700' : 'text-sky-700'} mb-4 text-center`}>
        {isSyllablePracticeMode ? "Vamos Praticar as Sílabas!" : sectionTitle}
      </h3>

      {speechError && (
        <div className="my-2 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow">
          <p>{speechError}</p>
        </div>
      )}

      {!isSyllablePracticeMode && storyContent.storyParagraphs.length > 0 && (
        <>
          <div className="text-slate-800 space-y-3 whitespace-pre-wrap">
            {(() => {
              let overallWordRenderIndex = 0; 
              return storyContent.storyParagraphs.map((paragraph, paraIndex) => {
                const segments = paragraph.split(/(\s+)/); 
                const paragraphElements: (string | JSX.Element)[] = [];

                segments.forEach((segment, segIdx) => {
                  if (segment.match(/^\s+$/)) { 
                    paragraphElements.push(segment); 
                  } else if (segment) { 
                    const isSpoken = isMigReadingStory && currentSpokenWordIndex === overallWordRenderIndex;
                    paragraphElements.push(
                      <span
                        key={`word-${paraIndex}-${segIdx}-${overallWordRenderIndex}-${storyKey}`}
                        className={isSpoken ? "bg-yellow-300 px-0.5 rounded" : ""}
                      >
                        {segment}
                      </span>
                    );
                    overallWordRenderIndex++; 
                  }
                });

                return <p key={`para-${paraIndex}-${storyKey}`} className="font-['Caveat'] text-2xl leading-relaxed tracking-wide text-slate-900">{paragraphElements.map((el, i) => <React.Fragment key={`pfrag-${paraIndex}-${i}-${storyKey}`}>{el}</React.Fragment>)}</p>;
              });
            })()}
          </div>
        </>
      )}
      
      {!isSyllablePracticeMode && (
         <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-sky-200 mt-4">
            {storyContent.storyParagraphs.length > 0 && ( 
              <>
                <KidFriendlyButton 
                  onClick={handleReadStoryFull} 
                  disabled={isMigReadingStory || isSyllablePracticeMode || isPrinting}
                  variant="secondary"
                  icon={<SpeakerWaveIcon className="w-5 h-5"/>}
                  aria-label={isMigReadingStory ? "MIG está lendo" : "MIG Ler História Completa"}
                >
                  {isMigReadingStory ? 'MIG Lendo...' : 'Ouvir com MIG'}
                </KidFriendlyButton>
                {isMigReadingStory && (
                  <KidFriendlyButton 
                    onClick={stopMigSpeakingAndResetStates} 
                    variant="secondary"
                    icon={<StopIcon className="w-5 h-5"/>}
                    className="bg-red-500 hover:bg-red-600 focus:ring-red-300"
                    aria-label="Parar leitura de MIG"
                    disabled={isPrinting}
                  >
                    Parar MIG
                  </KidFriendlyButton>
                )}
              </>
            )}
            {flatSyllables.length > 0 && storyContent.storyParagraphs.length > 0 && (
              <KidFriendlyButton 
                onClick={startSyllablePractice}
                disabled={isMigReadingStory || isSyllablePracticeMode || isPrinting}
                variant="primary"
                className="bg-green-500 hover:bg-green-600 focus:ring-green-300 text-white"
                icon={<MicrophoneIcon className="w-5 h-5"/>}
                aria-label="Iniciar prática de leitura de sílabas com MIG"
              >
                Praticar Sílabas
              </KidFriendlyButton>
            )}
            <KidFriendlyButton 
                onClick={handlePrintStory}
                disabled={isPrinting || isMigReadingStory || isSyllablePracticeMode}
                variant="primary"
                className="bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-300 text-white"
                icon={<PrinterIcon className="w-5 h-5"/>}
                aria-label="Imprimir história para praticar escrita"
              >
                {isPrinting ? 'Imprimindo...' : 'Imprimir para Escrever'}
            </KidFriendlyButton>
          </div>
      )}


      {isSyllablePracticeMode && (
        <>
          {currentSyllablePracticeIdx < flatSyllables.length && (
            <div className="text-center my-3 p-3 bg-white/70 rounded-lg">
              <p className="text-lg text-purple-600">
                {migSpeakingSyllable && `MIG está lendo: "${flatSyllables[currentSyllablePracticeIdx].text}"`}
                {childsTurnToRepeatSyllable && `Sua vez! Repita a sílaba destacada:`}
              </p>
               <div className="my-2 text-4xl font-bold text-purple-800 p-4 bg-white rounded-md shadow min-h-[70px] flex items-center justify-center">
                 {flatSyllables[currentSyllablePracticeIdx]?.originalWordText}
               </div>
            </div>
          )}

          <div className="text-2xl md:text-3xl text-slate-800 leading-relaxed my-6 p-4 bg-white/50 rounded-lg min-h-[100px] text-center" aria-live="polite">
            {renderStoryForSyllablePractice()}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-3 mt-6">
            <KidFriendlyButton 
              onClick={handlePreviousSyllable} 
              disabled={migSpeakingSyllable || currentSyllablePracticeIdx === 0}
              variant="secondary"
              icon={<ChevronLeftIcon className="w-6 h-6"/>}
              aria-label="Sílaba anterior"
            >
              Anterior
            </KidFriendlyButton>
            
            <div className="text-lg text-purple-700 font-semibold">
              Sílaba {currentSyllablePracticeIdx + 1} de {flatSyllables.length}
            </div>

            <KidFriendlyButton 
              onClick={handleNextSyllable} 
              disabled={migSpeakingSyllable || currentSyllablePracticeIdx >= flatSyllables.length - 1}
              variant="secondary"
              icon={<ChevronRightIcon className="w-6 h-6"/>}
              aria-label="Próxima sílaba"
            >
              {childsTurnToRepeatSyllable ? "Já Li! Próxima!" : "Próxima"}
            </KidFriendlyButton>
          </div>
           <div className="text-center mt-8">
            <KidFriendlyButton 
                onClick={exitSyllablePractice}
                variant="primary"
                className="bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white"
                icon={<StopIcon className="w-5 h-5"/>}
                aria-label="Sair do modo de prática de sílabas"
              >
                Sair da Prática
              </KidFriendlyButton>
           </div>
        </>
      )}
    </div>
  );
};

export default StoryInteractionDisplay;
