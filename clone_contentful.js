#!/usr/bin/env node

/**
 * Contentful Space Cloning Script
 * Clones content types, assets, and entries from source space to target space
 */

const fs = require("fs");
const path = require("path");

// Content type mapping from source to target
const contentTypeMapping = {
  nt_audience: "ninetailedAudience",
  nt_mergetag: "ninetailedMergeTag",
  nt_experience: "ninetailedExperience",
  seo: "seo",
  button: "button",
};

// Content types that need to be created in order (dependencies first)
const contentTypeOrder = [
  // Foundational types (no dependencies)
  "nt_audience",
  "nt_mergetag",
  "seo",
  "button",

  // Types that depend on foundational types
  "nt_experience",
  "navigationLink",
  "footer",
  "navigation",
  "banner",
  "hero",
  "cta",
  "feature",
  "pricingPlan",
  "pricingTable",
  "hubspotForm",
  "sectionsGroup",
  "config",
  "setting",
  "productDetail",
  "productInfoBlock",
  "productPolicy",
  "pdp",
  "article",
  "page",

  // Newer types
  "advertisement",
  "cardContainer",
  "creatorCard",
  "videoContainer",
  "videoModal",
  "buttonTooltip",
];

// Function to convert content type ID to camelCase
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// Function to get content type definition from export file
function getContentTypeFromExport(contentTypeId, exportData) {
  return exportData.contentTypes.find((ct) => ct.sys.id === contentTypeId);
}

// Function to transform field references
function transformFieldReferences(fields, contentTypeMapping) {
  return fields.map((field) => {
    if (
      field.type === "Link" &&
      field.linkType === "Entry" &&
      field.validations
    ) {
      field.validations.forEach((validation) => {
        if (validation.linkContentType) {
          validation.linkContentType = validation.linkContentType.map(
            (ctId) => {
              return contentTypeMapping[ctId] || toCamelCase(ctId);
            }
          );
        }
      });
    }

    if (
      field.type === "Array" &&
      field.items &&
      field.items.type === "Link" &&
      field.items.linkType === "Entry"
    ) {
      if (field.items.validations) {
        field.items.validations.forEach((validation) => {
          if (validation.linkContentType) {
            validation.linkContentType = validation.linkContentType.map(
              (ctId) => {
                return contentTypeMapping[ctId] || toCamelCase(ctId);
              }
            );
          }
        });
      }
    }

    return field;
  });
}

// Main cloning function
async function cloneContentTypes() {
  try {
    // Read the export file
    const exportPath = path.join(
      __dirname,
      "contentful-export-ni3qrizwaanu-master-2025-06-03T17-09-49.json"
    );
    const exportData = JSON.parse(fs.readFileSync(exportPath, "utf8"));

    console.log("Starting content type cloning...");
    console.log(
      `Found ${exportData.contentTypes.length} content types in export`
    );

    // Process content types in dependency order
    for (const contentTypeId of contentTypeOrder) {
      const contentType = getContentTypeFromExport(contentTypeId, exportData);

      if (!contentType) {
        console.log(
          `⚠️  Content type ${contentTypeId} not found in export, skipping...`
        );
        continue;
      }

      const targetContentTypeId =
        contentTypeMapping[contentTypeId] || toCamelCase(contentTypeId);

      console.log(`\n📋 Processing ${contentTypeId} -> ${targetContentTypeId}`);

      // Transform fields to update references
      const transformedFields = transformFieldReferences(
        contentType.fields,
        contentTypeMapping
      );

      const contentTypeData = {
        name: contentType.name,
        description: contentType.description || "",
        displayField: contentType.displayField,
        fields: transformedFields,
      };

      console.log(`   Fields: ${transformedFields.length}`);
      console.log(`   Display field: ${contentTypeData.displayField}`);

      // Update mapping
      contentTypeMapping[contentTypeId] = targetContentTypeId;
    }

    console.log("\n✅ Content type analysis complete!");
    console.log("\nContent type mapping:");
    Object.entries(contentTypeMapping).forEach(([source, target]) => {
      console.log(`  ${source} -> ${target}`);
    });
  } catch (error) {
    console.error("❌ Error during cloning:", error);
  }
}

// Run the script
if (require.main === module) {
  cloneContentTypes();
}

module.exports = {
  cloneContentTypes,
  contentTypeMapping,
  contentTypeOrder,
  toCamelCase,
  transformFieldReferences,
};
