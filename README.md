# Demo Astro Site
![App Preview](https://imgix.cosmicjs.com/cea41e20-c43c-11f1-9185-df2983a733a2-casper-list-layout-1.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A fast, elegant creative portfolio and blog built with [Astro](https://astro.build) and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🏠 Homepage with hero section and the latest blog posts as cards
- 📰 Full blog index at `/blog`
- 📖 Individual blog post pages at `/blog/[slug]` with rendered markdown content
- 📄 Dynamic pages at `/[slug]` for every Pages object in your bucket
- 🧭 Dynamic header navigation (Home, Blog, + each Page)
- 🔍 Per-page SEO meta descriptions from `seo_description`
- 📱 Fully responsive, accessible, modern typography
- ⚡ Static-site generation for blazing fast performance

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ac97ead931992503d57f0a3&clone_repository=6ac98299931992503d57f0b7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> A content website built with Astro (use the Astro framework, not Next.js) powered by the existing Cosmic content types: "Blog Posts" (slug: post) and "Pages" (slug: page). Both types have seo_description, featured_image, published_at, author, and content (rich-text markdown) metafields. Features: a homepage listing the latest blog posts as cards with featured image, title, author, date, and excerpt; a blog index page at /blog; individual blog post pages at /blog/[slug] rendering the rich-text/markdown content with featured image, author, and published date; dynamic pages at /[slug] for Pages objects; a header nav that links Home, Blog, and each Page; a footer. Use seo_description for meta descriptions. Clean, modern, responsive design with good typography for reading.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Astro](https://astro.build) — Static-site framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [marked](https://marked.js.org) — Markdown rendering
- TypeScript

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- A Cosmic account and bucket with `post` and `page` object types

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file in the root with:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

## Cosmic SDK Examples

```typescript
import { cosmic } from './lib/cosmic'

// Get all blog posts
const { objects: posts } = await cosmic.objects
  .find({ type: 'post' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Get a single page by slug
const { object: page } = await cosmic.objects
  .findOne({ type: 'page', slug: 'about' })
  .props(['id', 'slug', 'title', 'content', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from two Cosmic object types:

- **Blog Posts** (`post`) — `seo_description`, `featured_image`, `published_at`, `author`, `content`
- **Pages** (`page`) — `seo_description`, `featured_image`, `published_at`, `author`, `content`

All content is fetched at build time using Astro's static-site generation, so pages are pre-rendered and served extremely fast. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel
1. Push this repo to GitHub
2. Import the project in Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify
1. Push this repo to GitHub
2. Import the project in Netlify
3. Build command: `bun run build`
4. Publish directory: `dist`
5. Add the environment variables in the Netlify dashboard

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's environment variable settings.
<!-- README_END -->