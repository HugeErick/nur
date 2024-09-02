import AddCourseSheet from "@/components/buttons/AddCourseSheet";
import AddAdminsBtn from "@/components/buttons/AddAdminsBtn";
import AddVideoBtn from "@/components/buttons/AddVideoBtn";
import { Label } from "@/components/ui/label";
import VideosPanel from "@/components/panels/VideosPanel";

export default function AdminPage() {
  return (
    <div className="mt-24 mx-4">
      <div className="flex flex-col">
        <Label className="text-lg m-2">Actions</Label>
        <div className="flex flex-row justify-center gap-10">
          <AddCourseSheet />
          <AddAdminsBtn />
          <AddVideoBtn />
        </div>
        {/* courses view panel */}
        <VideosPanel />
      </div>
    </div>
  );
}
