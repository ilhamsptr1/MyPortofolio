"use client";

import { useEffect, useState } from "react";
import MatrixRain from "./MatrixRain";

// The secret word sequence
const SECRET_CODE = ["i", "l", "h", "a", "m"];

export default function KonamiCode() {
  const [hacked, setHacked] = useState(false);
  
  useEffect(() => {
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (hacked) return; // Prevent re-triggering while hacked

      const key = e.key.toLowerCase();
      inputSequence.push(key);

      // Keep sequence array the same length as our secret code
      if (inputSequence.length > SECRET_CODE.length) {
        inputSequence.shift();
      }

      // Check if sequence matches
      if (inputSequence.join("") === SECRET_CODE.join("")) {
        activateHack();
      }
    };

    const activateHack = () => {
      setHacked(true);
      
      // Play a creepy/hacker sound if we wanted to...
      try {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
        audio.volume = 0.2;
        audio.play().catch(() => {}); // catch autoplay restrictions
      } catch (e) {}

      // Add invert class to body for glitchy look
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
      document.body.style.transition = "filter 0.5s ease-in-out";

      // Revert hack after 10 seconds
      setTimeout(() => {
        setHacked(false);
        document.body.style.filter = "none";
      }, 10000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hacked]);

  return (
    <>
      {hacked && <MatrixRain />}
    </>
  );
}
