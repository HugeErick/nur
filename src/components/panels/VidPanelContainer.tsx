import * as React from "react";
import VideosPanel from "./VideosPanel";
import AddVideoPlusBtn from "../buttons/AddVideoPlusBtn";
import VideosCheckbox from "../checkboxes/VideosCheckbox";
import RemoveVideoBtn from "../buttons/RemoveVideoBtn";

interface VidPanelContainerProps {
  onVideoSelect: (videoUrl: string) => void;
  selectedVideos: string[];
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
  setAllVideos: React.Dispatch<React.SetStateAction<string[]>>;
  onVideosRemoved: () => void;
}

export default function VidPanelContainer({
  onVideoSelect,
  selectedVideos,
  onSelectAll,
  onDeselectAll,
  allSelected,
  setAllVideos,
  onVideosRemoved,
}: VidPanelContainerProps) {
  return (
    <div className="mx-2 mt-4">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h2 className="m-2 text-2xl">All videos</h2>
          <AddVideoPlusBtn />
          <VideosCheckbox
            onSelectAll={onSelectAll}
            onDeselectAll={onDeselectAll}
            allSelected={allSelected}
          />
        </div>
        <div className="flex items-center">
          <RemoveVideoBtn
            selectedVideos={selectedVideos}
            onVideosRemoved={onVideosRemoved}
          />
        </div>
      </div>

      <VideosPanel
        onVideoSelect={onVideoSelect}
        selectedVideos={selectedVideos}
        setAllVideos={setAllVideos}
      />
    </div>
  );
}
