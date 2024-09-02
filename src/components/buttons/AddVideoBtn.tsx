import * as React from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export default function AddVideoBtn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      toast({
        title: "Please select a video file",
      });
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

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
          title: "Video added succesfully",
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
    }
  };

  return (
    <>
      <div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Add video</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Upload video</DrawerTitle>
              <DrawerDescription>
                Upload videos to add to a course
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Label htmlFor="video">Video</Label>
              <Input
                id="video"
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
              />
              {uploading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={handleSubmit}> Submit </Button>
              )}
              <DrawerClose asChild>
                <Button variant="secondary"> Cancel </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
