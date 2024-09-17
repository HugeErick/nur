import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface RemoveVideoBtnProps {
  selectedVideos: string[];
  onVideosRemoved: () => void;
}

export default function RemoveVideoBtn({
  selectedVideos,
  onVideosRemoved,
}: RemoveVideoBtnProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRemove = async () => {
    try {
      const deletePromises = selectedVideos.map((videoUrl) => {
        const filename = videoUrl.split("/").pop();
        return axios.delete(`http://localhost:4000/api/vid/del/${filename}`, {
          withCredentials: true,
        });
      });

      await Promise.all(deletePromises);
      navigate(0);
      toast({
        title: "Video(s) deleted successfully",
      });
      onVideosRemoved();
    } catch (err) {
      toast({
        title: "Deleting video(s) went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex mt-1 mx-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleRemove}
        disabled={selectedVideos.length === 0}
      >
        <Trash2 className="p-0" />
      </Button>
    </div>
  );
}
