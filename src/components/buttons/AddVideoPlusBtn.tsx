import { Loader2, Plus } from "lucide-react";
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
import { useNurVideoUpload } from "../../lib/useNurVideoUpload";
import { useState } from "react";

export default function AddVideoPlusBtn() {
  const { uploading, handleFileChange, handleSubmit } = useNurVideoUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      handleFileChange(e);
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="p-1 w-7 h-7 items-center mt-2"
          >
            <Plus className="w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Upload videos</DrawerTitle>
            <DrawerDescription>
              Upload multiple videos to add to a course
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Label htmlFor="video">Videos</Label>
            <Input
              id="video"
              type="file"
              accept="video/mp4"
              multiple
              onChange={onFileChange}
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p>Selected files:</p>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {uploading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={selectedFiles.length === 0}
              >
                Submit
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
