/**
 * ASOM Sanity Seed Import Script
 *
 * Imports all artists (Projects) and Case Histories from Framer CMS data
 * into Sanity, uploading all images along the way.
 *
 * Usage:
 *   npx tsx sanity/seed/import.ts
 *
 * Requires SANITY_API_TOKEN in .env.local (write token from sanity.io/manage)
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

// Load env vars from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || projectId === "placeholder") {
  console.error("❌ Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first");
  process.exit(1);
}
if (!token) {
  console.error("❌ Set SANITY_API_TOKEN in .env.local first");
  console.error("   Get a write token at: https://sanity.io/manage → your project → API → Tokens");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// Cache uploaded image URLs → Sanity asset IDs to avoid re-uploading
const imageCache = new Map<string, string>();

async function uploadImage(url: string): Promise<string | null> {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url)!;

  try {
    console.log(`  ↑ Uploading image: ${url.split("/").pop()}`);
    const res = await fetch(url);
    if (!res.ok) { console.warn(`  ⚠ Failed to fetch ${url}`); return null; }
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const ext = contentType.split("/")[1]?.split(";")[0] || "jpg";
    const asset = await client.assets.upload("image", buffer, { contentType, filename: `${Date.now()}.${ext}` });
    imageCache.set(url, asset._id);
    return asset._id;
  } catch (e) {
    console.warn(`  ⚠ Error uploading ${url}:`, e);
    return null;
  }
}

function imageRef(assetId: string) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function importProjects() {
  console.log("\n📦 Importing Projects (Artists)...");
  const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "projects.json"), "utf-8"));

  for (const p of raw) {
    console.log(`\n→ ${p.artistName}`);

    // Upload single images
    const profilePicId = p.profilePic ? await uploadImage(p.profilePic) : null;
    const homepageThumbnailId = p.homepageThumbnail ? await uploadImage(p.homepageThumbnail) : null;
    const seoThumbnailId = p.seoThumbnail ? await uploadImage(p.seoThumbnail) : null;

    // Upload gallery 1 images
    const gallery1Images: object[] = [];
    if (Array.isArray(p.gallery1)) {
      for (const img of p.gallery1) {
        const src = typeof img === "string" ? img : img?.src || img?.url;
        if (src) {
          const id = await uploadImage(src);
          if (id) gallery1Images.push({ ...imageRef(id), _key: id.slice(-8) });
        }
      }
    }

    // Upload gallery 2 images
    const gallery2Images: object[] = [];
    if (Array.isArray(p.gallery2)) {
      for (const img of p.gallery2) {
        const src = typeof img === "string" ? img : img?.src || img?.url;
        if (src) {
          const id = await uploadImage(src);
          if (id) gallery2Images.push({ ...imageRef(id), _key: id.slice(-8) });
        }
      }
    }

    const doc: Record<string, unknown> = {
      _id: `project-${p._id}`,
      _type: "project",
      artistName: p.artistName,
      slug: { _type: "slug", current: p.slug },
      realName: p.realName || undefined,
      creativeRole: p.creativeRole,
      creativeSkills: p.creativeSkills || undefined,
      partOfAsomSince: p.partOfAsomSince,
      bio: p.bio || undefined,
      websiteText: p.websiteText || undefined,
      websiteLink: p.websiteLink || undefined,
      labelDropdown: p.labelDropdown || undefined,
      spotifyLink1: p.spotifyLink1 || undefined,
      spotifyLink2: p.spotifyLink2 || undefined,
      spotifyLink3: p.spotifyLink3 || undefined,
      videoLink1Text: p.videoLink1Text || undefined,
      videoLink2Text: p.videoLink2Text || undefined,
      link: p.link || undefined,
      sortOrder: p.id || 0,
    };

    if (profilePicId) doc.profilePic = imageRef(profilePicId);
    if (homepageThumbnailId) doc.homepageThumbnail = imageRef(homepageThumbnailId);
    if (seoThumbnailId) doc.seoThumbnail = imageRef(seoThumbnailId);
    if (gallery1Images.length) {
      doc.gallery1 = {
        title: p.gallery1Title || undefined,
        description: p.gallery1Description || undefined,
        images: gallery1Images,
      };
    }
    if (gallery2Images.length) {
      doc.gallery2 = {
        title: p.gallery2Title || undefined,
        description: p.gallery2Description || undefined,
        images: gallery2Images,
      };
    }

    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    console.log(`  ✓ Saved ${p.artistName}`);
  }

  console.log("\n✅ All projects imported.");
}

async function importCaseHistories() {
  console.log("\n📦 Importing Case Histories...");
  const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "caseHistories.json"), "utf-8"));

  for (const c of raw) {
    console.log(`\n→ ${c.eventName}`);

    const profilePicId = c.profilePic ? await uploadImage(c.profilePic) : null;
    const homepageThumbnailId = c.homepageThumbnail ? await uploadImage(c.homepageThumbnail) : null;
    const seoThumbnailId = c.seoThumbnail ? await uploadImage(c.seoThumbnail) : null;

    // Upload event gallery images
    const eventImages: object[] = [];
    if (c.eventGallery?.images) {
      for (const url of c.eventGallery.images) {
        if (url) {
          const id = await uploadImage(url);
          if (id) eventImages.push({ ...imageRef(id), _key: id.slice(-8) });
        }
      }
    }

    // Upload artwork gallery images
    const artworkImages: object[] = [];
    if (c.artworkGallery?.images) {
      for (const url of c.artworkGallery.images) {
        if (url) {
          const id = await uploadImage(url);
          if (id) artworkImages.push({ ...imageRef(id), _key: id.slice(-8) });
        }
      }
    }

    const doc: Record<string, unknown> = {
      _id: `casehistory-${c._id}`,
      _type: "caseHistory",
      eventName: c.eventName,
      slug: { _type: "slug", current: c.slug },
      date: c.date,
      description: c.description,
      eventType: c.eventType || undefined,
      websiteText: c.websiteText || undefined,
      websiteLink: c.websiteLink || undefined,
      videoBackground: c.videoBackground || undefined,
      link: c.link || undefined,
      sortOrder: c.sortOrder || 0,
    };

    if (profilePicId) doc.profilePic = imageRef(profilePicId);
    if (homepageThumbnailId) doc.homepageThumbnail = imageRef(homepageThumbnailId);
    if (seoThumbnailId) doc.seoThumbnail = imageRef(seoThumbnailId);
    if (eventImages.length) {
      doc.eventGallery = {
        title: c.eventGallery?.title || undefined,
        description: c.eventGallery?.description || undefined,
        images: eventImages,
      };
    }
    if (artworkImages.length) {
      doc.artworkGallery = {
        title: c.artworkGallery?.title || undefined,
        description: c.artworkGallery?.description || undefined,
        images: artworkImages,
      };
    }

    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    console.log(`  ✓ Saved ${c.eventName}`);
  }

  console.log("\n✅ All case histories imported.");
}

async function main() {
  console.log(`\n🚀 ASOM Sanity Import`);
  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  await importProjects();
  await importCaseHistories();

  console.log("\n🎉 Import complete! Open your Sanity studio at /studio to review.");
}

main().catch((e) => { console.error(e); process.exit(1); });
