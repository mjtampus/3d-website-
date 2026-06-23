"use client";

import { useEffect, useState } from "react";
import { GlbStage } from "../components/glb-stage";
import { JourneyChapter } from "@/components/journey-chapter";
import { JourneyEpilogue } from "@/components/journey-epilogue";
import { JourneyIntro } from "@/components/journey-intro";
import { chapters, details, lampStops, type LampPose } from "@/lib/journey-content";

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolatePose(t: number): LampPose {
  const clamped = Math.max(0, Math.min(lampStops.length - 1, t));
  const lower = Math.floor(clamped);
  const upper = Math.min(lampStops.length - 1, lower + 1);
  const local = clamped - lower;
  const from = lampStops[lower];
  const to = lampStops[upper];

  return {
    zoom: mix(from.zoom, to.zoom, local),
    scale: mix(from.scale, to.scale, local),
    rotateX: mix(from.rotateX, to.rotateX, local),
    rotateY: mix(from.rotateY, to.rotateY, local),
    rotateZ: mix(from.rotateZ, to.rotateZ, local),
    screenX: mix(from.screenX, to.screenX, local),
    screenY: mix(from.screenY, to.screenY, local),
    screenScale: mix(from.screenScale, to.screenScale, local),
    screenRotate: mix(from.screenRotate, to.screenRotate, local),
  };
}

export default function Page() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [lampTravel, setLampTravel] = useState(0);
  // When set, the lamp is "parked" at this document Y (absolute) so it scrolls
  // away with the last chapter instead of floating over the epilogue.
  const [lampAnchor, setLampAnchor] = useState<number | null>(null);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

    if (!scenes.length) return;

    let frame = 0;
    let lastActive = -1;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;

      // Continuous scroll position across the storyline, expressed as
      // `sceneIndex + intra-scene progress`. This drives the lamp pose so it
      // interpolates smoothly between stops instead of snapping per chapter.
      let travel = 0;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        // How far we have scrolled through this scene's pinned track.
        const scrollLength = Math.max(1, rect.height - viewportHeight);
        const local = Math.min(1, Math.max(0, -rect.top / scrollLength));
        const depth = Math.max(
          -1,
          Math.min(1, (viewportHeight * 0.45 - rect.top) / viewportHeight),
        );

        scene.style.setProperty("--progress", local.toFixed(4));
        scene.style.setProperty("--depth", depth.toFixed(4));

        // Once a scene has reached the top it is the one being scrolled
        // through (or already passed); the last such scene wins.
        if (rect.top <= 0) {
          travel = index + local;
        }
      });

      // Each scene scrolls the lamp from stop `index` toward `index + 1`, so
      // travel can reach `scenes.length` — clamp to the available pose stops.
      travel = Math.min(lampStops.length - 1, Math.max(0, travel));

      // Park the lamp at the bottom of the last chapter. Once the final scene
      // has finished scrolling, hand off from `fixed` to `absolute` so the lamp
      // stays anchored to that section and scrolls out of view with it, rather
      // than carrying over into the epilogue.
      const lastScene = scenes[scenes.length - 1];
      const lastRect = lastScene.getBoundingClientRect();
      const sceneBottomDoc = lastRect.bottom + window.scrollY;
      const parkY = sceneBottomDoc - viewportHeight;
      setLampAnchor(window.scrollY >= parkY ? parkY : null);

      const activeIndex = Math.min(scenes.length - 1, Math.floor(travel));
      if (activeIndex !== lastActive) {
        lastActive = activeIndex;
        setActiveChapter(activeIndex);
      }

      setLampTravel(travel);
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Reveal sections with a staggered entrance the first time they scroll
  // into view. Honors prefers-reduced-motion by revealing everything up front.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const lampPose = interpolatePose(lampTravel);

  return (
    <main className="journey-shell">
      <div className="lamp-ambient" aria-hidden="true" />

      <header className="journey-topbar">
        <a className="brand-lockup" href="#arrival">
          <span>Michael Tampus</span>
          <small>Frontend Developer &amp; Designer</small>
        </a>

        <nav className="chapter-rail" aria-label="Chapter navigation">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className={index === activeChapter ? "chapter-dot active" : "chapter-dot"}
            >
              <span>{chapter.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <div
        className="lamp-rig"
        aria-hidden="true"
        style={
          lampAnchor !== null
            ? {
                position: "absolute",
                top: `${lampAnchor}px`,
                bottom: "auto",
                height: "100vh",
              }
            : undefined
        }
      >
        <GlbStage src="/models/gal-b-lantern-4120.glb" pose={lampPose} />
      </div>

      <JourneyIntro />

      <div className="storyline">
        {chapters.map((chapter, index) => (
          <JourneyChapter
            key={chapter.id}
            chapter={chapter}
            index={index}
            total={chapters.length}
          />
        ))}
      </div>

      <JourneyEpilogue details={details} />
    </main>
  );
}
