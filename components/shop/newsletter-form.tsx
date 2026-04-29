"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NewsletterFormProps = {
  placeholder: string;
  ctaLabel: string;
};

export function NewsletterForm({ placeholder, ctaLabel }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="mt-4 flex max-w-sm gap-2" onSubmit={handleSubmit}>
      <Input
        type="email"
        required
        name="email"
        placeholder={placeholder}
        aria-label={placeholder}
        className="border-white/15 bg-white/5 text-white placeholder:text-white/45 focus-visible:border-gold"
      />
      <Button type="submit" size="sm" disabled={submitted}>
        {submitted ? (
          <>
            <Check className="h-4 w-4" />
            Done
          </>
        ) : (
          ctaLabel
        )}
      </Button>
    </form>
  );
}
