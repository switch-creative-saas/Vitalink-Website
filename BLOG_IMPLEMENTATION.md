# VitaLink Sanity Blog

VitaLink Insights is powered by Sanity CMS and built with the Next.js App Router.

## Environment Variables

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_server_token
SANITY_REVALIDATE_SECRET=your_webhook_secret
```

## Studio

The embedded Studio is available at:

```txt
/studio
```

Schemas live in `sanity/schemas`:

- `blogPost`
- `author`
- `category`

## Blog Routes

- `/blog`
- `/blog/[slug]`
- `/category/[slug]`
- `/tag/[slug]`
- `/search`

The blog uses the same VitaLink navigation, footer, typography, spacing, and white/blue/purple brand system as the main website.

## Revalidation

Sanity webhooks can call:

```txt
/api/revalidate
```

Set the webhook secret to `SANITY_REVALIDATE_SECRET`.
