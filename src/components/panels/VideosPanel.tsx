import * as React from "react";
import axios from "axios";
import VideoList from "../VideoList";
import { useToast } from "@/components/ui/use-toast";

interface VideosPanelProps {
  onVideoSelect: (videoUrl: string) => void;
  selectedVideos: string[];
  setAllVideos: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function VideosPanel({
  onVideoSelect,
  selectedVideos,
  setAllVideos,
}: VideosPanelProps) {
  const [videoSources, setVideoSources] = React.useState<string[]>([]);
  const { toast } = useToast();

  const fetchVideos = React.useCallback(async () => {
    try {
      const response = await axios.get<string[]>(
        "http://localhost:4000/api/vid/list",
        {
          withCredentials: true,
        }
      );

      const baseUrl = "http://localhost:4000/api/vid/";
      const videoUrls = response.data.map(
        (filename) => `${baseUrl}${filename}`
      );

      setVideoSources(videoUrls);
      setAllVideos(videoUrls);
    } catch (err) {
      toast({
        title: "Fetching videos went wrong",
        variant: "destructive",
      });
    }
  }, [setAllVideos, toast]);

  React.useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <section>
      <VideoList
        videoSources={videoSources}
        onVideoSelect={onVideoSelect}
        selectedVideos={selectedVideos}
      />
    </section>
  );
}
