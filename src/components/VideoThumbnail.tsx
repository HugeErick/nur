import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
  src: string;
  filename?: string;
  onRemove?: (filename: string) => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  src,
  filename,
  onSelect,
  isSelected,
}) => {
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);

  React.useEffect(() => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.currentTime = 1;
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnail(canvas.toDataURL());
    });
  }, [src]);

  return (
    <>
      <div
        className={`flex-none text-center rounded-sm ${
          isSelected ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={onSelect}
      >
        {thumbnail ? (
          <>
            <img
              className="h-auto w-60 rounded-md"
              src={thumbnail}
              alt="Video thumbnail"
            />
            {filename && (
              <>
                <p className="m-1 text-sm dark:text-zinc-300 text-zinc700 truncate">
                  {filename}
                </p>
              </>
            )}
          </>
        ) : (
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        )}
      </div>
    </>
  );
};

export default VideoThumbnail;
