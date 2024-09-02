import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z-1-9_-]+$/, "Invalid username format"),
});

export default function AddAdminsBtn() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/jair/add",
        {
          username: values.username,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast({
          title: "Update succesfull",
          description: "user succesfully converted",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Does that username exists?",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Does that username exists?",
      });
    }
  }

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button> Add admin </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add administrator</DialogTitle>
              <DialogDescription>
                Add somebody that can add videos, files and courses
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormDescription>
                        The user typed will be promoted to admin
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
