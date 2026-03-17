'use client';
import { useState, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError("Please complete the bot verification.");
      return;
    }
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      turnstileToken: token
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setSuccess(true);
        e.currentTarget.reset();
        turnstileRef.current?.reset();
        setToken('');
      } else {
        const { error } = await res.json();
        setError(error || "An error occurred.");
      }
    } catch {
      setError("A network error occurred.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {success && <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm border border-green-200">Your message has been sent successfully.</div>}
      {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm border border-red-200">{error}</div>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
        <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" required />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
        <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" required />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
        <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" required></textarea>
      </div>
      
      <div className="pt-2">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={(token) => setToken(token)}
        />
      </div>
      
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  )
}
