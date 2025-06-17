import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { STORY_THEMES, STORY_CHARACTERS, GEMINI_TEXT_MODEL } from '../constants';
import { LoadingState, GeneratedStoryContent, SyllabifiedWord } from '../types';
import KidFriendlyButton from './KidFriendlyButton';
import LoadingSpinner from './LoadingSpinner';
import StoryInteractionDisplay from './StoryInteractionDisplay';
import { LightBulbIcon } from './Icons';
import { parseGeminiJsonResponse } from '../utils';


const StoryCreator: React.FC = () => {
  const [theme, setTheme] = useState<string>(STORY_THEMES[0]);
  const [character, setCharacter] = useState<string>(STORY_CHARACTERS[0]);
  
  const [storyContent, setStoryContent] = useState<GeneratedStoryContent | null>(null);
  const [flatSyllables, setFlatSyllables] = useState<SyllabifiedWord[]>([]);
  const [storyKey, setStoryKey] = useState<string>(Date.now().toString()); // Used to reset StoryInteractionDisplay

  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;

  const generateStory = useCallback(async () => {
    if (!apiKey) {
      setError("Chave de API não configurada. A aventura não pode começar! 🔑");
      setLoadingState(LoadingState.ERROR);
      return;
    }
    
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setStoryContent(null);
    setFlatSyllables([]);
    setStoryKey(Date.now().toString()); // Reset story display early

    const ai = new GoogleGenAI({ apiKey });

    const storyPrompt = `Crie uma história curta, divertida e fácil de ler para uma criança de 6 anos.
A história deve ser sobre "${character}" em uma aventura na "${theme}".
Use frases simples e palavras comuns. A história deve ter cerca de 3 a 5 parágrafos curtos.
Faça com que seja emocionante e feliz, com uma mensagem positiva se possível.

Responda em formato JSON com a seguinte estrutura:
{
  "storyTitle": "Um Título Criativo para a História",
  "storyParagraphs": ["Parágrafo 1...", "Parágrafo 2...", "Parágrafo 3..."],
  "syllabifiedWords": [ /* Array de palavras, cada palavra um array de suas sílabas em português do Brasil. Ex: [["O"], ["ga","to"], ["pas","se","ar","."]] */ ]
}
Para "syllabifiedWords", divida TODAS as palavras dos "storyParagraphs" em sílabas fonéticas. Se uma palavra for monossílaba (ex: "sol", "um", "a"), coloque-a como um array de uma única sílaba (ex: [["sol"]]). Inclua pontuação como parte da última sílaba da palavra ou como uma "sílaba" separada se fizer sentido para a leitura (ex: [[".PontoFinal"]]). Certifique-se que a contagem de palavras em syllabifiedWords corresponde ao conteúdo de storyParagraphs.
Exemplo para "O gato.": [["O"], ["ga","to","."]] ou [["O"], ["ga","to"], [".PontoFinal"]]
`;

    try {
      const textResponse: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: storyPrompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Você é um contador de histórias mágico e um excelente linguista especializado em fonética portuguesa para crianças de 5 a 8 anos. Suas histórias são sempre positivas, cheias de imaginação e fáceis de entender. As sílabas fornecidas devem ser perfeitas para a leitura infantil.",
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        }
      });
      
      const parsedTextData = parseGeminiJsonResponse(textResponse.text);

      if (parsedTextData && parsedTextData.storyParagraphs && parsedTextData.syllabifiedWords) {
        let generatedStory: GeneratedStoryContent = { ...parsedTextData, storyImageBase64: undefined };
        
        // Now, try to generate the image
        const imagePrompt = `Crie uma imagem no estilo de página para colorir para crianças, com linhas pretas grossas e claras em um fundo branco, sem preenchimento de cor ou sombreamento. A imagem deve ser divertida e simples, adequada para crianças pequenas colorirem. O tema é '${theme}' e o personagem principal é '${character}'. Concentre-se no personagem em uma cena simples e clara relacionada ao tema. Formato retrato, ideal para uma página A4.`;
        
        try {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002',
                prompt: imagePrompt,
                config: { numberOfImages: 1, outputMimeType: 'image/png' },
            });
            if (imageResponse.generatedImages && imageResponse.generatedImages.length > 0) {
                generatedStory.storyImageBase64 = imageResponse.generatedImages[0].image.imageBytes;
            }
        } catch (imgErr) {
            console.warn("Image generation failed, proceeding with text only:", imgErr);
            // Optionally set a specific part of the error state or just log it
        }

        setStoryContent(generatedStory);
        const newFlatSyllables: SyllabifiedWord[] = [];
        let wordCounter = 0;
        generatedStory.syllabifiedWords?.forEach((wordSyllables: string[], wordIdxOverall: number) => {
          const originalWordText = wordSyllables.join('');
          wordSyllables.forEach((syllableText: string, syllableInWordIdx: number) => {
            newFlatSyllables.push({
              text: syllableText,
              wordIndex: wordCounter,
              syllableInWordIndex: syllableInWordIdx,
              originalWordText: originalWordText 
            });
          });
          wordCounter++;
        });
        setFlatSyllables(newFlatSyllables);
        // setStoryKey(Date.now().toString()); // Already set at the beginning of loading
        setLoadingState(LoadingState.SUCCESS);

      } else {
        console.error("Parsed text data is not in expected format:", parsedTextData);
        setError("A Mágica falhou ao organizar a história. 🪄 Tente novamente!");
        setLoadingState(LoadingState.ERROR);
      }
    } catch (err) {
      console.error("Error generating story or image:", err);
      setError("Oops! Algo deu errado ao criar a história ou o desenho. Tente novamente ou peça ajuda a um adulto. 🧙‍♂️✨");
      setLoadingState(LoadingState.ERROR);
    }
  }, [theme, character, apiKey]);
  
  const selectStyles = "w-full p-3 border-2 border-sky-300 rounded-lg text-lg focus:border-sky-500 focus:ring-sky-500 transition-colors bg-white shadow-sm";

  const isStoryInteractionDisabled = loadingState === LoadingState.LOADING;


  return (
    <div className="space-y-6">
      <p className="text-lg text-slate-700">
        Escolha um tema e um personagem para sua aventura! Depois, clique em "Criar História!" e veja a mágica acontecer.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="theme-select" className="block text-xl font-semibold text-sky-700 mb-2">Tema da História:</label>
          <select 
            id="theme-select" 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className={selectStyles}
            disabled={isStoryInteractionDisabled}
          >
            {STORY_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="character-select" className="block text-xl font-semibold text-sky-700 mb-2">Personagem Principal:</label>
          <select 
            id="character-select" 
            value={character} 
            onChange={(e) => setCharacter(e.target.value)}
            className={selectStyles}
            disabled={isStoryInteractionDisabled}
          >
            {STORY_CHARACTERS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      
      <div className="text-center">
        <KidFriendlyButton 
          onClick={generateStory} 
          disabled={isStoryInteractionDisabled}
          variant="primary"
          icon={<LightBulbIcon className="w-6 h-6"/>}
          aria-label="Gerar nova história com desenho para colorir"
        >
          {loadingState === LoadingState.LOADING ? 'Criando...' : 'Criar História!'}
        </KidFriendlyButton>
      </div>

      {loadingState === LoadingState.LOADING && <LoadingSpinner />}
      
      {error && (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow">
          <p className="font-semibold">Erro na Aventura!</p>
          <p>{error}</p>
        </div>
      )}

      {loadingState === LoadingState.SUCCESS && storyContent && (storyContent.storyParagraphs.length > 0 || storyContent.storyImageBase64) && (
        <StoryInteractionDisplay
          storyContent={storyContent}
          flatSyllables={flatSyllables} // May be empty if only image succeeded, but usually text is primary
          sectionTitle={storyContent.storyTitle || "Sua História Incrível:"}
          storyKey={storyKey}
        />
      )}
    </div>
  );
};

export default StoryCreator;