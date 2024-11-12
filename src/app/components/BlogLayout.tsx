import ClientBlogLayout from './ClientBlogLayout';

interface BlogLayoutProps {
  title: string;
  date: string;
  tags: string[];
  children: React.ReactNode;
}

export default function BlogLayout({ title, date, tags, children }: BlogLayoutProps) {
  return <ClientBlogLayout title={title} date={date} tags={tags}>{children}</ClientBlogLayout>;
} 
