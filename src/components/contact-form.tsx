"use client";

import { useState } from 'react';
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const recipientEmail = "dikshaagawalsv123@gmail.com";

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Contact from ${firstName} ${lastName}`);
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`);
    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    // The link is opened in a new tab.
    // The pending state is reset after a short delay to give the browser time to open the mail client.
    window.open(generateMailtoLink(), '_blank');
    setTimeout(() => {
      setIsPending(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="first-name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="w-full btn-primary font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 flex items-center justify-center"
          disabled={isPending || !firstName || !lastName || !email}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </button>
      </div>
    </form>
  );
}
