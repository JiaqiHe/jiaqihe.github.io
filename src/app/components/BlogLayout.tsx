import ClientBlogLayout from '@/app/components/ClientBlogLayout';

interface BlogLayoutProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

export default function BlogLayout({ title, date, children }: BlogLayoutProps) {
  return <ClientBlogLayout title={title} date={date}>{children}</ClientBlogLayout>;
} 
