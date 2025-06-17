
export interface StoryOptions {
  theme: string;
  character: string;
}

export enum LoadingState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export interface Syllable {
  text: string;
  isSpokenByMig?: boolean; // Highlight for MIG speaking
  isRepeatedByChild?: boolean; // Highlight for child repeating
}

export interface Word {
  syllables: Syllable[];
  originalWordText: string; // e.g., "gato"
}

export interface GeneratedStoryContent {
  storyTitle?: string;
  storyParagraphs: string[];
  syllabifiedWords?: string[][]; // Array of words, where each word is an array of its syllable strings. E.g., [["ga","to"], ["sol"]]
  storyImageBase64?: string; // Base64 encoded string of the generated image for coloring
}

// Simplified structure for syllabified words for the entire story content
export interface SyllabifiedWord {
  text: string; // The syllable itself
  wordIndex: number; // Index of the word this syllable belongs to in the flat list of words
  syllableInWordIndex: number; // Index of this syllable within its word
  originalWordText: string; // Full text of the word it belongs to
}