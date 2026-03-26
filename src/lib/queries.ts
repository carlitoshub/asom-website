import { client } from "./sanity";

export type Project = {
  _id: string;
  artistName: string;
  slug: { current: string };
  realName?: string;
  creativeRole: string;
  creativeSkills?: string;
  partOfAsomSince: string;
  bio?: string;
  profilePic: { asset: { _ref: string } };
  homepageThumbnail?: { asset: { _ref: string } };
  seoThumbnail?: { asset: { _ref: string } };
  websiteText?: string;
  websiteLink?: string;
  labelDropdown?: string;
  gallery1?: { title?: string; description?: string; images?: { asset: { _ref: string } }[] };
  gallery2?: { title?: string; description?: string; images?: { asset: { _ref: string } }[] };
  spotifyLink1?: string;
  spotifyLink2?: string;
  spotifyLink3?: string;
  videoLink1Text?: string;
  videoLink2Text?: string;
  link?: string;
  sortOrder?: number;
  next?: { artistName: string; slug: { current: string } };
};

export type CaseHistory = {
  _id: string;
  eventName: string;
  slug: { current: string };
  date: string;
  description: string;
  eventType?: string;
  profilePic: { asset: { _ref: string } };
  homepageThumbnail?: { asset: { _ref: string } };
  websiteText?: string;
  websiteLink?: string;
  eventGallery?: { title?: string; description?: string; images?: { asset: { _ref: string } }[] };
  artworkGallery?: { title?: string; description?: string; images?: { asset: { _ref: string } }[] };
  videoBackground?: string;
  link?: string;
  sortOrder?: number;
  next?: { eventName: string; slug: { current: string } };
};

const projectFields = `
  _id, artistName, "slug": slug.current,
  realName, creativeRole, creativeSkills, partOfAsomSince, bio,
  profilePic, homepageThumbnail, seoThumbnail,
  websiteText, websiteLink, labelDropdown,
  gallery1 { title, description, images[] },
  gallery2 { title, description, images[] },
  spotifyLink1, spotifyLink2, spotifyLink3,
  videoLink1Text, videoLink2Text, link, sortOrder,
  next-> { artistName, "slug": slug.current }
`;

const caseHistoryFields = `
  _id, eventName, "slug": slug.current,
  date, description, eventType,
  profilePic, homepageThumbnail, seoThumbnail,
  websiteText, websiteLink,
  eventGallery { title, description, images[] },
  artworkGallery { title, description, images[] },
  videoBackground, link, sortOrder,
  next-> { eventName, "slug": slug.current }
`;

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project"] | order(sortOrder asc) { ${projectFields} }`);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`, { slug });
}

export async function getAllCaseHistories(): Promise<CaseHistory[]> {
  return client.fetch(`*[_type == "caseHistory"] | order(sortOrder asc) { ${caseHistoryFields} }`);
}

export async function getCaseHistoryBySlug(slug: string): Promise<CaseHistory> {
  return client.fetch(`*[_type == "caseHistory" && slug.current == $slug][0] { ${caseHistoryFields} }`, { slug });
}
