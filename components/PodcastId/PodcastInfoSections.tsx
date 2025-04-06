import { Calendar, Globe, Mic2, Loader2, Check, RefreshCw } from 'lucide-react';
import DetailSection from './SectionDetail';
import { useState } from 'react';
import { languageOptions } from '@/constants/PodcastFields';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PodcastInfoSectionsProps {
  podcast: {
    podcastDescription: string;
    voicePrompt?: string;
    voiceType?: string;
    imagePrompt?: string;
    _creationTime: number;
    language?: string;
  };
}

const PodcastInfoSections = ({ podcast }: PodcastInfoSectionsProps) => {
  const { toast } = useToast();
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [translatedDescription, setTranslatedDescription] = useState<string>("");
  const [translatedTranscription, setTranslatedTranscription] = useState<string>("");
  const [translatedThumbnail, setTranslatedThumbnail] = useState<string>("");
  const [translationProgress, setTranslationProgress] = useState(0);

  // Function to translate content using Gemini
  const translateContent = async (targetLanguage: string) => {
    if (!targetLanguage) {
      toast({
        title: "Please select a language",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    setTranslationProgress(10); // Start progress

    try {
      // Get language label for better UX
      const languageLabel = languageOptions.find(l => l.value === targetLanguage)?.label || targetLanguage;

      // Import the chatSession dynamically to avoid server-side issues
      const { chatSession } = await import('@/service/Gemini');

      setTranslationProgress(30); // Update progress

      // Create translation prompt with explicit instruction for thumbnail translation
      const translationPrompt = `
        Translate the following content from ${podcast.language || 'English'} to ${languageLabel}. 
        Return the response in JSON format with the following structure:
        {
          "description": "translated description",
          "transcription": "translated transcription",
          "thumbnail": "translated thumbnail details"
        }
        
        Content to translate:
        Description: ${podcast.podcastDescription}
        Transcription: ${podcast.voicePrompt || ''}
        Thumbnail: ${podcast.imagePrompt || ''}

        Important: Make sure to translate the thumbnail prompt even if it's in English, regardless of the source language of other content.
      `;

      setTranslationProgress(50); // Update progress
      const result = await chatSession.sendMessage(translationPrompt);
      setTranslationProgress(70); // Update progress
      const response = await result.response;
      const text = response.text();
      setTranslationProgress(90); // Update progress

      try {
        // Parse the JSON response
        const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        const translatedContent = JSON.parse(sanitizedText);

        setTranslatedDescription(translatedContent.description);
        setTranslatedTranscription(translatedContent.transcription);
        setTranslatedThumbnail(translatedContent.thumbnail);
        setTranslationProgress(100); // Complete progress

        toast({
          title: `Translated to ${languageLabel}`,
          description: "Content has been translated successfully"
        });
      } catch (parseError) {
        console.error('Error parsing translation response:', parseError);
        toast({
          title: 'Translation error',
          description: 'Could not parse the translation response',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: 'Translation failed',
        description: 'An error occurred during translation',
        variant: 'destructive'
      });
    } finally {
      setIsTranslating(false);
      // Reset progress after a delay
      setTimeout(() => setTranslationProgress(0), 1000);
    }
  };

  // Reset translations
  const resetTranslation = () => {
    setSelectedLanguage("");
    setTranslatedDescription("");
    setTranslatedTranscription("");
    setTranslatedThumbnail("");
  };

  // Check if any content is translated
  const hasTranslation = translatedDescription || translatedTranscription || translatedThumbnail;

  return (
    <>
      {/* Enhanced Translation Controls */}
      <div className="mb-6 bg-gradient-to-r from-black-1/80 to-black-1/40 p-3 sm:p-5 rounded-xl border border-white-1/10 shadow-lg">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="bg-orange-1/20 p-1.5 sm:p-2 rounded-full">
            <Globe size={18} className="text-orange-1" />
          </div>
          <h3 className="text-16 sm:text-18 font-semibold text-white-1">
            <span className="hidden sm:inline">Translation</span> Tools
          </h3>
        </div>

        <p className="text-white-3 text-xs sm:text-sm mb-3 sm:mb-4 hidden sm:block">
          Select a language below.
        </p>

        <div className="space-y-3 sm:space-y-4">
          {/* Language Selection - Updated to use Select component */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="sm:col-span-3">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
                disabled={isTranslating}
              >
                <SelectTrigger
                  className="w-full bg-black-1/70 text-white-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-white-1/10 focus:outline-none focus:ring-2 focus:ring-orange-1 h-10 sm:h-12 text-sm sm:text-base"
                >
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-black-1/95 text-white-1 border-orange-1/10 rounded-xl max-h-[40vh]">
                  {languageOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="focus:bg-orange-1/20 hover:bg-orange-1/10 transition-colors"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-1">
              <Button
                onClick={() => translateContent(selectedLanguage)}
                className="w-full bg-orange-1 hover:bg-orange-400 text-black font-medium py-2 sm:py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 h-10 sm:h-12 text-sm sm:text-base"
                disabled={isTranslating || !selectedLanguage}
              >
                {isTranslating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="hidden sm:inline">Translating...</span>
                    <span className="sm:hidden">Loading...</span>
                  </>
                ) : (
                  <>
                    <Globe size={16} />
                    <span className="hidden sm:inline">Translate</span>
                    <span className="sm:hidden">Go</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Translation Progress */}
          {isTranslating && (
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs text-white-3">
                <span className="hidden sm:inline">Translating content...</span>
                <span className="sm:hidden">Translating...</span>
                <span>{translationProgress}%</span>
              </div>
              <Progress value={translationProgress} className="h-1 sm:h-1.5" />
            </div>
          )}

          {/* Translation Status */}
          {hasTranslation && (
            <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Check size={14} className="text-green-500" />
                <span className="text-white-1 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Content translated to </span>
                  <span className="sm:hidden">Translated: </span>
                  {languageOptions.find(l => l.value === selectedLanguage)?.label}
                </span>
              </div>
              <Button
                onClick={resetTranslation}
                variant="outline"
                size="sm"
                className="border-white-1/20 text-white-2 hover:bg-white-1/10 h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
              >
                <RefreshCw size={12} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Show Original</span>
                <span className="sm:hidden">Reset</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <DetailSection title="Description">
        <p className="text-16 text-white-2 leading-relaxed">
          {translatedDescription || podcast?.podcastDescription}
        </p>
      </DetailSection>

      {/* Transcription */}
      <DetailSection
        title="Transcription"
        rightElement={
          <div className="flex items-center gap-2 bg-black-1/50 px-4 py-2 rounded-full">
            <Mic2 size={20} stroke="white" />
            <div className="text-14 font-medium text-white-2">
              <span className='hidden md:inline'>Voice: </span>
              {podcast?.voiceType}
            </div>
          </div>
        }
      >
        {(translatedTranscription || podcast?.voicePrompt) ? (
          <div className="max-h-[200px] md:max-h-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pr-2">
            <p className="text-16 text-white-2 leading-relaxed whitespace-pre-wrap">
              {translatedTranscription || podcast?.voicePrompt}
            </p>
          </div>
        ) : (
          <p className="text-16 text-gray-1 leading-relaxed italic">No transcription provided</p>
        )}
      </DetailSection>

      {/* Thumbnail Prompt with Translation Status Indicator */}
      <DetailSection
        title="Thumbnail Details"
      >
        {(translatedThumbnail || podcast?.imagePrompt) ? (
          <div className="relative">
            <p className="text-16 text-white-2 leading-relaxed">
              {translatedThumbnail || podcast?.imagePrompt}
            </p>
            {podcast?.imagePrompt && !translatedThumbnail && selectedLanguage && (
              <div className="mt-2 text-sm text-orange-1">
                Click "Translate" to see this content in {languageOptions.find(l => l.value === selectedLanguage)?.label}
              </div>
            )}
          </div>
        ) : (
          <p className="text-16 text-gray-1 leading-relaxed italic">Custom uploaded thumbnail</p>
        )}
      </DetailSection>

      {/* Creation Info */}
      <DetailSection title="Creation Info">
        <div className="flex items-center gap-3">
          <div className="bg-black-1/50 p-3 rounded-full">
            <Calendar size={20} stroke="white" />
          </div>
          <div>
            <p className="text-14 text-white-3">Created on</p>
            <p className="text-16 font-medium text-white-2">
              {new Date(podcast?._creationTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </DetailSection>
    </>
  );
};

export default PodcastInfoSections;