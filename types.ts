export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface ImageMetafield {
  url: string;
  imgix_url: string;
}

export interface PostMetadata {
  seo_description?: string;
  featured_image?: ImageMetafield;
  published_at?: string;
  author?: string;
  content?: string;
}

export interface Post extends CosmicObject {
  type: 'post';
  metadata: PostMetadata;
}

export interface PageMetadata {
  seo_description?: string;
  featured_image?: ImageMetafield;
  published_at?: string;
  author?: string;
  content?: string;
}

export interface Page extends CosmicObject {
  type: 'page';
  metadata: PageMetadata;
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'post';
}

export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'page';
}