'use client';
import { useState, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Button } from '@/components/ui/Button';

export function QRForm() {
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
      topic: formData.get('topic'),
      question: formData.get('question'),
      newsletter: formData.get('newsletter') === 'on',
      email: formData.get('email'),
      turnstileToken: token
    };

    try {
      const res = await fetch('/api/qr', {
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
    <form className="space-y-6" onSubmit={handleSubmit}>
      {success && <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm border border-green-200">Your question has been submitted successfully.</div>}
      {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm border border-red-200">{error}</div>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name (Optional)</label>
        <input type="text" id="name" name="name" placeholder="Leave blank if you prefer to remain anonymous" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" />
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">General Topic</label>
        <select id="topic" name="topic" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
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
        <textarea id="question" name="question" rows={5} placeholder="What does the Bible say about...?" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" required></textarea>
        <p className="text-xs text-slate-500 mt-2">Please provide as much context as possible so we can respond accurately.</p>
      </div>

      <div className="flex items-start gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <input type="checkbox" id="newsletter" name="newsletter" className="mt-1 h-4 w-4 text-primary rounded border-slate-300" />
        <label htmlFor="newsletter" className="text-sm text-slate-600 dark:text-slate-400">
          Notify me via email if my question is responded to. (Requires providing your email address below).
        </label>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address (Optional)</label>
        <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-slate-950 text-slate-900 dark:text-white" />
        <p className="text-xs text-slate-500 mt-2">We will never spam you or share your email.</p>
      </div>
      
      <div className="pt-2">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={(token) => setToken(token)}
        />
      </div>

      <Button type="submit" size="lg" className="w-full mt-4">Submit Question</Button>
    </form>
  )
}
