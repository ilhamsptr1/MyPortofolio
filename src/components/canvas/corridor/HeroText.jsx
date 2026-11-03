import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Local fonts for sketch-style typography (TTF format required by troika)
const RUBIK_SCRIBBLE_URL = '/fonts/RubikScribble-Regular.ttf';
const CABIN_SKETCH_URL = '/fonts/CabinSketch-Regular.ttf';

// Global flag - draw animation only happens ONCE per page load
let hasPlayedDrawAnimation = false;

/**
 * HeroText Component - Hand-drawn Style with Sketch Fonts
 * 
 * Featured:
 * - ILHAM in Rubik Scribble font (splits into letters during scroll)
 * - frontend developer in Cabin Sketch font
 * - Floating micro-animations
 * - Parallax split effect
 * - RESPONSIVE: scales down on mobile
 */
const HeroText = ({ position = [0, 0.3, 0] }) => {
    const groupRef = useRef();
    const letterRefs = useRef([]);
    const taglineRefs = useRef([]);
    const { camera } = useThree();

    // Responsive scale based on screen width - FLUID (no breakpoints)
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const minWidth = 320;
            const maxWidth = 1200;
            const minScale = 0.65;
            const maxScale = 1.0;

            const clampedWidth = Math.max(minWidth, Math.min(maxWidth, width));
            const t = (clampedWidth - minWidth) / (maxWidth - minWidth);
            setScale(minScale + t * (maxScale - minScale));
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Split and dodge state
    const splitAmount = useRef(0);
    const targetSplit = useRef(0);
    const floatY = useRef(0);
    // Pre-allocate Vector3 to avoid per-frame garbage collection
    const worldPosVec = useRef(new THREE.Vector3());

    // Letter positions for ILHAM split effect
    const letters = useMemo(() => [
        { char: 'I', baseX: -1.05, splitDir: -1.8, delay: 0 },
        { char: 'L', baseX: -0.52, splitDir: -1.0, delay: 0 },
        { char: 'H', baseX: 0.00, splitDir: -0.2, delay: 0 },
        { char: 'A', baseX: 0.52, splitDir: 0.8, delay: 0 },
        { char: 'M', baseX: 1.10, splitDir: 1.8, delay: 0 },
    ], []);

    // Tagline words for split effect
    const taglineWords = useMemo(() => [
        { text: '<', baseX: -0.85, splitDir: -1.5, delay: 0 },
        { text: 'frontend', baseX: -0.38, splitDir: -0.8, delay: 0 },
        { text: 'developer', baseX: 0.42, splitDir: 0.8, delay: 0 },
        { text: '/>', baseX: 0.90, splitDir: 1.5, delay: 0 },
    ], []);

    // Animation loop
    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const time = state.clock.elapsedTime;

        // === SPLIT LOGIC based on camera distance ===
        groupRef.current.getWorldPosition(worldPosVec.current);
        const distance = camera.position.z - worldPosVec.current.z;

        const SPLIT_START = 3;
        const SPLIT_PEAK = 0;
        const SPLIT_END = -2;
        const SPLIT_AMOUNT = 0.9;

        if (distance > SPLIT_PEAK && distance < SPLIT_START) {
            const t = (SPLIT_START - distance) / (SPLIT_START - SPLIT_PEAK);
            targetSplit.current = SPLIT_AMOUNT * easeOutQuad(t);
        } else if (distance <= SPLIT_PEAK && distance > SPLIT_END) {
            const t = (distance - SPLIT_END) / (SPLIT_PEAK - SPLIT_END);
            targetSplit.current = SPLIT_AMOUNT * easeOutQuad(t);
        } else {
            targetSplit.current = 0;
        }

        // Smooth interpolation for split
        splitAmount.current += (targetSplit.current - splitAmount.current) * 0.1;

        // === FLOATING MICRO-ANIMATION ===
        floatY.current = Math.sin(time * 1.5) * 0.04;
        groupRef.current.position.y = position[1] + floatY.current;

        // Subtle rotation bobbing
        groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.015;

        // === APPLY SPLIT TO LETTERS ===
        letterRefs.current.forEach((ref, i) => {
            if (!ref) return;
            const letter = letters[i];
            if (!letter) return;

            // Horizontal split
            const splitX = letter.splitDir * splitAmount.current;
            ref.position.x = letter.baseX + splitX;

            // Vertical arc during split (fly outward and slightly up/down)
            const splitY = Math.sin(splitAmount.current * Math.PI) * (i % 2 === 0 ? 0.2 : -0.15);
            ref.position.y = splitY;

            // Rotation during split
            ref.rotation.z = letter.splitDir * splitAmount.current * 0.3;

            // Parallax based on camera X (mouse movement)
            const parallaxX = camera.position.x * 0.05 * (i - 2);
            ref.position.x += parallaxX;
        });

        // === APPLY SPLIT TO TAGLINE WORDS ===
        taglineRefs.current.forEach((ref, i) => {
            if (!ref) return;
            const word = taglineWords[i];
            if (!word) return;

            // Delayed split for tagline
            const delayedSplit = Math.max(0, splitAmount.current - 0.2) * 1.25;
            const splitX = word.splitDir * delayedSplit;
            ref.position.x = word.baseX + splitX;

            // Fade out when splitting
            ref.fillOpacity = Math.max(0, 1 - splitAmount.current * 1.5);
        });
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* ILHAM letters - Rubik Scribble sketch font */}
            {letters.map((letter, i) => (
                <Text
                    key={i}
                    ref={(el) => (letterRefs.current[i] = el)}
                    position={[letter.baseX, 0, 0]}
                    fontSize={0.88}
                    font={RUBIK_SCRIBBLE_URL}
                    color="#ffffff"
                    outlineWidth={0.012}
                    outlineColor="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0}
                >
                    {letter.char}
                </Text>
            ))}

            {/* Tagline words - Cabin Sketch font with fade-in animation */}
            {taglineWords.map((word, i) => (
                <Text
                    key={word.text}
                    ref={(el) => (taglineRefs.current[i] = el)}
                    position={[word.baseX, -0.55, 0.3]}
                    fontSize={0.16}
                    font={CABIN_SKETCH_URL}
                    color="#555555"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.04}
                >
                    {word.text}
                </Text>
            ))}

            {/* Small decorative doodles around title */}
            <SmallStar position={[-1.35, 0.55, 0]} scale={0.07} />
            <SmallStar position={[1.4, 0.45, 0]} scale={0.05} />
            <SmallStar position={[-1.15, -0.6, 0]} scale={0.04} />
            <SmallStar position={[1.25, -0.55, 0]} scale={0.035} />
        </group>
    );
};

// Easing function
const easeOutQuad = (t) => t * (2 - t);

/**
 * Small decorative star - STATIC to avoid useFrame overhead
 * Parent HeroText already handles all animations
 */
const SmallStar = ({ position, scale = 0.1 }) => {
    return (
        <group position={position} scale={scale}>
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
                    <planeGeometry args={[1, 0.12]} />
                    <meshBasicMaterial color="#333" transparent opacity={0.6} side={2} />
                </mesh>
            ))}
        </group>
    );
};

export default HeroText;
