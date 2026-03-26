import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project (Artist)",
  type: "document",
  fields: [
    defineField({ name: "artistName", title: "Artist Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "artistName" }, validation: (r) => r.required() }),
    defineField({ name: "realName", title: "Real Name", type: "string" }),
    defineField({ name: "creativeRole", title: "Creative Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "creativeSkills", title: "Creative Skills", type: "string" }),
    defineField({ name: "partOfAsomSince", title: "Part of ASOM Since", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "profilePic", title: "Profile Picture", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "homepageThumbnail", title: "Homepage Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "seoThumbnail", title: "SEO Thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "websiteText", title: "Website (display text)", type: "string" }),
    defineField({ name: "websiteLink", title: "Website (URL)", type: "url" }),
    defineField({ name: "labelDropdown", title: "Creative Category", type: "string" }),
    defineField({
      name: "gallery1",
      title: "Gallery 1",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "string" }),
        defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      ],
    }),
    defineField({
      name: "gallery2",
      title: "Gallery 2",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "string" }),
        defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      ],
    }),
    defineField({ name: "spotifyLink1", title: "Spotify Link 1", type: "string" }),
    defineField({ name: "spotifyLink2", title: "Spotify Link 2", type: "string" }),
    defineField({ name: "spotifyLink3", title: "Spotify Link 3", type: "string" }),
    defineField({ name: "videoLink1Text", title: "Video Link 1 Text", type: "string" }),
    defineField({ name: "videoLink2Text", title: "Video Link 2 Text", type: "string" }),
    defineField({ name: "link", title: "External Link", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({
      name: "next",
      title: "Next Artist",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
  preview: {
    select: { title: "artistName", subtitle: "creativeRole", media: "profilePic" },
  },
});
