'use client'

import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#NextJS", "#WebDev", "#React"];

const content = `
# Learning Next.js

## Next.js 学习心得

Next.js 是一个强大的 React 框架，它提供了许多开箱即用的功能。

### 主要特性

- 服务器端渲染 (SSR)
- 静态站点生成 (SSG)
- 文件系统路由
- API 路由
- 自动代码分割

## 学习过程

在学习 Next.js 的过程中，我发现最有趣的特性是它的文件系统路由。这种直观的路由方式让开发变得更加简单。

### 为什么选择 Next.js？

1. 开发体验优秀
2. 性能优化
3. 部署简单
4. 社区活跃

## 实践项目

通过构建这个个人网站，我实践了 Next.js 的多个特性：

- 静态页面生成
- 组件复用
- 样式管理
- 图片优化
`;

export default function LearningNextjs() {
  return (
    <BlogLayout
      title="Learning Next.js"
      date="2024-03-19"
      tags={tags}
    >
      {content}
    </BlogLayout>
  );
} 