import { useState, useEffect } from 'react';

/**
 * useTypewriter
 * Reveals `lines` array one character at a time.
 *
 * @param {string[]} lines      - Text lines to type out
 * @param {number}   charSpeed  - ms per character
 * @param {number}   lineDelay  - ms pause between lines
 * @param {number}   startDelay - ms before typing begins (let avatar land first)
 * @returns {{ displayed: string[], done: boolean }}
 */
export default function useTypewriter(lines, charSpeed = 42, lineDelay = 480, startDelay = 1200) {
  const [lineIdx, setLineIdx]     = useState(-1);
  const [charIdx, setCharIdx]     = useState(0);
  const [displayed, setDisplayed] = useState([]);
  const [done, setDone]           = useState(false);

  // Reset and start after avatar walks in when lines change
  useEffect(() => {
    setLineIdx(-1);
    setCharIdx(0);
    setDisplayed([]);
    setDone(false);
    const t = setTimeout(() => setLineIdx(0), startDelay);
    return () => clearTimeout(t);
  }, [lines, startDelay]);

  useEffect(() => {
    if (lineIdx < 0 || lineIdx >= lines.length) return;

    // Initialise new line slot
    if (charIdx === 0) {
      setDisplayed(prev => {
        const next = [...prev];
        next[lineIdx] = '';
        return next;
      });
    }

    const currentLine = lines[lineIdx];

    if (charIdx < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(c => c + 1);
      }, charSpeed);
      return () => clearTimeout(t);
    } else {
      if (lineIdx < lines.length - 1) {
        const t = setTimeout(() => {
          setLineIdx(l => l + 1);
          setCharIdx(0);
        }, lineDelay);
        return () => clearTimeout(t);
      } else {
        setDone(true);
      }
    }
  }, [lineIdx, charIdx, lines, charSpeed, lineDelay]);

  return { displayed, done };
}
