import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";

export default function ParticlesHero() {
  const [theme, setTheme] = useState("light");

  // Detect current theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    // Observe theme changes
    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(updatedTheme);
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[2]">
      <Particles
        id="tsparticles-hero"
        init={particlesInit}
        options={{
          fullScreen: { enable: true }, // Ensures particles cover the hero section
          background: { color: "transparent" }, // Keeps background unchanged
          particles: {
            number: { value: 50 },
            color: { value: theme === "dark" ? "#FFD700" : "#000000" }, // Gold for dark mode, Black for light mode
            links: {
              enable: true,
              distance: 120,
              color: theme === "dark" ? "#FFD700" : "#000000", // Match particle color
              opacity: 0.6,
              width: 1.5,
            },
            move: {
              enable: true,
              speed: 1.75,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" }, // Wrap-around effect
            },
            shape: { type: "circle" },
            size: { value: 2 },
            opacity: { value: 0.8 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
        } as ISourceOptions}
      />
    </div>
  );
}
