import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation.
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
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);

    // Update title, meta, and URL whenever currentRoom changes
    useEffect(() => {
        // Don't push a new history entry if this change was triggered by the user clicking back/forward
        if (isHandlingPopState.current) {
            isHandlingPopState.current = false;
            return;
        }

        const meta = ROOM_META[currentRoom] || ROOM_META[null];

        // 1. Update Document Title
        document.title = meta.title;

        // 2. Update Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = meta.description;

        // 3. Update Browser URL via History API
        // Only push if the current URL is actually different (prevents duplicate entries)
        const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
        if (currentPath !== meta.path) {
            window.history.pushState({ room: currentRoom }, '', meta.path);
        }
    }, [currentRoom]);

    // Handle browser back/forward buttons (popstate event)
    useEffect(() => {
        const handlePopState = (event) => {
            // Determine which room to navigate to
            const targetRoom = event.state?.room !== undefined
                ? event.state.room
                : getInitialRoomFromUrl();

            // Set the flag so we don't push another state entry during this transition
            isHandlingPopState.current = true;

            // Only teleport if we have already entered the 3D world
            if (hasEntered) {
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
