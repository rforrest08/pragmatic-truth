import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllMedia, getMediaBySlug } from '@/lib/mdx';
import { MDXContent } from '@/components/content/MDXContent';
import { ContributorAvatar } from '@/components/ui/ContributorAvatar';

export async function generateStaticParams() {
  const media = getAllMedia();
  return media.map((m) => ({
    slug: m.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params;
  const media = getMediaBySlug(slug);
  if (!media) return { title: 'Media Not Found' };
  
  return {
    title: media.frontmatter.seoTitle || media.frontmatter.title,
    description: media.frontmatter.excerpt,
  };
}

export default async function MediaPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  const media = getMediaBySlug(slug);
  
  if (!media) {
    notFound();
  }

  // Very basic YouTube embed conversion (turns watch?v= into embed/)
  // This is a naive implementation; in a real app, use a more robust regex or an npm package like react-lite-youtube-embed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  return (
    <div className="w-full bg-white dark:bg-black min-h-screen">
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-5xl py-12 px-4">
           
           <div className="mb-8 rounded-xl overflow-hidden shadow-lg bg-black aspect-video relative flex items-center justify-center">
             {media.frontmatter.mediaType === 'video' ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={getEmbedUrl(media.frontmatter.embedUrl)} 
                  title={media.frontmatter.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
             ) : (
                <div className="w-full p-8 flex flex-col items-center justify-center h-full bg-slate-800 border border-slate-700">
                  {/* Mock Podcast Player */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-white font-medium mb-4">Audio Podcast</p>
                  <audio controls className="w-full max-w-md" src={media.frontmatter.embedUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
             )}
           </div>

           <div className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase mb-3 text-sm flex items-center gap-4">
             <span className="bg-accent/10 text-accent px-2 py-1 rounded">{media.frontmatter.mediaType.toUpperCase()}</span>
             <span>{new Date(media.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
             {media.frontmatter.tags?.[0] && <span>• {media.frontmatter.tags[0]}</span>}
             {media.frontmatter.scripture?.[0] && <span className="text-slate-500">• {media.frontmatter.scripture[0]}</span>}
           </div>
           
           <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
             {media.frontmatter.title}
           </h1>
           
           <div className="mt-6 flex items-center">
            <ContributorAvatar slug={media.frontmatter.author} />
           </div>

        </div>
      </div>

      <article className="container mx-auto max-w-3xl py-16 px-4">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <MDXContent content={media.content} />
        </div>
      </article>
    </div>
  );
}
