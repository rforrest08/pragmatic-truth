import { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug, getResourceBySlug, ResourceFrontmatter, MDXDocument } from '@/lib/mdx';
import { MDXContent } from '@/components/content/MDXContent';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContributorAvatar } from '@/components/ui/ContributorAvatar';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: article.frontmatter.seoTitle || article.frontmatter.title,
    description: article.frontmatter.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  // Find related articles based on tags if possible, otherwise use recent
  const allArticles = getAllArticles().filter(a => a.frontmatter.slug !== slug);
  const relatedArticles = allArticles.filter(a => 
    a.frontmatter.tags?.some(tag => article.frontmatter.tags?.includes(tag))
  ).slice(0, 2);
  
  if (relatedArticles.length === 0) {
    relatedArticles.push(...allArticles.slice(0, 2));
  }

  // Find related resources
  const relatedResources: MDXDocument<ResourceFrontmatter>[] = [];
  if (article.frontmatter.relatedResources) {
    article.frontmatter.relatedResources.forEach(resourceSlug => {
      const resource = getResourceBySlug(resourceSlug);
      if (resource) relatedResources.push(resource);
    });
  }

  return (
    <div className="w-full bg-white dark:bg-black min-h-screen">
      <article className="container mx-auto max-w-3xl py-16 px-4">
        <header className="mb-12 text-center pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="text-secondary dark:text-emerald-400 font-semibold mb-3 tracking-wider uppercase text-sm">
            {new Date(article.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {article.frontmatter.title}
          </h1>
          <div className="flex justify-center mt-6">
            <ContributorAvatar slug={article.frontmatter.author} />
          </div>
        </header>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <MDXContent content={article.content} />
        </div>
      </article>

      {(relatedArticles.length > 0 || relatedResources.length > 0) && (
        <section className="bg-slate-50 dark:bg-slate-900 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto max-w-5xl px-4 space-y-16">
            
            {relatedResources.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Related Resources</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedResources.map(resource => {
                    let href = `/resources/${resource.frontmatter.slug}`;
                    if (resource.frontmatter.url) href = resource.frontmatter.url;

                    return (
                      <ContentCard 
                        key={resource.frontmatter.slug}
                        title={resource.frontmatter.title}
                        excerpt={resource.frontmatter.excerpt}
                        href={href}
                        date={resource.frontmatter.date}
                        category={resource.frontmatter.tags?.[0] || "Resource"}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Further Reading</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedArticles.map(ra => (
                    <ContentCard 
                      key={ra.frontmatter.slug}
                      title={ra.frontmatter.title}
                      excerpt={ra.frontmatter.excerpt}
                      href={`/articles/${ra.frontmatter.slug}`}
                      date={ra.frontmatter.date}
                      category={ra.frontmatter.tags?.[0] || 'Article'}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}
    </div>
  );
}
