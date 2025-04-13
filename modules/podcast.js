export async function fetchPodcasts(feeds) {
  const podcastData = [];

  for (const feed of feeds) {
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        podcastData.push({
          title: data.feed.title || feed.title,
          description: data.feed.description || '',
          episodeTitle: data.items[0].title,
          audioUrl: data.items[0].enclosure.link || data.items[0].enclosure.url,
        });
      }
    } catch (error) {
      console.error(`Failed to fetch ${feed.title}:`, error);
    }
  }

  return podcastData;
}
