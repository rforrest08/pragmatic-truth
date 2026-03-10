import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllResources, getResourceBySlug } from '@/lib/mdx';
import { MDXContent } from '@/components/content/MDXContent';
import { Button } from '@/components/ui/Button';

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((r) => ({
    slug: r.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: 'Resource Not Found' };
  
  return {
    title: resource.frontmatter.seoTitle || resource.frontmatter.title,
    description: resource.frontmatter.excerpt,
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const resource = getResourceBySlug(slug);
  
  if (!resource) {
    notFound();
  }

  return (
    <div className="w-full bg-white dark:bg-black min-h-screen">
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
           <div className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase mb-4 text-sm">
             {resource.frontmatter.tags?.[0] || 'Resource'}
           </div>
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
             {resource.frontmatter.title}
           </h1>
           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
             {resource.frontmatter.excerpt}
           </p>
        </div>
      </div>

      <article className="container mx-auto max-w-3xl py-16 px-4">
        {resource.frontmatter.downloadUrl && (
          <div className="flex justify-center mb-12">
            <Button size="lg" href={resource.frontmatter.downloadUrl} className="flex gap-2 items-center text-primary-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
              Download Resource
            </Button>
          </div>
        )}
        
        <MDXContent content={resource.content} />
        
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900 dark:text-white">Have Questions?</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">Submit your questions about this topic to our team for a future article.</p>
          <Button href="/ask" variant="outline" size="lg">Ask a Question</Button>
        </div>
      </article>
    </div>
  );
}
