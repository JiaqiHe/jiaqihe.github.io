'use client'

import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#WebDev", "#Journey", "#Learning"];

const content = `
# Web Development Journey

## 我的 Web 开发之旅

从最初接触 HTML/CSS 到现在掌握现代前端框架，这是一段充满挑战和收获的旅程。

### 技术栈演进

1. **基础阶段**
   - HTML5
   - CSS3
   - JavaScript (ES6+)

2. **框架学习**
   - React 生态系统
   - Next.js 框架
   - 状态管理工具

3. **工具链**
   - Git 版本控制
   - npm 包管理
   - webpack/vite 构建工具

## 学习心得

在这个过程中，我深刻体会到：

- 基础知识的重要性
- 持续学习的必要性
- 实践项目的价值
- 技术选择的考量

### 未来规划

接下来我计划：

1. 深入学习后端技术
2. 探索微服务架构
3. 研究云原生开发
4. 实践更多全栈项目
`;

export default function WebDevelopment() {
  return (
    <BlogLayout
      title="Web Development Journey"
      date="2024-03-18"
      tags={tags}
    >
      {content}
    </BlogLayout>
  );
} 