'use client'

import { useState, useRef } from 'react';
import { Input, Button, Textarea, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CodeProps extends React.HTMLProps<HTMLElement> {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function NewBlogPost() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleLoadExisting = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) {
        console.warn('No file selected');
        return;
      }

      setIsLoading(true);
      const text = await file.text();

      const titleMatch = text.match(/title="([^"]+)"/);
      const dateMatch = text.match(/date="([^"]+)"/);
      const tagsMatch = text.match(/tags=\{(\[[^\]]+\])\}/);
      
      const markdownMatch = text.match(/const markdown = `\n([\s\S]+?)`;\s*\n\s*return/);
      const alternativeMarkdownMatch = text.match(/markdown = `\n([\s\S]+?)`;\s*\n\s*return/);

      if (titleMatch) setTitle(titleMatch[1]);
      if (dateMatch) setDate(dateMatch[1]);
      if (tagsMatch) {
        try {
          const tagArray = JSON.parse(tagsMatch[1]);
          setTags(tagArray.join(', '));
        } catch (e) {
          console.error('Error parsing tags:', e);
        }
      }
      
      const contentMatch = markdownMatch || alternativeMarkdownMatch;
      if (contentMatch) {
        const cleanContent = contentMatch[1]
          .split('\n')
          .map(line => line.replace(/^  /, ''))
          .join('\n')
          .trim();
        setContent(cleanContent);
      } else {
        console.warn('Could not find markdown content in file');
      }

    } catch (error) {
      console.error('Error loading file:', error);
      alert('Error loading file. Please make sure you selected the correct page.tsx file.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const tagArray = tags.split(',').map(tag => tag.trim());
      
      const pageContent = `import ClientBlogLayout from '@/app/components/ClientBlogLayout';

export default function BlogPost() {
  const markdown = \`
${content}
\`;

  return (
    <ClientBlogLayout 
      title="${title}" 
      date="${date}"
      tags={[${tagArray.map(tag => `"${tag}"`).join(', ')}]}
    >
      {markdown}
    </ClientBlogLayout>
  );
} 
`;

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          tags: tagArray,
          content: pageContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Blog page created successfully!');
        router.push(data.path);
      } else {
        alert(data.message || 'Creation failed, please try again');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating blog page');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Create New Blog</h1>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".tsx,.ts"
              className="hidden"
            />
            <Button
              color="secondary"
              variant="flat"
              onPress={handleLoadExisting}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Load Existing Blog
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Input
            label="Title"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            label="Tags"
            placeholder="Separate tags with commas, e.g.: Next.js, React"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="flex justify-end mb-2">
            <Switch 
              checked={showPreview}
              onChange={(e) => setShowPreview(e.target.checked)}
            >
              Preview Mode
            </Switch>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={showPreview ? "lg:block" : "block"}>
              <Textarea
                label="Content"
                placeholder="Write your blog content in Markdown format"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                classNames={{
                  base: "h-[600px]",
                  input: "h-full resize-none",
                  inputWrapper: "h-full"
                }}
              />
            </div>

            {showPreview && (
              <div className="border rounded-lg p-4 prose prose-slate max-w-none dark:prose-invert prose-p:my-2 prose-li:my-0 prose-ul:my-2 prose-h2:mb-3 prose-h2:mt-6 h-[600px] overflow-y-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: ({ children, ...props }: CodeProps) => (
                      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded" {...props}>
                        {children}
                      </code>
                    )
                  }}
                >
                  {content || 'Preview area'}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Markdown 使用提示</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary">图片链接</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">从 GitHub 仓库链接图片时：</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  <li>使用 raw GitHub URL 格式</li>
                  <li>将 github.com 替换为 raw.githubusercontent.com</li>
                  <li>移除路径中的 blob/</li>
                </ul>
                <div className="mt-2 text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  <div className="text-red-500">❌ https://github.com/username/repo/blob/main/image.png</div>
                  <div className="text-green-500">✅ https://raw.githubusercontent.com/JiaqiHe/jiaqihe.github.io/main/src/app/blog/[blog-name]/[image-name].[image-format]</div>
                </div>
              </div>
              
              {/* 可以继续添加更多提示 */}
            </div>
          </div>

          <Button
            color="primary"
            className="w-full"
            size="lg"
            onClick={handleGenerate}
            isLoading={isLoading}
          >
            Generate Blog Page
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 