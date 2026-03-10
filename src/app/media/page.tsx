import { Metadata } from 'next';
import { getAllMedia } from '@/lib/mdx';
import { ContentFilter } from '@/components/content/ContentFilter';

export const metadata: Metadata = {
  title: 'Media Hub',
  description: 'Sermons, podcasts, and video teachings.',
};

export default function MediaIndexPage() {
  const media = getAllMedia();

  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-4 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-900 dark:text-white">Media Hub</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Sermons, podcasts, and video teachings.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black w-full min-h-[50vh]">
        <div className="container mx-auto max-w-6xl">
          {media.length > 0 ? (
            <ContentFilter items={media} basePath="media" />
          ) : (
            <div className="text-center py-24 px-4 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                <svg className="mx-auto h-16 w-16 text-slate-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">More Content Coming Soon</h3>
              <p className="text-lg text-slate-500 max-w-md mx-auto">We are hard at work putting together the video and podcast infrastructure. Check back shortly!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
