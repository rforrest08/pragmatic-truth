export interface Contributor {
  name: string;
  slug: string;
  bio: string;
  photo: string;
  socialLinks?: {
    x?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
  };
}

export const contributors: Contributor[] = [
  {
    name: "Bob Forrest",
    slug: "robert-forrest",
    bio: "Bob has been studying and teaching Scripture since his early teens, when he came to faith at sixteen. He completed Bible school and ministry training and served in vocational ministry before transitioning to a decade-plus of regional service and local church leadership spanning youth, college, and church leadership roles. Pragmatic Truth grew out of a conviction that most online Christian content — especially around current events — is more interested in recruiting people to a side than in helping them see God's eternal purpose in the middle of it. The goal here is simple: move beyond shallow takes and present truth that is deep enough to be worth trusting and practical enough to actually change how you live.",
    photo: "/images/contributors/ryan-default.jpg"
  }
];

export function getContributorBySlug(slug: string): Contributor | undefined {
  return contributors.find(c => c.slug === slug);
}
