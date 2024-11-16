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

    // 写入文件
    const filePath = path.join(dirPath, 'page.tsx');
    await writeFile(filePath, content, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Blog page created',
      path: `/blog/${slug}` 
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating blog page' },
      { status: 500 }
    );
  }
} 