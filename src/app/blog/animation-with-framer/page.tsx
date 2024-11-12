'use client'

import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#Animation", "#FramerMotion", "#UI"];

const content = `
# Animation with Framer Motion

## Framer Motion 动画实践

Framer Motion 是一个强大的 React 动画库，它让创建流畅的动画变得简单。

### 主要特性

- 声明式动画
- 手势支持
- 布局动画
- SVG 动画

## 实现技巧

### 基础动画

\`\`\`jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Hello World!
</motion.div>
\`\`\`

### 高级用法

1. **手势动画**
   - 拖拽
   - 悬停
   - 点击效果

2. **过渡效果**
   - 页面切换
   - 组件挂载
   - 列表动画

3. **性能优化**
   - 动画分层
   - 硬件加速
   - 动画编排

## 项目实践

在本网站中，我使用了多种动画效果：

- 页面切换动画
- 滚动显示动画
- 悬停效果
- 交互反馈
`;

export default function AnimationWithFramer() {
  return (
    <BlogLayout
      title="Animation with Framer Motion"
      date="2024-03-16"
      tags={tags}
    >
      {content}
    </BlogLayout>
  );
} 