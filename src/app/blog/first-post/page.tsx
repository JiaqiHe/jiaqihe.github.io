import BlogLayout from '@/app/components/BlogLayout';

const tags = ["#FirstPost", "#Introduction", "#Welcome"];

const content = `
# My First Blog Post

## 为什么要写博客？

写博客不仅可以帮助我整理思路，还能与其他开发者分享知识和经验。通过写作，
我可以更好地理解和记忆所学的知识。

## 未来的计划

我计划定期更新博客，分享我在软件开发领域的所见所闻。主要会关注以下几个方面：

- Web 开发技术
- 算法与数据结构
- 项目经验分享
- 编程心得体会

### 技术栈

我目前主要使用的技术栈包括：

1. React 和 Next.js
2. TypeScript
3. TailwindCSS
4. NextUI 组件库

这些技术让我能够快速构建现代化的网站。
`;

export default function FirstBlogPost() {
  return (
    <BlogLayout
      title="My First Blog Post"
      date="2024-03-20"
      tags={tags}
    >
      {content}
    </BlogLayout>
  );
} 