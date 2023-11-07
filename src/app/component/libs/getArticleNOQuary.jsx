export async function getArticleNOQuarys() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseurl}/api/v1/articles/all`);

  if (!res.ok) {
    throw Error("this article are not abiable here ");
  }
  return res.json();
}

export default async function getArticleNOQuary() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseurl}/api/v1/articles/all`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw Error("The articles are not available here.");
  }

  const data = await res.json();

  // Create an object to store tag counts
  const counts = {};

  // Iterate through the articles and count tags
  data.forEach((article) => {
    const tags = article.tags.split(",").map((tag) => tag.trim());

    // Count tags
    tags.forEach((tag) => {
      if (counts[tag]) {
        counts[tag]++;
      } else {
        counts[tag] = 1;
      }
    });
  });

  // Sort the tags by count in descending order
  const sortedTags = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  // Take only the top four tags
  const topFourTags = sortedTags.slice(0, 4);

  // Create an object to store covers associated with top four tags
  const covers = {};

  // Iterate through the articles and associate cover images with top tags
  data.forEach((article) => {
    const tags = article.tags.split(",").map((tag) => tag.trim());

    tags.forEach((tag) => {
      if (topFourTags.includes(tag) && !covers[tag]) {
        covers[tag] = article.cover; // Assuming article has a 'cover' property
      }
    });
  });

  // Create an object to store tag counts and covers for top four tags
  const topFourCounts = {};
  const topFourCovers = {};

  topFourTags.forEach((tag) => {
    topFourCounts[tag] = counts[tag];
    topFourCovers[tag] = covers[tag];
  });

  return { counts: topFourCounts, covers: topFourCovers };
}
