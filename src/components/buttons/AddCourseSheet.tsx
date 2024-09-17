import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import VideosPanel from "../panels/VideosPanel";
import { useNavigate } from "react-router-dom";

const courseFormSchema = z.object({
  coursename: z.string().min(1, "Course name is requiered"),
  coursedescription: z.string().min(1, "Course description is requiered"),
});

export default function AddCourseSheet() {
  const [selectedVideos, setSelectedVideos] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const courseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      coursename: "",
      coursedescription: "",
    },
  });

  const onVideoSelect = (videoUrl: string) => {
    setSelectedVideos((prev) =>
      prev.includes(videoUrl)
        ? prev.filter((url) => url !== videoUrl)
        : [...prev, videoUrl]
    );
  };

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/courses/add",
        {
          ...values,
          videos: selectedVideos,
        },
        { withCredentials: true }
      );

      toast({
        title: "Course added successfully",
        description: "Your new course has been created.",
      });
      courseForm.reset();
      setSelectedVideos([]);
      navigate(0);
    } catch (err) {
      toast({
        title: "Failed to add course",
        description: "There was an error creating your course.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button> Add course </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add course</SheetTitle>
              <SheetDescription> Add videos to your course </SheetDescription>
            </SheetHeader>
            <Form {...courseForm}>
              <form
                className="flex flex-col"
                onSubmit={courseForm.handleSubmit(onSubmit)}
              >
                <FormField
                  control={courseForm.control}
                  name="coursename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="course name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name of your course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={courseForm.control}
                  name="coursedescription"
                  render={({ field }) => (
                    <FormItem className="flex flex-col my-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type a nice description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription> Type your description </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-col my-4">
                  <h4 className="text-md">Add videos</h4>
                  <FormControl>
                    <div className="h-[250px] border rounded p-2">
                      <VideosPanel
                       onVideoSelect={onVideoSelect}
                       selectedVideos={selectedVideos}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select videos to add to your course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </form>
            </Form>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="my-4" type="submit">
                  {" "}
                  confirm{" "}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
