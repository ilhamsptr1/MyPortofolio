import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation without 404s.
 */

const ROOM_META = {
    null: {
        path: '/',
        title: 'Ilham Saputra — Creative Frontend Developer | Interactive 3D Portfolio',
        description: 'Interactive 3D developer portfolio by Ilham Saputra. Explore React & Next.js projects, WebGL experiments & GSAP animations in a hand-drawn gallery.',
    },
    about: {
        path: '/about',
        title: 'About Me — Ilham Saputra Portfolio',
        description: 'Learn about Ilham Saputra — a frontend developer and Informatics student at Universitas Gunadarma specializing in React, Next.js, and clean UI.',
    },
    gallery: {
        path: '/gallery',
        title: 'Gallery & Projects — Ilham Saputra Portfolio',
        description: 'Browse the interactive 3D gallery of 10+ live web development projects by Ilham Saputra. Each project is displayed as a hand-drawn card with real live preview.',
    },
    studio: {
        path: '/studio',
        title: 'The Studio & Skills — Ilham Saputra Portfolio',
        description: 'Explore Ilham Saputra\'s tech stack and tools displayed on interactive monitors in an immersive 3D space.',
    },
    contact: {
        path: '/contact',
        title: 'Contact — Ilham Saputra Portfolio',
        description: 'Get in touch with Ilham Saputra. Find social media links, email, and send a message through the interactive 3D message room.',
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 * Call this once at app startup to determine if we need to auto-teleport.
 */
export function getInitialRoomFromUrl() {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { 
        currentRoom, 
        teleportTo, 
        hasEntered, 
        requestExit, 
        activeProject, 
        closeProjectViewer 
    } = useScene();

    const isHandlingPopState = useRef(false);
    const activeProjectRef = useRef(activeProject);
    activeProjectRef.current = activeProject;
    const currentRoomRef = useRef(currentRoom);
    currentRoomRef.current = currentRoom;

    // 0. Ensure base '/' state exists in history on initial load so browser back always returns home
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const initial = getInitialRoomFromUrl();
        if (initial) {
            window.history.replaceState({ room: null }, '', '/');
            window.history.pushState({ room: initial }, '', window.location.pathname);
        } else {
            window.history.replaceState({ room: null }, '', '/');
        }
    }, []);

    // 1. Update Document Meta & URL when currentRoom changes
    useEffect(() => {
        if (isHandlingPopState.current) {
            isHandlingPopState.current = false;
            return;
        }

        const meta = ROOM_META[currentRoom] || ROOM_META[null];

        // Update Title
        document.title = meta.title;

        // Update Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = meta.description;

        // Update Browser URL via History API
        const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
        if (currentPath !== meta.path && !activeProjectRef.current) {
            window.history.pushState({ room: currentRoom }, '', meta.path);
        }
    }, [currentRoom]);

    // 2. Manage History when activeProject changes
    useEffect(() => {
        if (isHandlingPopState.current) return;

        if (activeProject) {
            const meta = ROOM_META[currentRoomRef.current] || ROOM_META['gallery'];
            document.title = `${activeProject.title} — Ilham Saputra Portfolio`;
            window.history.pushState(
                { room: currentRoomRef.current || 'gallery', project: activeProject.title },
                '',
                `${meta.path}?project=${encodeURIComponent(activeProject.title.toLowerCase().replace(/\s+/g, '-'))}`
            );
        } else {
            const meta = ROOM_META[currentRoomRef.current] || ROOM_META[null];
            document.title = meta.title;
            // Clean up query param if present
            if (window.location.search.includes('project=')) {
                window.history.replaceState({ room: currentRoomRef.current }, '', meta.path);
            }
        }
    }, [activeProject]);

    // 3. Handle browser back/forward buttons (popstate event)
    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;

            // If project viewer was open, browser back simply closes it and stays in gallery
            if (activeProjectRef.current) {
                closeProjectViewer();
                return;
            }

            // Determine target room
            const targetRoom = event.state?.room !== undefined
                ? event.state.room
                : getInitialRoomFromUrl();

            if (hasEntered) {
                if (targetRoom === null && currentRoomRef.current !== null) {
                    // Smoothly exit back to corridor / beranda
                    requestExit();
                } else if (targetRoom && targetRoom !== currentRoomRef.current) {
                    // Teleport to the requested room
                    teleportTo(targetRoom);
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered, requestExit, closeProjectViewer]);
}
