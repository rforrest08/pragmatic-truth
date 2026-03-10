import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Ask a Question',
  description: 'Submit your theological or biblical questions to the Pragmatic Truth team.',
};

export default function AskPage() {
  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-4 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <span className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase mb-4 block">Reader Q&A</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-white">Ask a Question</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Have a question about a difficult Bible passage, a cultural issue, or how to apply theology to your everyday life? Submit it below.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black w-full">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900 dark:text-white">Submit Your Question</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm">
              We read every submission, though we cannot guarantee a personalized response to every question. Selected questions will be answered in future articles or in our weekly newsletter.
            </p>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name (Optional)</label>
                <input type="text" id="name" placeholder="Leave blank if you prefer to remain anonymous" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" />
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">General Topic</label>
                <select id="topic" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
                  <option>Biblical Interpretation (Exegesis)</option>
                  <option>Theology & Doctrine</option>
                  <option>Apologetics & Doubts</option>
                  <option>Current Events & Culture</option>
                  <option>Christian Living (Career, Family, Ethics)</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Question <span className="text-red-500">*</span></label>
                <textarea id="question" rows={5} placeholder="What does the Bible say about...?" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" required></textarea>
                <p className="text-xs text-slate-500 mt-2">Please provide as much context as possible so we can answer accurately.</p>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <input type="checkbox" id="newsletter" className="mt-1 h-4 w-4 text-primary rounded border-slate-300" />
                <label htmlFor="newsletter" className="text-sm text-slate-600 dark:text-slate-400">
                  Notify me via email if my question is answered. (Requires providing your email address below).
                </label>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address (Optional)</label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" />
                <p className="text-xs text-slate-500 mt-2">We will never spam you or share your email.</p>
              </div>

              <Button type="button" size="lg" className="w-full mt-4">Submit Question</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
