"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import type { Locale } from "@/lib/i18n";
import { localePath, storePath } from "@/lib/locale-paths";

type SearchBarProps = {
  placeholder: string;
  locale: Locale;
  className?: string;
};

export function SearchBar({ placeholder, locale, className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    const search = trimmed
      ? `?q=${encodeURIComponent(trimmed)}`
      : "";
    router.push(storePath(locale, search.replace(/^\?/, "")));
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={className}
    >
      <label className="relative block">
        <span className="sr-only">{placeholder}</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <Input
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-4"
        />
      </label>
    </form>
  );
}
