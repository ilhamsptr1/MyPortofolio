/**
 * SEO Plugin for Ilham Saputra Portfolio
 * Injects structured schema.org JSON-LD, meta tags, and llms.txt at build time.
 */

const BASE_URL = 'https://myportofolio-nine-pied.vercel.app';

const ILHAM_PROJECTS = [
    {
        name: 'i-Photo Booth',
        description: 'A fun and interactive web-based photo booth application with real-time filters and sharing capabilities.',
        url: 'https://i-photo-booth-chi.vercel.app/',
        tags: 'React, Webcam API, Tailwind CSS'
    },
    {
        name: 'Prediksi Bola',
        description: 'A football match prediction platform with live scores and statistics.',
        url: 'https://prediksibola-two.vercel.app/',
        tags: 'Next.js, API, Sports'
    },
    {
        name: 'Laporan Keuangan',
        description: 'Financial reporting dashboard to manage expenses and track revenue effectively.',
        url: 'https://laporan-keuangan-ivory.vercel.app/',
        tags: 'React, Dashboard, Finance'
    },
    {
        name: 'Aplikasi Cuaca',
        description: 'Real-time weather application showing current conditions and forecasts for multiple cities.',
        url: 'https://ilhamsptr1.github.io/cuaca-1/',
        tags: 'JavaScript, Weather API, HTML/CSS'
    },
    {
        name: 'Ultra Milk Promo',
        description: 'An engaging and vibrant landing page designed for Ultra Milk promotional campaigns.',
        url: 'https://ilhamsptr1.github.io/ultramilk/',
        tags: 'HTML, CSS, Landing Page'
    },
    {
        name: 'i-Rating',
        description: 'A universal feedback and rating system widget that can be embedded in any application.',
        url: 'https://i-rating.vercel.app/',
        tags: 'React, UI/UX, Feedback'
    },
    {
        name: 'AI News Analyzer',
        description: 'Analyze news articles using AI — sentiment analysis, named entity recognition, NLP, and automated summarization.',
        url: 'https://ai-news-analyzer-five.vercel.app/',
        tags: 'React, AI / NLP, Vite, Sentiment'
    },
    {
        name: 'ConvertHub',
        description: 'Fast, secure, AI-powered file conversion tool. Everything you need to manage your documents and media instantly.',
        url: 'https://converthub-flax.vercel.app/',
        tags: 'Next.js, AI, Tools'
    },
    {
        name: 'IMovie',
        description: 'A modern movie and series streaming platform with Full HD playback, Indonesian subtitles, and an ad-free experience.',
        url: 'https://imovie.web.id/',
        tags: 'Next.js, Streaming, Tailwind'
    },
    {
        name: 'IMusic',
        description: 'A premium music streaming platform and Android app featuring 24-Bit Hi-Fi Lossless audio, Dolby Atmos, and synced real-time lyrics.',
        url: 'https://imusic.web.id/',
        tags: 'Astro, Android, Streaming'
    }
];

function buildJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': `${BASE_URL}/#person`,
                name: 'Ilham Saputra',
                alternateName: ['Ilham', 'ilhamsptr1'],
                url: BASE_URL,
                jobTitle: 'Frontend Developer',
                description: 'Ilham Saputra is a Frontend Developer and Informatics student at Universitas Gunadarma specializing in modern web development, React, Next.js, and smooth interactive interfaces.',
                knowsAbout: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP', 'UI/UX Design', 'Web Development'],
                sameAs: [
                    'https://github.com/ilhamsptr1',
                    'https://www.instagram.com/ilhammsptra_/',
                    'https://www.tiktok.com/@ninetofive925'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': `${BASE_URL}/#website`,
                url: BASE_URL,
                name: 'Ilham Saputra — Creative Frontend Developer Portfolio',
                description: 'Interactive 3D developer portfolio by Ilham Saputra. Handcrafted web experiences with smooth animations and clean code.',
                publisher: {
                    '@id': `${BASE_URL}/#person`
                }
            },
            {
                '@type': 'ItemList',
                '@id': `${BASE_URL}/#projectslist`,
                name: 'Portfolio Projects by Ilham Saputra',
                description: 'Selected web development projects showcasing React, Next.js, and frontend engineering.',
                numberOfItems: ILHAM_PROJECTS.length,
                itemListElement: ILHAM_PROJECTS.map((proj, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: {
                        '@type': 'CreativeWork',
                        name: proj.name,
                        description: proj.description,
                        url: proj.url,
                        creator: { '@id': `${BASE_URL}/#person` },
                        keywords: proj.tags
                    }
                }))
            }
        ]
    };
}

export function generateSeoHtml() {
    return {
        name: 'generate-seo-html',
        transformIndexHtml(html) {
            const siteTitle = 'Ilham Saputra — Creative Frontend Developer | Interactive 3D Portfolio';
            const siteDescription = 'Interactive 3D developer portfolio by Ilham Saputra. Informatics student at Universitas Gunadarma specializing in React, Next.js, and smooth animations.';

            let seoHtml = `<div id="seo-content" class="sr-only-seo">\n`;
            seoHtml += `  <header>\n`;
            seoHtml += `    <h1>${siteTitle}</h1>\n`;
            seoHtml += `    <p>${siteDescription}</p>\n`;
            seoHtml += `  </header>\n`;
            seoHtml += `  <section id="about">\n`;
            seoHtml += `    <h2>About Ilham Saputra</h2>\n`;
            seoHtml += `    <p>Saya Ilham Saputra, mahasiswa Informatika Universitas Gunadarma yang fokus pada modern web development dan UI. Saya senang membangun website dengan tampilan yang modern, clean, dan nyaman digunakan menggunakan React, Next.js, TypeScript, dan teknologi frontend modern.</p>\n`;
            seoHtml += `    <a href="https://github.com/ilhamsptr1">GitHub</a>\n`;
            seoHtml += `    <a href="mailto:ilham0909saputraaa@gmail.com">Email</a>\n`;
            seoHtml += `  </section>\n`;
            seoHtml += `  <section id="projects">\n`;
            seoHtml += `    <h2>Projects</h2>\n`;
            seoHtml += `    <ul>\n`;
            ILHAM_PROJECTS.forEach(p => {
                seoHtml += `      <li>\n`;
                seoHtml += `        <h3>${p.name}</h3>\n`;
                seoHtml += `        <p>${p.description}</p>\n`;
                seoHtml += `        <a href="${p.url}">Visit ${p.name}</a>\n`;
                seoHtml += `      </li>\n`;
            });
            seoHtml += `    </ul>\n`;
            seoHtml += `  </section>\n`;
            seoHtml += `</div>\n`;

            const jsonLd = buildJsonLd();
            const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n`;

            let transformedHtml = html
                .replace(/<title>.*?<\/title>/, `<title>${siteTitle}</title>`)
                .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/, `<meta name="description" content="${siteDescription}" />`)
                .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${siteTitle}" />`)
                .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${siteDescription}" />`)
                .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${siteTitle}" />`)
                .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${siteDescription}" />`)
                .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${BASE_URL}/" />`)
                .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${BASE_URL}/" />`);

            transformedHtml = transformedHtml.replace('</head>', `${jsonLdScript}</head>`);

            if (transformedHtml.includes('id="seo-content"')) {
                transformedHtml = transformedHtml.replace(/<div id="seo-content" class="sr-only-seo">[\s\S]*?<\/div>/, seoHtml);
            } else {
                transformedHtml = transformedHtml.replace('</body>', `${seoHtml}</body>`);
            }

            return transformedHtml;
        },

        generateBundle() {
            const llms = `# Ilham Saputra — Portfolio\n\nFrontend Developer & Web Developer\nInformatics student at Universitas Gunadarma\n\nProjects:\n${ILHAM_PROJECTS.map(p => `- ${p.name}: ${p.description} (${p.url})`).join('\n')}\n\nContact:\nEmail: ilham0909saputraaa@gmail.com\nGitHub: https://github.com/ilhamsptr1\n`;
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: llms
            });
        }
    };
}
