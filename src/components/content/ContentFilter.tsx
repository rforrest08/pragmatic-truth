"use client";

import { useState, useMemo } from 'react';
import { ContentCard } from '@/components/ui/ContentCard';
import { ContentFrontmatter, MDXDocument } from '@/lib/mdx';

interface ContentFilterProps {
  items: MDXDocument<any>[];
  basePath: string; // e.g., 'articles', 'resources', 'media'
}

export function ContentFilter({ items, basePath }: ContentFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all unique tags across the content
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    items.forEach(item => {
      item.frontmatter.tags?.forEach((tag: string) => Object.keys(tag).length ? tags.add(tag) : null);
    });
    return Array.from(tags).sort();
  }, [items]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Tags Filter (OR logic)
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.frontmatter.tags?.includes(tag));

      // Search Filter (Title or Excerpt)
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === '' || 
        item.frontmatter.title.toLowerCase().includes(query) || 
        item.frontmatter.excerpt.toLowerCase().includes(query);

      return matchesTags && matchesSearch;
    });
  }, [items, selectedTags, searchQuery]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        
        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
          />
        </div>

        {/* Tag Filters */}
        <div className="w-full md:w-2/3 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-slate-500 mr-2">Filter by Tag:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button 
              onClick={() => setSelectedTags([])}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => {
           // For resources we optionally override the href
           let href = `/${basePath}/${item.frontmatter.slug}`;
           if (item.frontmatter.type === 'resource') {
               if (item.frontmatter.url) href = item.frontmatter.url;
               // Otherwise it links to the detail page (downloadUrl is handled there)
           }

           return (
             <ContentCard 
               key={item.frontmatter.slug}
               title={item.frontmatter.title}
               excerpt={item.frontmatter.excerpt}
               href={href}
               date={item.frontmatter.date}
               category={item.frontmatter.type === 'media' ? item.frontmatter.mediaType?.toUpperCase() : (item.frontmatter.tags?.[0] || 'Article')}
             />
           );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 px-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No content found</h3>
          <p className="text-slate-500">Try adjusting your active filters or search query.</p>
          <button onClick={() => { setSelectedTags([]); setSearchQuery(''); }} className="mt-4 text-primary font-medium hover:underline">Reset Filters</button>
        </div>
      )}
    </div>
  );
}
