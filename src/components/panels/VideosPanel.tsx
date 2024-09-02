import * as React from "react";
import axios from "axios";
import VideoList from "../VideoList";
import { useToast } from "@/components/ui/use-toast";

export default function VideosPanel() {
  const [videoSources, setVideoSources] = React.useState<string[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchVideos = async () => {
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
      } catch (err) {
        toast({
          title: "Fetching videos went wrong",
          variant: "destructive",
        });
      }
    };

    fetchVideos();
  }, []);
  return (
    <>
      <section>
        <h2>All videos</h2>
        <VideoList videoSources={videoSources} />
      </section>
    </>
  );
}
