document.getElementById('toggle-darkmode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('DOMContentLoaded', () => {
  const podcastList = document.getElementById('podcast-list');

  const feeds = [
    {
      title: "The Daily",
      url: "https://rss.art19.com/the-daily"
    },
    {
      title: "TLDR Daily",
      url: "https://feeds.transistor.fm/tldr-daily"
    },
    {
      title: "Huberman Lab",
      url: "https://feeds.simplecast.com/54nAGcIl"
    },
    {
      title: "This American Life",
      url: "https://feeds.thisamericanlife.org/talpodcast"
    }
  ];

  async function loadFeeds() {
    for (const feed of feeds) {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
        const data = await response.json();

        const container = document.createElement('div');
        container.className = 'podcast';

        const titleEl = document.createElement('h2');
        titleEl.textContent = data.feed.title || feed.title;
        container.appendChild(titleEl);

        const descEl = document.createElement('p');
        descEl.textContent = data.feed.description || '';
        container.appendChild(descEl);

        if (data.items && data.items.length > 0) {
          const episode = data.items[0];

          const epTitleEl = document.createElement('h3');
          epTitleEl.textContent = `Latest: ${episode.title}`;
          container.appendChild(epTitleEl);

          const audio = document.createElement('audio');
          audio.controls = true;
          audio.src = episode.enclosure.link || episode.enclosure.url;
          container.appendChild(audio);
        }

        podcastList.appendChild(container);
      } catch (error) {
        console.error('Error loading feed:', feed.url, error);
      }
    }
  }

  loadFeeds();
});
