import Link from 'next/link';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 dark:bg-black w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">Pragmatic Truth</h3>
          <p className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase text-xs mb-4">Truth Made Practical</p>
          <p className="text-sm leading-relaxed max-w-sm">
            Equipping everyday Christians with biblically grounded responses to life, culture, current events, and hard questions.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About the Mission</Link></li>
            <li><Link href="/articles" className="hover:text-white transition">Articles & Commentary</Link></li>
            <li><Link href="/resources" className="hover:text-white transition">Evergreen Resources</Link></li>
            <li><Link href="/ask" className="hover:text-white transition">Ask a Question</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Join our Newsletter</h4>
          <p className="text-sm mb-4">Get weekly insights and biblical exegesis sent directly to your inbox.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-3 py-2 bg-slate-800 border-none rounded-md flex-1 focus:ring-2 focus:ring-primary text-white"
            />
            <Button type="button">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Pragmatic Truth. All rights reserved.
      </div>
    </footer>
  );
}
