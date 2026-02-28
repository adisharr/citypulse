import { useState, useEffect, useCallback } from "react";

// Simulate live data updates
export function useLiveData(initialData, updateFn, interval = 5000) {
  const [data, setData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setData(prev => updateFn(prev));
      setLastUpdated(new Date());
    }, interval);
    return () => clearInterval(id);
  }, [updateFn, interval]);

  return { data, lastUpdated };
}

// Animate number counting up
export function useCountUp(target, duration = 1200, delay = 0) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCurrent(Math.floor(eased * numericTarget));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return current;
}

// Pulse every N seconds
export function usePulse(interval = 3000) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);
  return pulse;
}

// Format time
export function useCurrentTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
