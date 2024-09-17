import * as React from "react";
import AddCourseSheet from "@/components/buttons/AddCourseSheet";
import AddAdminsBtn from "@/components/buttons/AddAdminsBtn";
import AddVideoBtn from "@/components/buttons/AddVideoBtn";
import { Label } from "@/components/ui/label";
import VidPanelContainer from "@/components/panels/VidPanelContainer";
import { useToast } from "@/components/ui/use-toast";

export default function AdminPage() {
  const [selectedVideos, setSelectedVideos] = React.useState<string[]>([]);
  const [allVideos, setAllVideos] = React.useState<string[]>([]);
  const { toast } = useToast();

  const handleVideoSelect = (videoUrl: string) => {
    setSelectedVideos((prevSelected) => {
      if (prevSelected.includes(videoUrl)) {
        console.log(`Deselected video ${videoUrl}`);
        return prevSelected.filter((url) => url !== videoUrl);
      } else {
        console.log(`Selected video: ${videoUrl}`);
        return [...prevSelected, videoUrl];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedVideos(allVideos);
  };

  const handleDeselectAll = () => {
    setSelectedVideos([]);
  };

  const handleVideosRemoved = () => {
    setAllVideos((prevVideos) =>
      prevVideos.filter((video) => !selectedVideos.includes(video))
    );
    setSelectedVideos([]);
    toast({
      title: "Videos removed successfully",
      description: `${selectedVideos.length} video(s) have been removed.`,
    });
  };

  return (
    <div className="mt-24 mx-4">
      <div className="flex flex-col">
        <Label className="text-4xl text-center m-2">Actions</Label>
        <div className="flex flex-row justify-center gap-10">
          <AddCourseSheet />
          <AddAdminsBtn />
          <AddVideoBtn />
        </div>
        {/* courses view panel */}
        <VidPanelContainer
          onVideoSelect={handleVideoSelect}
          selectedVideos={selectedVideos}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          allSelected={
            selectedVideos.length === allVideos.length && allVideos.length > 0
          }
          setAllVideos={setAllVideos}
          onVideosRemoved={handleVideosRemoved}
        />
      </div>
    </div>
  );
}
