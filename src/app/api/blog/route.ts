import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { title, date, tags, content } = await request.json();
    
    // 创建URL友好的文件名
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    
    // 确保博客目录存在
    const dirPath = path.join(process.cwd(), 'src', 'app', 'blog', slug);
    await mkdir(dirPath, { recursive: true });

    // 生成页面内容
    const pageContent = `import ClientBlogLayout from '@/app/components/ClientBlogLayout';
import { markdownToHtml } from '@/lib/markdown';

export default async function BlogPost() {
  const markdown = \`
${content}
  \`;

  const content = await markdownToHtml(markdown);

  return (
    <ClientBlogLayout 
      title="${title}" 
      date="${date}"
      tags={[${tags.map((tag: string) => `"${tag}"`).join(', ')}]}
    >
      <article className="prose prose-slate max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </ClientBlogLayout>
  );
} 
`;

    // 写入文件
    const filePath = path.join(dirPath, 'page.tsx');
    await writeFile(filePath, pageContent, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: '博客页面已创建',
      path: `/blog/${slug}` 
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: '创建博客页面时出错' },
      { status: 500 }
    );
  }
} 