import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function RemoveVideoBtn() {
  return (
    <>
      <div className="w-full">
        <Button variant="destructive">
          remove video
          <Trash2 className="ml-1" />
        </Button>
      </div>
    </>
  );
}
