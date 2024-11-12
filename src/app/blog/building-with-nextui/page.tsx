'use client'

import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function BuildingWithNextUI() {
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
          <h1 className="text-4xl font-bold mb-4">Building with NextUI</h1>
          <div className="text-gray-500 mb-8">
            发布于 2024-03-17
          </div>
          <div className="whitespace-pre-line">
            ## NextUI 组件库使用经验

            NextUI 是一个现代化的 React UI 库，它提供了许多精美的组件和实用的功能：

            - 设计系统集成
            - 暗色模式支持
            - 响应式组件
            - 可访问性支持

            以下是我使用 NextUI 构建应用的一些心得...
          </div>
        </article>
      </motion.div>
    </div>
  );
} 