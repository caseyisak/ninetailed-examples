# Cloned Space Setup

This branch contains the setup for using the cloned Contentful space `80sdxx1czlbv`.

## Environment Variables for Vercel

To deploy this branch to Vercel with the cloned space, set these environment variables in your Vercel project:

```
NEXT_PUBLIC_NINETAILED_CLIENT_ID=your_ninetailed_client_id
NEXT_PUBLIC_NINETAILED_ENVIRONMENT=main
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=80sdxx1czlbv
CONTENTFUL_TOKEN=your_contentful_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_contentful_preview_token
CONTENTFUL_PREVIEW_SECRET=
CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
CONTENTFUL_SPACE_DATA_LOCATION=
```

## What's Different

- **Source Space**: `ni3qrizwaanu` (original)
- **Target Space**: `80sdxx1czlbv` (cloned)
- **Content**: All content types, entries, and assets have been cloned
- **Status**: Some content types may show warnings as they don't have React components yet

## Files Added

- `clone_contentful.js` - Script for cloning Contentful spaces
- `import-to-target.sh` - Shell script for importing content
- `CLONED_SPACE_SETUP.md` - This documentation

## Deployment

1. Push this branch to your repository
2. In Vercel, create a new deployment from this branch
3. Set the environment variables listed above
4. Deploy

The cloned space contains all the same content as the original space but with some additional content types that may need React components to be created.
