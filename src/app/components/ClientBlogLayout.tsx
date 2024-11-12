'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ClientBlogLayoutProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

export default function ClientBlogLayout({ title, date, children }: ClientBlogLayoutProps) {
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
            ← 返回首页
          </Button>
        </Link>
        
        <article className="prose dark:prose-invert lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="text-gray-500 mb-8">
            发布于 {date}
          </div>
          <div className="whitespace-pre-line">
            {children}
          </div>
        </article>
      </motion.div>
    </div>
  );
} 