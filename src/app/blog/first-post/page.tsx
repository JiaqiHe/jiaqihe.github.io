import BlogLayout from '@/app/components/BlogLayout';

export default function FirstBlogPost() {
  return (
    <BlogLayout
      title="My First Blog Post"
      date="2024-03-20"
    >
      这是我的第一篇博客文章。在这里，我将分享我的编程经验和学习心得。
      
      ## 为什么要写博客？
      
      写博客不仅可以帮助我整理思路，还能与其他开发者分享知识和经验。通过写作，
      我可以更好地理解和记忆所学的知识。
      
      ## 未来的计划
      
      我计划定期更新博客，分享我在软件开发领域的所见所闻。主要会关注以下几个方面：
      - Web 开发技术
      - 算法与数据结构
      - 项目经验分享
      - 编程心得体会
    </BlogLayout>
  );
} 