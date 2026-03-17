import { Metadata } from 'next';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Pragmatic Truth team.',
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-[70vh]">
      <section className="bg-primary text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-light">
            Have a general inquiry or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-black w-full">
        <div className="container mx-auto max-w-3xl grid md:grid-cols-5 gap-12">
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900 dark:text-white">Get In Touch</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm">
              Please use this form for general inquiries, speaking requests, or feedback on our content. 
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm">
              If you have a specific theological or biblical question you'd like us to respond to in an article, please use our <a href="/qr" className="text-primary hover:underline font-bold">Q&R</a> form instead.
            </p>
            
            <div className="space-y-4 mb-8 text-slate-700 dark:text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">Email:</span>
                <a href="mailto:contact@pragmatictruth.com" className="hover:text-primary transition">contact@pragmatictruth.com</a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ContactForm />
          </div>
          
        </div>
      </section>
    </div>
  );
}
