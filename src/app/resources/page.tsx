import { Metadata } from 'next';
import { getAllResources } from '@/lib/mdx';
import { ContentFilter } from '@/components/content/ContentFilter';

export const metadata: Metadata = {
  title: 'Resource Hub',
  description: 'Guides, tools, and deeper dives into apologetics and theology.',
};

export default function ResourcesIndexPage() {
  const resources = getAllResources();

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-4 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-900 dark:text-white">Resource Hub</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Comprehensive guides, external studies, and downloadable tools.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black w-full min-h-[50vh]">
        <div className="container mx-auto max-w-6xl">
          <ContentFilter items={resources} basePath="resources" />
        </div>
      </section>
    </div>
  );
}
