"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import { Progress } from "../ui/progress";
import FullscreenPlayer from "./FullscreenPlayer";
import PodcastInfo from "./PodcastInfo";
import AudioSettingsControl from "./AudioSettingsControl";
import LikeShareLoopControls from "./LikeShareLoopControls";
import PlaybackControls from "./PlaybackControls";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { audio } = useAudio();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) {
        setIsMuted(false);
        audioRef.current.muted = false;
      } else {
        setIsMuted(true);
        audioRef.current.muted = true;
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === "ArrowLeft") {
        rewind();
      } else if (e.code === "ArrowRight") {
        forward();
      } else if (e.code === "KeyM") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      // The useEffect hook returns a cleanup function. This function is executed when the component is unmounted.
      // The cleanup function removes the event listener that was added earlier, preventing memory leaks and ensuring that the component is properly cleaned up when it's no longer needed.
      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div
        className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
          hidden: !audio?.audioUrl || audio?.audioUrl === "",
        })}
      >
        <div className="relative w-full">
          <Progress
            value={(currentTime / duration) * 100}
            className="h-1 w-full bg-gray-800"
          />
        </div>

        <section className="glassmorphism-black flex h-20 w-full items-center px-2 sm:px-4 md:px-8">
          <audio
            ref={audioRef}
            src={audio?.audioUrl}
            className="hidden"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
          />

          {/* Left Section - Album Art and Title */}
          <PodcastInfo
            title={audio?.title || ""}
            author={audio?.author || ""}
            imageUrl={audio?.imageUrl || ""}
            podcastId={audio?.podcastId}
            variant="compact"
            className="w-[40%] sm:w-[45%]"
          />

          <div className="flex flex-1 justify-between">
            {/* Center Section - Player Controls */}
            <div className="flex items-center justify-center">
              <PlaybackControls
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                forward={forward}
                rewind={rewind}
                variant="compact"
              />
            </div>

            {/* Right Section - Audio Settings */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4 min-w-[100px] sm:min-w-[200px]">
              {/* Only show loop control on larger screens */}
              <div className="hidden sm:block">
                <LikeShareLoopControls
                  podcastId={audio?.podcastId}
                  title={audio?.title || ""}
                  author={audio?.author || ""}
                  variant="compact"
                  isLooping={isLooping}
                  toggleLoop={toggleLoop}
                />
              </div>
              
              {/* Hide volume controls on smallest screens */}
              <div className="hidden sm:block">
                <AudioSettingsControl
                  isMuted={isMuted}
                  toggleMute={toggleMute}
                  volume={volume}
                  handleVolumeChange={handleVolumeChange}
                  playbackRate={playbackRate}
                  handlePlaybackRateChange={handlePlaybackRateChange}
                  variant="compact"
                />
              </div>

              {/* Always show fullscreen button */}
              <button
                onClick={toggleFullscreen}
                className={cn(
                  "rounded-full p-1 sm:p-2 hover:bg-gray-800",
                  isFullscreen ? "text-primary" : "text-gray-400 hover:text-white"
                )}
                title="Toggle Fullscreen"
              >
                <Maximize2 className="h-5 w-5" stroke="white" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Fullscreen Player Modal - remains unchanged */}
      <FullscreenPlayer
        isOpen={isFullscreen}
        onClose={toggleFullscreen}
        audioRef={audioRef}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        duration={duration}
        currentTime={currentTime}
        isMuted={isMuted}
        toggleMute={toggleMute}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        playbackRate={playbackRate}
        handlePlaybackRateChange={handlePlaybackRateChange}
        forward={forward}
        rewind={rewind}
        isLooping={isLooping}
        toggleLoop={toggleLoop}
        audioDetails={audio ? {
          title: audio.title,
          author: audio.author,
          imageUrl: audio.imageUrl,
          podcastId: audio.podcastId
        } : null}
      />
    </>
  );
};

export default PodcastPlayer;