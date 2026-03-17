import { Metadata } from 'next';
import { QRForm } from './QRForm';

export const metadata: Metadata = {
  title: 'Q&R | Pragmatic Truth',
  description: 'Submit your theological or biblical questions to the Pragmatic Truth team.',
};

export default function QRPage() {
  return (
    <div className="w-full">
      <section className="bg-slate-50 dark:bg-slate-900 py-16 px-4 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-3xl">
          <span className="text-secondary dark:text-emerald-400 font-bold tracking-wider uppercase mb-4 block">Reader Q&R</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900 dark:text-white">Questions & Responses</h1>
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
              We read every submission, though we cannot guarantee a personalized response to every question. Selected questions will be responded to in future articles or in our weekly newsletter.
            </p>

            <QRForm />
          </div>
        </div>
      </section>
    </div>
  );
}
