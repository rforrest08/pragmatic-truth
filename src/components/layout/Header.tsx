import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur dark:bg-slate-950/90 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold text-primary dark:text-white">
          Pragmatic Truth
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white">About</Link>
          <Link href="/articles" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white">Articles</Link>
          <Link href="/resources" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white">Resources</Link>
          <Link href="/media" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white">Media</Link>
          <Link href="/ask" className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white">Ask a Question</Link>
          <Link href="/contact" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
