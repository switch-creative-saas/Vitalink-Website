# Contentful CMS Setup for VitaLink Blog

## Required Packages

Install these packages:

```bash
npm install contentful @contentful/rich-text-react-renderer
```

## Environment Variables

Add these to your `.env.local` file:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_content_preview_api_token
```

## Getting Contentful Credentials

1. Go to [contentful.com](https://www.contentful.com/) and sign up/login
2. Create a new space or use an existing one
3. Go to Settings > API keys
4. Add a new API key or use an existing one
5. Copy the Space ID and Content Delivery API token
6. For preview functionality, also copy the Content Preview API token

## Content Model Setup

Create a content type called "Blog Post" with the following fields:

### Required Fields

1. **Title** (Text, Required)
2. **Slug** (Text, Required, Unique)
3. **Excerpt** (Text, Required)
4. **Featured Image** (Media, Required)
5. **Content** (Rich Text, Required)
6. **Author** (Text, Required)
7. **Author Bio** (Text, Required)
8. **Author Photo** (Media, Required)
9. **Category** (Text, Required)
10. **Tags** (List, Required)
11. **Published Date** (Date & Time, Required)
12. **SEO Title** (Text, Required)
13. **SEO Description** (Text, Required)
14. **Reading Time** (Number, Required)
15. **Status** (Select, Required) - Options: Draft, Published, Scheduled
16. **Featured Article** (Boolean, Required)

### Categories

Use these categories:
- Healthcare Education
- Public Health
- Digital Health
- Disease Surveillance
- Telemedicine
- Hospital Management
- Medical Technology
- Artificial Intelligence
- Healthcare Policy
- NGO & Community Health
- Patient Stories
- Company News
- Partnerships
- Research & Insights

### Tags

Use these tags:
- Malaria
- Tuberculosis
- Leprosy
- NTDs
- COVID-19
- Health Insurance
- EMR
- EHR
- Healthcare Infrastructure
- VitaMind AI
- VitaLink Sentinel
- VitaCard
- Telemedicine
- Public Health
- Nigeria
- Africa
