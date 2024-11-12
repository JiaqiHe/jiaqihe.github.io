'use client'

import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#WebDev", "#NextJs", "#GitHubPages"];

export default function AnimationWithFramer() {
  return (
    <BlogLayout
      title="Animation with Framer Motion"
      date="2024-03-16"
      tags={tags}
    >
      ## Framer Motion 动画实践

      Framer Motion 是一个强大的 React 动画库，它让创建流畅的动画变得简单：

      ### 主要特性

      - 声明式动画
      - 手势支持
      - 布局动画
      - SVG 动画

      以下是一些实用的动画示例和最佳实践...
    </BlogLayout>
  );
} 
