import React, { useEffect, useState, useRef } from 'react';
import { useScene } from '../../context/SceneContext';
import '../../styles/ProjectViewerModal.scss';

// Domains known to send X-Frame-Options: SAMEORIGIN
const BLOCKED_IFRAME_PATTERNS = [
    'imovie.web.id',
    'converthub-flax.vercel.app'
];

export default function ProjectViewerModal() {
    const { activeProject, closeProjectViewer } = useScene();
    const [iframeFailed, setIframeFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    const isDirectlyBlocked = activeProject?.url 
        ? BLOCKED_IFRAME_PATTERNS.some(domain => activeProject.url.includes(domain))
        : false;

    // Reset loading state when activeProject changes
    useEffect(() => {
        if (activeProject) {
            setIsLoading(true);
            setIframeFailed(false);
        }
    }, [activeProject]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && activeProject) {
                closeProjectViewer();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeProject, closeProjectViewer]);

    if (!activeProject) return null;

    const projectIndex = (activeProject.textureIndex ?? 0) + 1;
    const screenshotUrl = `/textures/gallery/projects/project_${projectIndex}_painted.webp`;

    const handleOpenExternal = () => {
        const targetUrl = new URL(activeProject.url);
        targetUrl.searchParams.set('from', 'ilhammsptr');
        window.open(targetUrl.toString(), '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="project-viewer-overlay" role="dialog" aria-modal="true" aria-label={`Preview ${activeProject.title}`}>
            {/* Top Navigation Bar with paper aesthetic */}
            <header className="project-viewer-header">
                <div className="header-left">
                    <button 
                        className="btn-back-portfolio"
                        onClick={closeProjectViewer}
                        aria-label="Kembali ke Portofolio Ilham Saputra"
                        title="Kembali ke Portofolio"
                    >
                        <svg viewBox="0 0 24 24" className="icon-arrow" aria-hidden="true">
                            <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="btn-text">Kembali ke Portofolio</span>
                    </button>
                </div>

                <div className="header-center">
                    <div className="project-badge-pill">
                        <span className="live-dot" aria-hidden="true"></span>
                        <h2 className="project-title">{activeProject.title}</h2>
                        {activeProject.category && (
                            <span className="project-category">{activeProject.category.split('•')[0]}</span>
                        )}
                    </div>
                </div>

                <div className="header-right">
                    <button 
                        className="btn-external"
                        onClick={handleOpenExternal}
                        title="Buka situs di tab baru"
                    >
                        <span>Buka di Tab Baru</span>
                        <svg viewBox="0 0 24 24" className="icon-external" aria-hidden="true">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button 
                        className="btn-close"
                        onClick={closeProjectViewer}
                        aria-label="Tutup Pratinjau"
                    >
                        ✕
                    </button>
                </div>
            </header>

            {/* Main Preview Container */}
            <main className="project-viewer-content">
                {isDirectlyBlocked || iframeFailed ? (
                    /* Fallback Card for Sites that block iframes or failed to load */
                    <div className="blocked-showcase-container">
                        <div className="showcase-card">
                            <div className="showcase-preview-frame">
                                <img 
                                    src={screenshotUrl} 
                                    alt={`Screenshot preview of ${activeProject.title}`}
                                    className="showcase-img"
                                />
                                <div className="preview-watermark">
                                    <span>Tangkapan Layar Langsung</span>
                                </div>
                            </div>

                            <div className="showcase-info">
                                <div className="live-status-pill">
                                    <span className="pulse-dot"></span>
                                    <span>Live Production App</span>
                                </div>

                                <h3 className="showcase-title">{activeProject.title}</h3>
                                <p className="showcase-desc">{activeProject.description}</p>
                                
                                {activeProject.technologies && (
                                    <div className="tech-stack-row">
                                        <span className="tech-label">Teknologi:</span>
                                        <span className="tech-value">{activeProject.technologies}</span>
                                    </div>
                                )}

                                <div className="showcase-actions">
                                    <button 
                                        className="btn-primary-launch"
                                        onClick={handleOpenExternal}
                                    >
                                        <span>Kunjungi Website ({new URL(activeProject.url).hostname})</span>
                                        <svg viewBox="0 0 24 24" className="icon-launch" aria-hidden="true">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <button 
                                        className="btn-secondary-back"
                                        onClick={closeProjectViewer}
                                    >
                                        <span>← Kembali Menjelajah Galeri 3D</span>
                                    </button>
                                </div>

                                <p className="security-notice">
                                    ℹ️ Website streaming & tools ini membutuhkan tampilan layar penuh untuk pengalaman terbaik. Tab portofolio Anda tetap aman di sini sehingga Anda bisa kembali kapan saja.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Live Embedded Interactive Iframe */
                    <div className="iframe-wrapper">
                        {isLoading && (
                            <div className="iframe-loader">
                                <div className="loader-spinner"></div>
                                <p>Memuat website interaktif...</p>
                            </div>
                        )}
                        <iframe
                            ref={iframeRef}
                            src={activeProject.url}
                            title={`Interactive preview of ${activeProject.title}`}
                            className={`project-iframe ${isLoading ? 'hidden' : 'visible'}`}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIframeFailed(true)}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                            loading="lazy"
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
