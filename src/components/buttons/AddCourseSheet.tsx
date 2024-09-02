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

const courseFormSchema = z.object({
  coursename: z.string(),
  coursedescription: z.string(),
});

export default function AddCourseSheet() {
  const courseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      coursename: "",
      coursedescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof courseFormSchema>) {
    try {
      //something
    } catch (err) {
      //something
    }
  }

  return (
    <>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button> Add course </Button>
          </SheetTrigger>
          <SheetContent side="left">
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
              </form>
            </Form>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="my-4" type="submit">
                  {" "}
                  Save changes{" "}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
