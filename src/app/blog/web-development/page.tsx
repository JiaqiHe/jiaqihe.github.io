'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function WebDevelopment() {
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
          <h1 className="text-4xl font-bold mb-4">Web Development Journey</h1>
          <div className="text-gray-500 mb-8">
            发布于 2024-03-18
          </div>
          <div className="whitespace-pre-line">
            ## 我的 Web 开发之旅

            从最初接触 HTML/CSS 到现在掌握现代前端框架，这是一段充满挑战和收获的旅程。

            ### 技术栈演进
            
            1. 基础 HTML/CSS/JavaScript
            2. React 生态系统
            3. Next.js 框架
            4. 现代化工具链

            在这个过程中，我学到了...
          </div>
        </article>
      </motion.div>
    </div>
  );
} 