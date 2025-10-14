const contentfulImport = require('contentful-import');

if (!process.env.VERCEL) {
  const dotEnv = require('dotenv');
  dotEnv.config({ path: `${process.env.PATH_TO_ENV_FILE}` });
}

// ✅ Move validation *after* dotenv (for local), but don’t throw unless still missing
const requiredVars = [
  'NEXT_PUBLIC_CONTENTFUL_SPACE_ID',
  'CONTENTFUL_MANAGEMENT_TOKEN',
];

const missing = requiredVars.filter((v) => !process.env[v]);

if (missing.length) {
  console.warn('Missing required environment variables:', missing.join(', '));
  if (process.env.VERCEL) {
    console.log('⚠️  Skipping Contentful setup in Vercel environment due to missing variables');
    process.exit(0); // Don't fail the build in Vercel
  } else {
    process.exit(1); // Fail in local development
  }
}

const importOptions = {
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  environmentId: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master',
  managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  contentFile: './contentful/data/contentful-space-data.json',
};

contentfulImport(importOptions)
  .then(() => {
    return console.log(
      '✅ Content model and entries imported to Contentful space!'
    );
  })
  .catch((e) => {
    console.error('❌ Contentful import failed:', e);
    process.exit(1);
  });
