import Image from 'next/image';
import { getContributorBySlug } from '@/data/contributors';

interface ContributorAvatarProps {
  slug: string;
  showBio?: boolean;
}

export function ContributorAvatar({ slug, showBio = false }: ContributorAvatarProps) {
  const contributor = getContributorBySlug(slug);

  if (!contributor) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold">
          ?
        </div>
        <span className="font-medium text-slate-700 dark:text-slate-300">Unknown Author</span>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-4 ${showBio ? 'flex-col sm:flex-row' : 'items-center'}`}>
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
        <div className="w-full h-full flex items-center justify-center text-primary font-bold text-lg">
          {contributor.name.charAt(0)}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{contributor.name}</h4>
        {showBio && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {contributor.bio}
          </p>
        )}
      </div>
    </div>
  );
}
