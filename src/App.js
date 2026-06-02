import { useEffect, useState } from 'react';
import './App.css';

const CATEGORIES = [
  { label: 'Top Stories', tag: null },
  { label: 'Ask HN', tag: 'ask' },
  { label: 'Show HN', tag: 'show' },
  { label: 'Jobs', tag: 'job' },
];

const API = 'https://hacker-news.firebaseio.com/v0';

function timeAgo(unix) {
  const diff = Math.floor((Date.now() / 1000 - unix) / 60);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

function useStory(id) {
  const [story, setStory] = useState(null);
  useEffect(() => {
    fetch(`${API}/item/${id}.json`)
      .then(r => r.json())
      .then(setStory);
  }, [id]);
  return story;
}

function HeroCard({ id }) {
  const story = useStory(id);
  if (!story) return null;

  const domain = story.url
    ? new URL(story.url).hostname.replace('www.', '')
    : 'news.ycombinator.com';
  const link = story.url || `https://news.ycombinator.com/item?id=${story.id}`;

  return (
    <div className="hero">
      <div>
        <div className="hero-label">Featured · {domain}</div>
        <div className="hero-title">{story.title}</div>
        <div className="hero-meta">{timeAgo(story.time)} · by {story.by}</div>
        <div className="hero-excerpt">
          Discussed by the tech community · {story.descendants ?? 0} comments on Hacker News.
        </div>
        <a className="hero-link" href={link} target="_blank" rel="noreferrer">
          Read Article
        </a>
        <div className="hero-score">▲ {story.score} points</div>
      </div>
      <div style={{
        background: '#f0ede8',
        borderRadius: '2px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccc',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        The Briefing
      </div>
    </div>
  );
}

function NewsCard({ id }) {
  const story = useStory(id);
  if (!story) return null;

  const domain = story.url
    ? new URL(story.url).hostname.replace('www.', '')
    : 'news.ycombinator.com';
  const link = story.url || `https://news.ycombinator.com/item?id=${story.id}`;

  return (
    <a className="card" href={link} target="_blank" rel="noreferrer">
      <div className="card-label">{domain}</div>
      <h2>{story.title}</h2>
      <div className="card-meta">
        <span>{timeAgo(story.time)} · {story.by}</span>
        <span>▲ {story.score}</span>
      </div>
    </a>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const endpoint = activeCategory.tag
      ? `${API}/${activeCategory.tag}stories.json`
      : `${API}/topstories.json`;

    fetch(endpoint)
      .then(r => r.json())
      .then(data => { setIds(data.slice(0, 28)); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [activeCategory]);

  return (
    <>
      <div className="top-bar">Tech News · Updated in real time · Hacker News</div>

      <header>
        <div className="logo">The <span>Briefing</span></div>
        <div className="tagline">Tech news, straight to the point</div>
      </header>

      <nav className="categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.label}
            className={activeCategory.label === cat.label ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="app-body">
        {loading && <div className="loading">Loading stories…</div>}
        {error && <div className="error">Failed to load. Please try again.</div>}

        {!loading && !error && ids.length > 0 && (
          <>
            <HeroCard id={ids[0]} />
            <div className="section-title">Latest Stories</div>
            <div className="news-grid">
              {ids.slice(1).map(id => <NewsCard key={id} id={id} />)}
            </div>
          </>
        )}
      </div>

      <footer>
        <span>© 2025 The Briefing</span>
        <a href="https://github.com/wiameelyakini" target="_blank" rel="noreferrer">
          Wiame EL YAKINI
        </a>
        <a href="https://news.ycombinator.com" target="_blank" rel="noreferrer">
          Powered by Hacker News
        </a>
      </footer>
    </>
  );
}
