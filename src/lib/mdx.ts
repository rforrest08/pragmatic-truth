import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const articlesDirectory = path.join(contentDirectory, 'articles');
const resourcesDirectory = path.join(contentDirectory, 'resources');
const mediaDirectory = path.join(contentDirectory, 'media');

export interface BaseFrontmatter {
  title: string;
  slug: string;
  date?: string;
  updatedAt?: string;
  tags: string[];
  excerpt: string;
  featured: boolean;
  author?: string;
  scripture?: string[];
  views?: number;
  coverImage?: string;
  seoTitle?: string;
}

export interface ArticleFrontmatter extends BaseFrontmatter {
  type: 'article';
  relatedResources?: string[];
  date: string; // Maintain required for articles
  author: string; // Maintain required for articles
}

export interface ResourceFrontmatter extends BaseFrontmatter {
  type: 'resource';
  url?: string;
  downloadUrl?: string;
}

export interface MediaFrontmatter extends BaseFrontmatter {
  type: 'media';
  mediaType: 'audio' | 'video';
  embedUrl: string;
  date: string; // Maintain required for media
  author: string; // Maintain required for media
}

export type ContentFrontmatter = ArticleFrontmatter | ResourceFrontmatter | MediaFrontmatter;

export interface MDXDocument<T extends ContentFrontmatter> {
  frontmatter: T;
  content: string;
}

const parseFrontmatter = <T extends ContentFrontmatter>(data: { [key: string]: any }, filename: string, type: 'article' | 'resource' | 'media'): T => {
  const slug = data.slug || filename.replace(/\.mdx?$/, '');
  
  const base = {
    title: data.title || 'Untitled',
    slug,
    date: data.date ? new Date(data.date).toISOString() : (type !== 'resource' ? new Date().toISOString() : undefined),
    updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : undefined,
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    featured: data.featured === true,
    author: data.author || (type !== 'resource' ? 'ryan-forrest' : undefined),
    scripture: data.scripture,
    views: data.views,
    coverImage: data.coverImage,
    seoTitle: data.seoTitle,
  };

  if (type === 'resource') {
    return {
      ...base,
      type: 'resource',
      url: data.url,
      downloadUrl: data.downloadUrl,
    } as T;
  }

  if (type === 'media') {
    return {
      ...base,
      type: 'media',
      mediaType: data.mediaType || 'video',
      embedUrl: data.embedUrl || '',
    } as T;
  }

  return {
    ...base,
    type: 'article',
    relatedResources: data.relatedResources,
  } as T;
};

// Generic function to read MDX files from a directory
const getMdxFiles = (dir: string) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => /\.mdx?$/.test(file));
};

// -------------------------------------------------------------
// Articles
// -------------------------------------------------------------

export function getAllArticles(): MDXDocument<ArticleFrontmatter>[] {
  const files = getMdxFiles(articlesDirectory);
  
  const articles = files.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      frontmatter: parseFrontmatter<ArticleFrontmatter>(data, filename, 'article'),
      content,
    };
  });

  // Sort articles by date descending
  return articles.sort((a, b) => (new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));
}

export function getArticleBySlug(slug: string): MDXDocument<ArticleFrontmatter> | null {
  const articles = getAllArticles();
  return articles.find((article) => article.frontmatter.slug === slug) || null;
}

// -------------------------------------------------------------
// Resources
// -------------------------------------------------------------

export function getAllResources(): MDXDocument<ResourceFrontmatter>[] {
  const files = getMdxFiles(resourcesDirectory);
  
  const resources = files.map((filename) => {
    const filePath = path.join(resourcesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      frontmatter: parseFrontmatter<ResourceFrontmatter>(data, filename, 'resource'),
      content,
    };
  });

  // Sort resources by date descending, default to 0 for undefined dates
  return resources.sort((a, b) => {
    const timeA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const timeB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return timeB - timeA;
  });
}

export function getResourceBySlug(slug: string): MDXDocument<ResourceFrontmatter> | null {
  const resources = getAllResources();
  return resources.find((resource) => resource.frontmatter.slug === slug) || null;
}

// -------------------------------------------------------------
// Media
// -------------------------------------------------------------

export function getAllMedia(): MDXDocument<MediaFrontmatter>[] {
  const files = getMdxFiles(mediaDirectory);
  
  const media = files.map((filename) => {
    const filePath = path.join(mediaDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      frontmatter: parseFrontmatter<MediaFrontmatter>(data, filename, 'media'),
      content,
    };
  });

  // Sort media by date descending
  return media.sort((a, b) => (new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));
}

export function getMediaBySlug(slug: string): MDXDocument<MediaFrontmatter> | null {
  const media = getAllMedia();
  return media.find((m) => m.frontmatter.slug === slug) || null;
}
