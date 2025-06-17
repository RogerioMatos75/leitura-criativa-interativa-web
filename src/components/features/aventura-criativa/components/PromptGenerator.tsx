
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_TEXT_MODEL } from '../constants';
import { LoadingState, GeneratedStoryContent, SyllabifiedWord } from '../types';
import KidFriendlyButton from './KidFriendlyButton';
import LoadingSpinner from './LoadingSpinner';
import StoryInteractionDisplay from './StoryInteractionDisplay';
import { ChatBubbleLeftRightIcon, LightBulbIcon } from './Icons';
import { parseGeminiJsonResponse } from '../utils';

const PromptGenerator: React.FC = () => {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loadingPromptsState, setLoadingPromptsState] = useState<LoadingState>(LoadingState.IDLE);
  const [promptsError, setPromptsError] = useState<string | null>(null);

  const [customIdea, setCustomIdea] = useState<string>("");
  const [customStoryContent, setCustomStoryContent] = useState<GeneratedStoryContent | null>(null);
  const [customFlatSyllables, setCustomFlatSyllables] = useState<SyllabifiedWord[]>([]);
  const [customStoryLoadingState, setCustomStoryLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [customStoryError, setCustomStoryError] = useState<string | null>(null);
  const [customStoryKey, setCustomStoryKey] = useState<string>(Date.now().toString());


  const apiKey = process.env.API_KEY;

  const fetchPrompts = useCallback(async () => {
    if (!apiKey) {
      setPromptsError("Chave de API não configurada. As ideias não podem fluir! 🔑");
      setLoadingPromptsState(LoadingState.ERROR);
      return;
    }

    setLoadingPromptsState(LoadingState.LOADING);
    setPromptsError(null);
    setPrompts([]);

    const ai = new GoogleGenAI({ apiKey });
    const requestPrompt = "Gere 3 ideias simples e divertidas para uma criança de 7 anos começar a escrever uma história. Cada ideia deve ser uma pergunta curta ou um cenário 'Imagine se...'. Formate como uma lista numerada concisa.";

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: requestPrompt,
        config: {
          systemInstruction: "Você é um gerador de ideias super criativo para crianças de 5 a 8 anos. Suas ideias são sempre inspiradoras, curtas e fáceis de entender.",
          temperature: 0.9,
        }
      });
      const generatedText = response.text;
      const parsedPrompts = generatedText
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0 && /^\d+\.|^-|^•/.test(p))
        .map(p => p.replace(/^\d+\.|^-|^•\s*/, '').trim())
        .filter(p => p.length > 5); 

      if (parsedPrompts.length > 0) {
        setPrompts(parsedPrompts);
      } else {
        setPrompts([generatedText.length > 150 ? "Muitas ideias! Tente gerar de novo para ver algumas." : generatedText]); 
      }
      setLoadingPromptsState(LoadingState.SUCCESS);
    } catch (err) {
      console.error("Error fetching prompts:", err);
      setPromptsError("Oops! Tive um probleminha para buscar novas ideias. Tente de novo! 💡✨");
      setLoadingPromptsState(LoadingState.ERROR);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);


  const handleGenerateCustomStory = useCallback(async () => {
    if (!customIdea.trim()) {
      setCustomStoryError("Por favor, escreva sua ideia para a história primeiro! ✨");
      return;
    }
    if (!apiKey) {
      setCustomStoryError("Chave de API não configurada. A aventura não pode começar! 🔑");
      setCustomStoryLoadingState(LoadingState.ERROR);
      return;
    }

    setCustomStoryLoadingState(LoadingState.LOADING);
    setCustomStoryError(null);
    setCustomStoryContent(null);
    setCustomFlatSyllables([]);
    setCustomStoryKey(Date.now().toString()); // Reset story display early

    const ai = new GoogleGenAI({ apiKey });
    const storyPrompt = `Um usuário forneceu a seguinte ideia para uma história infantil: "${customIdea}".
Por favor, transforme esta ideia em uma história curta (3-5 parágrafos), divertida, fácil de ler e com mensagem positiva para uma criança de 7 anos.

Responda em formato JSON com a seguinte estrutura:
{
  "storyTitle": "Um Título Criativo para a História Baseada na Ideia",
  "storyParagraphs": ["Parágrafo 1...", "Parágrafo 2...", "Parágrafo 3..."],
  "syllabifiedWords": [ /* Array de palavras, cada palavra um array de suas sílabas em português do Brasil. Ex: [["A"], ["i","de","ia"], ["foi","..."]] */ ]
}
Para "syllabifiedWords", divida TODAS as palavras dos "storyParagraphs" em sílabas fonéticas corretas para o português do Brasil. Palavras monossílabas (ex: "sol", "um") devem ser um array de uma sílaba (ex: [["sol"]]). Inclua pontuação como parte da última sílaba da palavra ou como uma "sílaba" separada. A contagem de palavras em syllabifiedWords deve corresponder ao conteúdo de storyParagraphs.
Exemplo para "A casa.": [["A"], ["ca","sa","."]]
`;

    try {
      const textResponse: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: storyPrompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "Você é um contador de histórias mágico e um excelente linguista especializado em fonética portuguesa para crianças de 5 a 8 anos. Suas histórias são sempre positivas, cheias de imaginação e fáceis de entender. As sílabas fornecidas devem ser perfeitas para a leitura infantil.",
          temperature: 0.75,
          topP: 0.95,
          topK: 40,
        }
      });

      const parsedTextData = parseGeminiJsonResponse(textResponse.text);

      if (parsedTextData && parsedTextData.storyParagraphs && parsedTextData.syllabifiedWords) {
        let generatedStory: GeneratedStoryContent = { ...parsedTextData, storyImageBase64: undefined };

        const imagePrompt = `Crie uma imagem no estilo de página para colorir para crianças, com linhas pretas grossas e claras em um fundo branco, sem preenchimento de cor ou sombreamento. A imagem deve ser divertida e simples, adequada para crianças pequenas colorirem. A imagem deve ser baseada na seguinte ideia: "${customIdea}". Concentre-se nos elementos principais da ideia. Formato retrato, ideal para uma página A4.`;
        
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
            console.warn("Custom story image generation failed, proceeding with text only:", imgErr);
        }

        setCustomStoryContent(generatedStory);
        const newFlatSyllables: SyllabifiedWord[] = [];
        let wordCounter = 0;
        generatedStory.syllabifiedWords?.forEach((wordSyllables: string[]) => {
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
        setCustomFlatSyllables(newFlatSyllables);
        // setCustomStoryKey(Date.now().toString()); // Already set
        setCustomStoryLoadingState(LoadingState.SUCCESS);

      } else {
        console.error("Parsed custom story data is not in expected format:", parsedTextData);
        setCustomStoryError("A Mágica falhou ao organizar sua história. 🪄 Tente novamente!");
        setCustomStoryLoadingState(LoadingState.ERROR);
      }
    } catch (err) {
      console.error("Error generating custom story or image:", err);
      setCustomStoryError("Oops! Algo deu errado ao criar sua história personalizada ou o desenho. Tente novamente! 🧙‍♂️✨");
      setCustomStoryLoadingState(LoadingState.ERROR);
    }
  }, [customIdea, apiKey]);

  const generateCustomStoryButtonText = customStoryLoadingState === LoadingState.LOADING ? 'Criando...' : 'Criar História!';

  return (
    <div className="space-y-8">
      <div>
        <p className="text-lg text-slate-700 mb-4">
          Precisa de uma faísca de inspiração? Veja algumas ideias ou clique no botão para mais!
        </p>
        <div className="text-center mb-6">
          <KidFriendlyButton 
            onClick={fetchPrompts} 
            disabled={loadingPromptsState === LoadingState.LOADING}
            variant="secondary"
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6"/>}
          >
            {loadingPromptsState === LoadingState.LOADING ? 'Buscando Ideias...' : 'Mais Ideias!'}
          </KidFriendlyButton>
        </div>

        {loadingPromptsState === LoadingState.LOADING && <LoadingSpinner />}

        {promptsError && (
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow">
            <p className="font-semibold">Erro nas Ideias!</p>
            <p>{promptsError}</p>
          </div>
        )}

        {loadingPromptsState === LoadingState.SUCCESS && prompts.length > 0 && (
          <div className="mt-6 p-6 bg-indigo-50/70 backdrop-blur-sm rounded-xl shadow-inner border border-indigo-200">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">Solte a Imaginação com estas ideias:</h3>
            <ul className="list-none space-y-3">
              {prompts.map((prompt, index) => (
                <li 
                  key={index} 
                  className="p-3 bg-white rounded-lg shadow-sm text-md text-slate-800 flex items-start"
                >
                  <span className="text-indigo-500 font-bold mr-2 text-xl animate-pulse">💡</span> 
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <hr className="border-t-2 border-indigo-200 my-8"/>

      <div>
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">Ou... Escreva Sua Própria Ideia!</h3>
        <p className="text-lg text-slate-700 mb-4">
          Digite sua ideia para uma história no campo abaixo e deixe o MIG transformá-la em uma aventura completa!
        </p>
        <textarea
          value={customIdea}
          onChange={(e) => setCustomIdea(e.target.value)}
          placeholder="Ex: Uma joaninha que queria voar até a lua..."
          className="w-full p-3 border-2 border-indigo-300 rounded-lg text-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors bg-white shadow-sm min-h-[100px]"
          rows={3}
          disabled={customStoryLoadingState === LoadingState.LOADING}
          aria-label="Escreva sua ideia para uma história"
        />
        <div className="text-center mt-4">
          <KidFriendlyButton
            onClick={handleGenerateCustomStory}
            disabled={customStoryLoadingState === LoadingState.LOADING || !customIdea.trim()}
            variant="primary"
            icon={<LightBulbIcon className="w-6 h-6" />}
            aria-label="Criar história e desenho para colorir a partir da sua ideia"
          >
            {generateCustomStoryButtonText}
          </KidFriendlyButton>
        </div>

        {customStoryLoadingState === LoadingState.LOADING && <LoadingSpinner />}
        
        {customStoryError && (
          <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
            <p className="font-semibold">Erro na Sua História!</p>
            <p>{customStoryError}</p>
          </div>
        )}

        {customStoryLoadingState === LoadingState.SUCCESS && customStoryContent && (customStoryContent.storyParagraphs.length > 0 || customStoryContent.storyImageBase64) && (
          <StoryInteractionDisplay
            storyContent={customStoryContent}
            flatSyllables={customFlatSyllables}
            sectionTitle={customStoryContent.storyTitle || "Sua História Personalizada:"}
            storyKey={`custom-${customStoryKey}`}
          />
        )}
      </div>
    </div>
  );
};

export default PromptGenerator;