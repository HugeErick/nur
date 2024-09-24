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
  coursename: z.string().min(1, "Course name is required"),
  coursedescription: z.string().min(1, "Course description is required"),
});

export default function AddCourseSheet() {
  const [selectedVideos, setSelectedVideos] = React.useState<string[]>([]);
  const [, setAllVideos] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
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

      if (response.status === 201) {
        toast({
          title: "Course added successfully",
          description: "Your new course has been created.",
        });
        courseForm.reset();
        setSelectedVideos([]);
        setIsOpen(false);
        navigate(0);
      } else {
        console.log("hola");
      }
    } catch (err) {
      toast({
        title: "Failed to add course",
        description: "There was an error creating your course.",
        variant: "destructive",
      });
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Add course</Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="overflow-y-auto w-[400px] sm:w-[540px]"
      >
        <SheetHeader>
          <SheetTitle>Add course</SheetTitle>
          <SheetDescription>Add videos to your course</SheetDescription>
        </SheetHeader>
        <Form {...courseForm}>
          <form
            className="flex flex-col space-y-4 py-4"
            onSubmit={courseForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={courseForm.control}
              name="coursename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Course name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of your course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={courseForm.control}
              name="coursedescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type a nice description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a description for your course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Add videos</FormLabel>
              <FormControl>
                <div className="h-[250px] border rounded p-2 overflow-y-auto">
                  <VideosPanel
                    onVideoSelect={onVideoSelect}
                    selectedVideos={selectedVideos}
                    setAllVideos={setAllVideos}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Select videos to add to your course
              </FormDescription>
            </FormItem>

            <SheetFooter>
              <Button
                type="submit"
                disabled={courseForm.formState.isSubmitting}
              >
                {courseForm.formState.isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>Create Course</>
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
