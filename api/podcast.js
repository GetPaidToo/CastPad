// /api/podcast.js
export default async function handler(req, res) {
  const feedUrl = 'https://api.allorigins.win/raw?url=https://rss.art19.com/the-daily';
  
  try {
    const response = await fetch(feedUrl);
    const data = await response.text();

    // Send the RSS feed as JSON to the frontend
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching podcast feed' });
  }
}