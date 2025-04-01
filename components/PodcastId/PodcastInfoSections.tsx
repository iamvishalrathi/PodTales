import { Calendar, Mic2 } from 'lucide-react';
import DetailSection from './SectionDetail';

interface PodcastInfoSectionsProps {
  podcast: {
    podcastDescription: string;
    voicePrompt?: string;
    voiceType?: string;
    imagePrompt?: string;
    _creationTime: number;
  };
}

const PodcastInfoSections = ({ podcast }: PodcastInfoSectionsProps) => {
  return (
    <>
      {/* Description */}
      <DetailSection title="Description">
        <p className="text-16 text-white-2 leading-relaxed">{podcast?.podcastDescription}</p>
      </DetailSection>

      {/* Transcription */}
      <DetailSection
        title="Transcription"
        rightElement={
          <div className="flex items-center gap-2 bg-black-1/50 px-4 py-2 rounded-full">
            <Mic2 size={20} stroke="white" />
            <span className="text-14 font-medium text-white-2">Voice: {podcast?.voiceType}</span>
          </div>
        }
      >
        {podcast?.voicePrompt ? (
          <div className="max-h-[200px] md:max-h-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pr-2">
            <p className="text-16 text-white-2 leading-relaxed whitespace-pre-wrap">{podcast?.voicePrompt}</p>
          </div>
        ) : (
          <p className="text-16 text-gray-1 leading-relaxed italic">No transcription provided</p>
        )}
      </DetailSection>

      {/* Thumbnail Prompt */}
      <DetailSection title="Thumbnail Details">
        {podcast?.imagePrompt ? (
          <p className="text-16 text-white-2 leading-relaxed">{podcast?.imagePrompt}</p>
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