'use client'

import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#NextUI", "#UI", "#Design"];

const content = `
# Building with NextUI

## NextUI 组件库使用经验

NextUI 是一个现代化的 React UI 库，它提供了许多精美的组件和实用的功能。

### 主要特性

- 设计系统集成
- 暗色模式支持
- 响应式组件
- 可访问性支持

## 使用心得

### 优势

1. **组件丰富**
   - 基础组件完备
   - 交互组件优秀
   - 布局组件灵活

2. **主题定制**
   - 颜色系统
   - 响应式设计
   - 暗色模式

3. **开发体验**
   - TypeScript 支持
   - 文档完善
   - 示例丰富

### 实践案例

在本网站中，我使用了多个 NextUI 组件：

- Navbar 导航栏
- Card 卡片组件
- Button 按钮
- Link 链接
`;

export default function BuildingWithNextUI() {
  return (
    <BlogLayout
      title="Building with NextUI"
      date="2024-03-17"
      tags={tags}
    >
      {content}
    </BlogLayout>
  );
} 