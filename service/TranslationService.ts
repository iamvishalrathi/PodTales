import { chatSession } from './Gemini';

interface TranslationResponse {
  description: string;
  transcription: string;
  thumbnail: string;
}

export async function translateContent(
  content: {
    description: string;
    transcription?: string;
    thumbnail?: string;
  },
  sourceLanguage: string = 'English',
  targetLanguage: string
): Promise<TranslationResponse> {
  try {
    // Create translation prompt
    const translationPrompt = `
      Translate the following content from ${sourceLanguage} to ${targetLanguage}. 
      Return the response in JSON format with the following structure:
      {
        "description": "translated description",
        "transcription": "translated transcription",
        "thumbnail": "translated thumbnail details"
      }
      
      Content to translate:
      Description: ${content.description}
      Transcription: ${content.transcription || ''}
      Thumbnail: ${content.thumbnail || ''}
    `;
    
    const result = await chatSession.sendMessage(translationPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    const translatedContent = JSON.parse(sanitizedText);
    
    return {
      description: translatedContent.description,
      transcription: translatedContent.transcription,
      thumbnail: translatedContent.thumbnail
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate content');
  }
}