import { fetchPodcasts } from './modules/podcast.js';

document.getElementById('toggle-darkmode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('DOMContentLoaded', async () => {
  const podcastList = document.getElementById('podcast-list');

  const feeds = [
    {
      title: "The Daily Breifing",
      url: "https://rss.art19.com/the-daily-briefing"
    },
    {
      title: "This American Life",
      url: "https://feeds.thisamericanlife.org/talpodcast"
    }
  ];

  const podcasts = await fetchPodcasts(feeds);

  podcasts.forEach(podcast => {
    const container = document.createElement('div');
    container.className = 'podcast';

    const titleEl = document.createElement('h2');
    titleEl.textContent = podcast.title;
    container.appendChild(titleEl);

    const descEl = document.createElement('p');
    descEl.textContent = podcast.description;
    container.appendChild(descEl);

    const epTitleEl = document.createElement('h3');
    epTitleEl.textContent = `Latest: ${podcast.episodeTitle}`;
    container.appendChild(epTitleEl);

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = podcast.audioUrl;
    container.appendChild(audio);

    podcastList.appendChild(container);
  });
});
