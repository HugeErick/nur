import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .regex(/^[a-zA-Z-1-9_-]+$/, "Invalid username format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  });

export default function NewUserform() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/caccount",
        {
          username: values.username,
          password: values.password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        navigate("/login");
        toast({
          title: "Sign up succesfull",
          description: "Please login now",
        });
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
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-400 rounded-md p-8 shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
