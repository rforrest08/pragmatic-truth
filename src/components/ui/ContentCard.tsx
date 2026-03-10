import Link from 'next/link';

interface ContentCardProps {
  title: string;
  excerpt: string;
  href: string;
  category?: string;
  date: string;
  imageUrl?: string;
}

export function ContentCard({ title, excerpt, href, category, date, imageUrl }: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
      {imageUrl && (
        <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex items-center gap-3 mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {category && <span className="text-secondary dark:text-emerald-400 uppercase tracking-wider">{category}</span>}
          <span>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-slate-950 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>
        <span className="text-sm font-medium text-primary dark:text-primary-light group-hover:underline mt-auto inline-block">Read more &rarr;</span>
      </div>
    </Link>
  );
}
