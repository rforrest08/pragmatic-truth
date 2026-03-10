"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * A highly resilient SocialFeed component that safely embeds 3rd party scripts.
 * In a real-world scenario, you would use robust npm packages like `react-twitter-embed` 
 * and `react-instagram-embed` to handle strict-mode React lifecycles gracefully.
 */
export function SocialFeed() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Initialize Facebook widget
    const scriptFB = document.createElement("script");
    scriptFB.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    scriptFB.async = true;
    scriptFB.crossOrigin = "anonymous";
    document.body.appendChild(scriptFB);

    // Initialize YouTube widget
    const scriptYT = document.createElement("script");
    scriptYT.src = "https://apis.google.com/js/platform.js";
    scriptYT.async = true;
    document.body.appendChild(scriptYT);

    return () => {
      if (document.body.contains(scriptFB)) {
        document.body.removeChild(scriptFB);
      }
      if (document.body.contains(scriptYT)) {
        document.body.removeChild(scriptYT);
      }
    }
  }, []);

  // Avoid hydration mismatch by rendering a skeleton server-side
  if (!isClient) {
    return (
      <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center">
        <span className="text-slate-400 font-medium">Loading Social Feeds...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-sm">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Connect With Us</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full place-items-start">

        {/* X / Twitter Feed */}
        <div className="w-full flex-col flex bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 h-[500px] overflow-y-auto">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.925H5.022z"></path></svg>
            Latest Thoughts
          </h3>
          <iframe
            src="https://syndication.twitter.com/srv/timeline-profile/screen-name/robertjforrest?dnt=true&theme=dark"
            style={{ width: "100%", height: "450px", border: "none", overflow: "auto" }}
            title="X timeline for @robertjforrest"
          ></iframe>
        </div>

        {/* Facebook Feed */}
        <div className="w-full flex-col flex bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 h-[500px] overflow-y-auto">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-[#1877F2]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            Community Updates
          </h3>
          <div className="w-full h-full relative" id="fb-container">
            <div className="fb-page w-full" data-href="https://www.facebook.com/pragmatictruth/" data-tabs="timeline" data-width="" data-height="430" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <blockquote cite="https://www.facebook.com/pragmatictruth/" className="fb-xfbml-parse-ignore">
                <a href="https://www.facebook.com/pragmatictruth/">Pragmatic Truth</a>
              </blockquote>
            </div>
          </div>
        </div>

        {/* YouTube Feed */}
        <div className="w-full flex-col flex bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[150px]">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-[#FF0000]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" /></svg>
            Recent Teachings
          </h3>
          <div className="flex flex-col items-center justify-center p-6 text-center gap-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 h-full">
            <p className="text-slate-600 dark:text-slate-300">Subscribe to our channel for the latest videos.</p>
            <a href="https://www.youtube.com/@ThePragmaticTruth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">
              Subscribe on YouTube
            </a>
          </div>
        </div>

        {/* Instagram Placeholder */}
        <div className="w-full flex-col flex bg-white dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[150px]">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-[#E1306C]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Visual Ministry
          </h3>
          <div className="flex flex-col items-center justify-center p-6 text-center gap-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 h-full">
            <p className="text-slate-600 dark:text-slate-300 font-medium">Follow us on Instagram — coming soon</p>
          </div>
        </div>

      </div>
    </div>
  );
}
