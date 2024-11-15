'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ClientBlogLayoutProps {
  title: string;
  date: string;
  tags?: string[];
  children: React.ReactNode;
}

export default function ClientBlogLayout({ title, date, tags = [], children }: ClientBlogLayoutProps) {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link href="/">
          <Button className="mb-8" variant="light">
            ← Back to Home
          </Button>
        </Link>
        
        <article className="prose dark:prose-invert lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="flex flex-col gap-4 mb-8">
            <div className="text-gray-500">
              发布于 {date}
            </div>
            {tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="whitespace-pre-line">
            {children}
          </div>
        </article>
      </motion.div>
    </div>
  );
} 