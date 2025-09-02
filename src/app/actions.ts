"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional(),
});

type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: z.infer<typeof contactSchema>
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data provided." };
  }

  try {
    // In a real-world application, you would integrate an email sending service here.
    // For example, using Nodemailer, SendGrid, or Resend.
    console.log("New contact form submission:");
    console.log("Name:", parsed.data.name);
    console.log("Email:", parsed.data.email);
    console.log("Message:", parsed.data.message);
    console.log("Email would be sent to: dikshaagawalsv123@gmail.com");

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Failed to process contact form:", error);
    return { success: false, message: "An unexpected error occurred on the server." };
  }
}
