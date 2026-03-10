import { MDXRemote } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';

interface MDXContentProps {
  content: string;
}

const components = {
  // You can wrap default HTML elements with custom styles
  h1: (props: any) => <h1 className="text-4xl font-serif font-bold mt-10 mb-6 text-primary" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-serif font-bold mt-8 mb-4 text-primary" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-serif font-bold mt-6 mb-3 text-secondary" {...props} />,
  a: (props: any) => <a className="text-primary-light hover:underline font-medium" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent pl-4 italic bg-slate-50 dark:bg-slate-900 py-2 my-6 text-slate-700 dark:text-slate-300" {...props} />
  ),
  // Add other custom MDX components such as an Information Box, CTA, etc.
};

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose lg:prose-lg max-w-none prose-headings:font-serif prose-a:text-primary-light hover:prose-a:text-primary dark:prose-invert">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
