'use client'

import { useState, useRef } from 'react';
import { Input, Button, Textarea, Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
      if (!file) return;

      setIsLoading(true);
      const text = await file.text();

      const titleMatch = text.match(/title="([^"]+)"/);
      const dateMatch = text.match(/date="([^"]+)"/);
      const tagsMatch = text.match(/tags=\{(\[[^\]]+\])\}/);
      
      const markdownMatch = text.match(/markdown = `\n?([\s\S]+?)`/);
      const alternativeMarkdownMatch = text.match(/const markdown = ['"`]([\s\S]+?)['"`]/);

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
        setContent(contentMatch[1].trim());
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
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          tags: tagArray,
          content,
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
                minRows={15}
                className="w-full"
              />
            </div>

            {showPreview && (
              <div className="border rounded-lg p-4 prose prose-slate max-w-none dark:prose-invert overflow-auto max-h-[600px]">
                <ReactMarkdown>
                  {content || 'Preview area'}
                </ReactMarkdown>
              </div>
            )}
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