"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Wand2, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { polishAboutMeText } from '@/ai/flows/polish-about-me-text';
import { useToast } from '@/hooks/use-toast';

const initialBio = "Hi, I'm Diksha Agarwal, a passionate software developer with expertise in building modern web applications. I enjoy turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.";

export default function AboutSection() {
  const [bio, setBio] = useState(initialBio);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePolishText = async () => {
    startTransition(async () => {
      try {
        const result = await polishAboutMeText({ aboutMeText: bio });
        if (result.polishedText) {
          setBio(result.polishedText);
          toast({
            title: "Success!",
            description: "Your bio has been polished by AI.",
          });
        }
      } catch (error) {
        console.error("Failed to polish text:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to polish text. Please try again.",
        });
      }
    });
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary shadow-lg">
              <AvatarImage src="https://picsum.photos/256" alt="Diksha Agarwal" data-ai-hint="woman portrait" />
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 font-headline">Diksha Agarwal</h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-6">Software Developer</p>
            <Card className="relative">
              <CardContent className="p-4">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full min-h-[150px] text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute bottom-3 right-3"
                  onClick={handlePolishText}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">Polish with AI</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
