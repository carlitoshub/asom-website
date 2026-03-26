import { defineField, defineType } from "sanity";

export const caseHistoryType = defineType({
  name: "caseHistory",
  title: "Case History",
  type: "document",
  fields: [
    defineField({ name: "eventName", title: "Event Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "eventName" }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: ["FLAGSHIP EVENT", "CURATED BY ASOM", "POWERED BY ASOM"],
      },
    }),
    defineField({ name: "profilePic", title: "Cover Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "homepageThumbnail", title: "Homepage Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "seoThumbnail", title: "SEO Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "websiteText", title: "Website (display text)", type: "string" }),
    defineField({ name: "websiteLink", title: "Website (URL)", type: "url" }),
    defineField({
      name: "eventGallery",
      title: "Event Photo Gallery",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "string" }),
        defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      ],
    }),
    defineField({
      name: "artworkGallery",
      title: "Artwork Gallery",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "string" }),
        defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      ],
    }),
    defineField({ name: "videoBackground", title: "Background Video (mp4 URL)", type: "url" }),
    defineField({ name: "link", title: "External Link", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({
      name: "next",
      title: "Next Case History",
      type: "reference",
      to: [{ type: "caseHistory" }],
    }),
  ],
  preview: {
    select: { title: "eventName", subtitle: "eventType", media: "profilePic" },
  },
});
