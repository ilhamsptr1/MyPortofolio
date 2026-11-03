/**
 * Studio Content Data — Ilham Saputra
 * 
 * Contains content items for the Studio monitor tower:
 * - Case Studies of Ilham's top web applications
 * - Tech Lab & Coding Experiment deep dives
 * - Social & Developer channels (TikTok, Instagram, GitHub)
 * - Academic journey at Universitas Gunadarma
 */

export const PLATFORM_CONFIG = {
    case_study: {
        color: '#3B82F6',
        accentColor: '#1D4ED8',
        icon: '🔬',
        label: 'Case Study',
        shape: 'monitor', // Desktop monitor style
    },
    tech_lab: {
        color: '#F59E0B',
        accentColor: '#D97706',
        icon: '⚡',
        label: 'Tech Lab',
        shape: 'tv', // CRT TV style
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok Dev',
        shape: 'phone', // Vertical phone style
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '📷',
        label: 'Instagram',
        shape: 'phone',
    },
    github: {
        color: '#24292e',
        accentColor: '#181717',
        icon: '💻',
        label: 'Open Source',
        shape: 'monitor',
    },
    youtube: {
        color: '#EF4444',
        accentColor: '#DC2626',
        icon: '▶',
        label: 'Live Demo',
        shape: 'tv',
    },
    blog: {
        color: '#10B981',
        accentColor: '#059669',
        icon: '📝',
        label: 'Dev Notes',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ Case Studies ============
    {
        id: 'cs-001',
        platform: 'case_study',
        title: 'IMovie: Full HD Streaming & Subtitle Pipeline',
        description: 'Technical architecture breakdown of IMovie. Explores adaptive video streaming buffers, multi-source failover mechanisms, responsive video controls, and seamless Indonesian subtitle rendering with customized media queries.',
        url: 'https://imovie.web.id/',
        date: '2026-02-15',
        views: '1.8K reads',
    },
    {
        id: 'cs-002',
        platform: 'case_study',
        title: 'IMusic: 24-Bit Hi-Fi Lossless & Synced Lyrics',
        description: 'Architectural breakdown of the IMusic player engine. Features Web Audio API state synchronization, caching layers for lossless audio streaming, dynamic UI palette extraction from album artwork, and real-time lyric syncing down to the millisecond.',
        url: 'https://imusic.web.id/',
        date: '2026-01-28',
        views: '2.4K reads',
    },
    {
        id: 'cs-003',
        platform: 'case_study',
        title: 'AI News Analyzer: NLP Sentiment Classification',
        description: 'How AI News Analyzer ingests raw journalism feeds, extracts named entities, performs contextual sentiment analysis (positive/neutral/negative polarity), and serves automated summaries via modern NLP models.',
        url: 'https://ai-news-analyzer-five.vercel.app/',
        date: '2026-01-14',
        views: '1.5K reads',
    },
    {
        id: 'cs-004',
        platform: 'case_study',
        title: 'ConvertHub: Zero-Server Client-Side Conversion',
        description: 'Engineering ConvertHub as a privacy-first web utility suite. Demonstrates how WebAssembly and JavaScript Canvas/Blob streams convert images, documents, and currency calculations entirely inside the user\'s browser without sending sensitive data to external servers.',
        url: 'https://converthub-flax.vercel.app/',
        date: '2025-12-20',
        views: '1.2K reads',
    },
    {
        id: 'cs-005',
        platform: 'case_study',
        title: 'Prediksi Bola: Live Score Webhooks & Head-to-Head Stats',
        description: 'Real-time sports data pipeline combining third-party football REST APIs, team performance trends, head-to-head match history, and automated odds calculations presented through high-performance Next.js server components.',
        url: 'https://prediksibola-two.vercel.app/',
        date: '2025-11-30',
        views: '1.9K reads',
    },
    {
        id: 'cs-006',
        platform: 'case_study',
        title: 'i-Photo Booth: Accessing WebRTC Streams & Canvas Filters',
        description: 'Deep dive into the browser MediaDevices API, handling high-definition webcam video streams, applying custom retro color grading shaders on an HTML5 2D canvas, and generating downloadable photo booth print strips.',
        url: 'https://i-photo-booth-chi.vercel.app/',
        date: '2025-11-15',
        views: '2.1K reads',
    },

    // ============ Tech Lab & Coding Experiments ============
    {
        id: 'lab-001',
        platform: 'tech_lab',
        title: 'Interactive 3D on the Web: Three.js & R3F Notes',
        description: 'Key learnings on 3D web graphics: managing draw calls, instanced meshes, custom GLSL shaders, camera parallax mathematics, and achieving consistent 60 FPS performance on both mobile and desktop GPUs.',
        url: 'https://github.com/ilhamsptr1',
        date: '2026-02-01',
        views: '3.5K reads',
    },
    {
        id: 'lab-002',
        platform: 'tech_lab',
        title: 'Fluid Motion: Mastering GSAP Timelines & Transitions',
        description: 'Techniques for smooth user interfaces. Covers custom easing curves, physics-based springs, SVG path morphing, paper-tear canvas animations, and optimizing animation frames with requestAnimationFrame.',
        url: 'https://github.com/ilhamsptr1',
        date: '2025-12-10',
        views: '2.7K reads',
    },
    {
        id: 'lab-003',
        platform: 'tech_lab',
        title: 'Modern Responsive Design: CSS Grid & Touch Physics',
        description: 'Practical guidelines for reflowing complex layouts from mobile phone screens to ultra-wide desktop monitors without layout shifts (CLS), ensuring 48px tap targets, and handling touch drag physics.',
        url: 'https://github.com/ilhamsptr1',
        date: '2025-10-25',
        views: '1.6K reads',
    },
    {
        id: 'lab-004',
        platform: 'tech_lab',
        title: 'Web Performance Checklist: 95+ Lighthouse Score',
        description: 'Actionable techniques to maximize frontend speed: modern WebP/AVIF image formats, dynamic code splitting with Vite/Next.js, lazy-loading offscreen modules, and minimizing JavaScript bundle weight.',
        url: 'https://github.com/ilhamsptr1',
        date: '2025-10-05',
        views: '2.9K reads',
    },

    // ============ Social Channels & Academic Journey ============
    {
        id: 'soc-001',
        platform: 'tiktok',
        title: 'TikTok Coding & Tech Tips: @ninetofive925',
        description: 'Check out my TikTok for quick web development breakdowns, daily coding workflows, developer setup aesthetics, and behind-the-scenes glimpses of projects in progress.',
        url: 'https://www.tiktok.com/@ninetofive925',
        date: '2026-02-20',
        views: 'Follow @ninetofive925',
    },
    {
        id: 'soc-002',
        platform: 'instagram',
        title: 'Instagram Creative & Dev Life: @ilhammsptra_',
        description: 'Follow my creative journey, UI/UX explorations, college life in Informatics at Universitas Gunadarma, and updates on new web projects on Instagram.',
        url: 'https://www.instagram.com/ilhammsptra_/',
        date: '2026-02-18',
        views: 'Follow @ilhammsptra_',
    },
    {
        id: 'soc-003',
        platform: 'github',
        title: 'Open Source Repositories on GitHub: @ilhamsptr1',
        description: 'Explore the source code, experimental commits, and frontend libraries of my public projects. Contributions and star ratings are always welcome!',
        url: 'https://github.com/ilhamsptr1',
        date: '2026-02-10',
        views: 'github.com/ilhamsptr1',
    },
    {
        id: 'soc-004',
        platform: 'blog',
        title: 'Academic Journey: Informatika @ Universitas Gunadarma',
        description: 'Reflections and highlights as an Informatics student at Universitas Gunadarma. Covering data structures, algorithms, software engineering principles, and bridging theory with production-grade web applications.',
        url: 'https://www.gunadarma.ac.id/',
        date: '2025-09-01',
        views: 'Univ. Gunadarma',
    },
];

// Fallback textures for each shape
export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    const shape = PLATFORM_CONFIG[item.platform]?.shape || 'monitor';
    return {
        ...item,
        frontTexture: item.frontTexture || (
            shape === 'tv' ? '/textures/studio/tv_front.webp' :
                shape === 'monitor' ? '/textures/studio/monitor_front.webp' :
                    '/textures/studio/phone_front.webp'
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            shape === 'tv' ? '/textures/studio/tv_front_painted.webp' :
                shape === 'monitor' ? '/textures/studio/monitor_front_painted.webp' :
                    '/textures/studio/phone_front_painted.webp'
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
