import { createBucketClient } from '@cosmicjs/sdk';
import type { Post, Page } from '../types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Safely extracts a plain string from a metadata field value, handling
// legacy object-shaped values like { key: 'val', value: 'Val' }
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// Returns a sortable timestamp, falling back through published_at -> modified_at -> created_at
export function getDateValue(item: {
  published_at?: string | null;
  modified_at?: string | null;
  created_at?: string | null;
}): number {
  const raw = item.published_at || item.modified_at || item.created_at;
  const time = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'post' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const posts = response.objects as Post[];

    return posts.sort((a, b) => {
      const dateA = getDateValue({
        published_at: a.metadata?.published_at,
        modified_at: a.modified_at,
        created_at: a.created_at,
      });
      const dateB = getDateValue({
        published_at: b.metadata?.published_at,
        modified_at: b.modified_at,
        created_at: b.created_at,
      });
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'post', slug })
      .props(['id', 'slug', 'title', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const post = response.object as Post;
    if (!post) return null;
    return post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'page' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    return response.objects as Page[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch pages');
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'page', slug })
      .props(['id', 'slug', 'title', 'content', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const page = response.object as Page;
    if (!page) return null;
    return page;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}