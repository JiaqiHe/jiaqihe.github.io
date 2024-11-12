'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function AnimationWithFramer() {
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
          <h1 className="text-4xl font-bold mb-4">Animation with Framer Motion</h1>
          <div className="text-gray-500 mb-8">
            发布于 2024-03-16
          </div>
          <div className="whitespace-pre-line">
            ## Framer Motion 动画实践

            Framer Motion 是一个强大的 React 动画库，它让创建流畅的动画变得简单：

            ### 主要特性

            - 声明式动画
            - 手势支持
            - 布局动画
            - SVG 动画

            以下是一些实用的动画示例和最佳实践...
          </div>
        </article>
      </motion.div>
    </div>
  );
} 