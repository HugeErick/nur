import * as React from "react";
import VideoThumbnail from "./VideoThumbnail";

interface VideoListProps {
  videoSources: string[];
  onVideoSelect: (videoUrl: string) => void;
  selectedVideos: string[];
}

const VideoList: React.FC<VideoListProps> = ({ videoSources, onVideoSelect, selectedVideos }) => {
  return (
    <div className="flex flex-row gap-4 m-2 p-2 border dark:border-zinc-200 border-zinc-700 rounded-md overflow-x-auto">
      {videoSources.map((src, index) => {
        const filename = src.split("/").pop() || "";
        return (
            <VideoThumbnail
              key={index}
              src={src}
              filename={filename}
              onSelect={() => onVideoSelect(src)}
              isSelected={selectedVideos.includes(src)}
            />
        );
      })}
    </div>
  );
};

export default VideoList;
