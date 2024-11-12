'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function LearningNextjs() {
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
          <h1 className="text-4xl font-bold mb-4">Learning Next.js</h1>
          <div className="text-gray-500 mb-8">
            发布于 2024-03-19
          </div>
          <div className="whitespace-pre-line">
            ## Next.js 学习心得

            Next.js 是一个强大的 React 框架，它提供了许多开箱即用的功能：

            - 服务器端渲染 (SSR)
            - 静态站点生成 (SSG)
            - 文件系统路由
            - API 路由
            - 自动代码分割

            在学习过程中，我发现最有趣的特性是...
          </div>
        </article>
      </motion.div>
    </div>
  );
} 