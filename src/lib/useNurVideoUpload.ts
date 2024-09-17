import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useNurVideoUpload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideoFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    if (videoFiles.length === 0) {
      toast({
        title: "Please select at least one video file",
      });
      return;
    }

    const formData = new FormData();
    videoFiles.forEach((file) => formData.append("videos", file));

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/vid/uploadvideo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast({
          title: `${videoFiles.length} video(s) added successfully`,
        });
        navigate(0);
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setVideoFiles([]);
    }
  };

  return {
    videoFiles,
    uploading,
    handleFileChange,
    handleSubmit,
  };
};
