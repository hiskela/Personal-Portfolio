import { Resend } from "resend";

const resend = new Resend();
export const sendContactEmail = async ({ name, email, message }) => {
  return await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_EMAIL],
    subject: `New Portfolio Message from ${name}`,
    html: `
      <h2>New Portfolio Contact</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <h3>Message</h3>
      <p>${message}</p>
    `,
  });
};