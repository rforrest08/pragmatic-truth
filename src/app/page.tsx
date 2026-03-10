import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { SocialFeed } from '@/components/social/SocialFeed';
import { getAllArticles, getAllResources } from "@/lib/mdx";

export const revalidate = 0;

export default function Home() {
  const recentArticles = getAllArticles().slice(0, 2);
  const featuredResources = getAllResources().filter(r => r.frontmatter.featured).slice(0, 1);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <span className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase mb-4">Pragmatic Truth</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-950 dark:text-white max-w-4xl mb-6 leading-tight">
            Truth Made <span className="text-primary dark:text-primary-light">Practical</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10">
            Equipping everyday Christians with biblically grounded responses to life, culture, current events, and hard questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" href="/articles">Read Latest Articles</Button>
            <Button size="lg" variant="outline" href="/about">Our Framework</Button>
          </div>
        </div>
      </section>

      {/* Editorial Framework Prop */}
      <section className="py-20 md:py-28 bg-white dark:bg-black w-full">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-950 dark:text-white mb-6">Theology for Everyday Life</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
              We believe that sound theology isn't just for seminaries—it's for navigating your career, relationships, and the cultural moments we face every day.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
              Every piece of content we produce is designed to directly answer three questions: <strong>What does the Bible say? What does it mean? What should I do about it?</strong> We provide intellectually honest, pastorally grounded teaching—without the clichés.
            </p>
            <Button href="/about" variant="secondary">Learn More</Button>
          </div>
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-90 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span className="font-serif text-3xl font-bold text-white leading-tight mb-8">
                “Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.”
              </span>
              <span className="text-xl font-sans font-medium text-slate-200">- 1 Peter 3:15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 w-full border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent font-bold tracking-wider uppercase mb-2 block">Recently Published</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-950 dark:text-white">Latest Articles</h2>
            </div>
            <Button href="/articles" variant="ghost" className="hidden sm:inline-flex">View All Articles &rarr;</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map(article => (
              <ContentCard
                key={article.frontmatter.slug}
                title={article.frontmatter.title}
                excerpt={article.frontmatter.excerpt}
                href={`/articles/${article.frontmatter.slug}`}
                date={article.frontmatter.date}
                category="Article"
              />
            ))}
            {featuredResources.map(resource => (
              <ContentCard
                key={resource.frontmatter.slug}
                title={resource.frontmatter.title}
                excerpt={resource.frontmatter.excerpt}
                href={`/resources/${resource.frontmatter.slug}`}
                date={resource.frontmatter.date}
                category={resource.frontmatter.tags?.[0] || 'Resource'}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button href="/articles" variant="outline">View All Articles</Button>
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="py-24 px-4 bg-white dark:bg-black w-full border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <SocialFeed />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-white text-center px-4 w-full">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Stay Grounded in Truth</h2>
          <p className="text-lg md:text-xl text-primary-light mb-10">
            Join thousands of believers receiving weekly biblical exegesis and cultural commentary straight to their inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Email address" className="px-4 py-3 rounded-md text-slate-900 flex-grow focus:outline-none focus:ring-2 focus:ring-secondary" required />
            <Button size="lg" variant="secondary" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
