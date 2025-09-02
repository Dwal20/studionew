"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// This type is inferred from the schema so you don't have to repeat yourself.
type FormValues = z.infer<typeof formSchema>;

// We can't pass the server action directly to the form's `action` prop.
// We need to wrap it in a client-side function to handle the response.
async function handleSubmit(
  data: FormValues,
  startTransition: React.TransitionStartFunction,
  toast: (options: any) => void,
  reset: () => void
) {
  startTransition(async () => {
    // We combine firstName and lastName to match the server action's expectation.
    const result = await submitContactForm({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      message: data.message,
    });

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message || "There was a problem with your submission.",
      });
    }
  });
}

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit((data) => handleSubmit(data, startTransition, toast, form.reset))}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="first-name"
            type="text"
            {...form.register("firstName")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
           {form.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="last-name"
            type="text"
            {...form.register("lastName")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
          {form.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          {...form.register("email")}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          rows={4}
          {...form.register("message")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        ></textarea>
         {form.formState.errors.message && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.message.message}</p>
          )}
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="w-full btn-primary font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </button>
      </div>
    </form>
  );
}
