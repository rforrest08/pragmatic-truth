import { Metadata } from 'next';
import { contributors } from '@/data/contributors';
import { ContributorAvatar } from '@/components/ui/ContributorAvatar';

export const metadata: Metadata = {
  title: 'About the Mission',
  description: 'Our apologetics and teaching framework.',
};

export default function AboutPage() {
  return (
    <div className="w-full">
      <section className="bg-primary text-white py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Mission</h1>
          <p className="text-lg md:text-xl text-primary-light max-w-2xl mx-auto leading-relaxed">
            Truth Made Practical. We exist to equip everyday Christians with biblically grounded responses to life, culture, and hard questions.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-4xl prose lg:prose-lg dark:prose-invert prose-headings:font-serif">
          <h2>Why Pragmatic Truth?</h2>
          <p>
            There is no shortage of Christian voices online. But when a cultural moment hits — a political crisis, a moral controversy, a hard question from a skeptic — most of what you find is either shallow encouragement or someone recruiting you to a team.
          </p>
          <p>
            Pragmatic Truth exists because the Bible is not silent on the things that matter, and because truth that cannot be applied is not yet fully understood. Every article, resource, and conversation here is built around one conviction: God has an eternal purpose that does not pause for current events, and the Christian's job is to see it clearly and live accordingly.
          </p>

          <h3>Our Editorial Framework</h3>
          <p>Every piece of content we produce—whether it's an article deciphering current events, or an evergreen resource defending the resurrection—follows a strict editorial philosophy designed to move you from knowledge to action:</p>
          <ul>
            <li><strong>What does the Bible say?</strong> - We start with revelation, not opinion. We establish the biblical baseline.</li>
            <li><strong>What does it mean?</strong> - We do the hard work of exegesis. We look at context, historical truth, and the orthodox Christian tradition.</li>
            <li><strong>What should I do about it?</strong> - Theology without application is just trivia. We provide clear, actionable next steps for living out the truth in God's economy.</li>
          </ul>

          <h3>Our Tone</h3>
          <p>
            We strive to be theologically serious but accessible. We are pastoral, but we will not soften hard truths. We prize intellectual honesty over tribal allegiance, and we endeavor to write with conviction that is never preachy or clichéd.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 w-full">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-10 text-center">Our Contributors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {contributors.map(contributor => (
              <div key={contributor.slug} className="bg-white dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <ContributorAvatar slug={contributor.slug} showBio={true} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
