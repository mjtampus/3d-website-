"use client";

import { useEffect, useState } from "react";
import { GlbStage } from "../components/glb-stage";

type LampPose = {
  zoom: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  screenX: number;
  screenY: number;
  screenScale: number;
  screenRotate: number;
};

const chapters = [
  {
    id: "arrival",
    label: "Spark",
    kicker: "Chapter 01",
    title: "A lamp appears at a distance.",
    copy:
      "The object enters the story like a quiet signal in a dark room. It is small at first, suspended and remote, so the eye has time to settle before the motion begins.",
    metrics: ["First light", "Slow reveal", "Measured entry"],
    tone: "gold",
    caption: "The lamp is introduced with restraint.",
  },
  {
    id: "craft",
    label: "Craft",
    kicker: "Chapter 02",
    title: "Its form travels closer and turns to show the build.",
    copy:
      "As the scroll advances, the lamp glides across the composition and rotates just enough to reveal structure, material, and proportion. The motion is deliberate, not decorative.",
    metrics: ["Closer view", "Gentle rotation", "Material focus"],
    tone: "blue",
    caption: "The lamp shifts toward inspection.",
  },
  {
    id: "momentum",
    label: "Glow",
    kicker: "Chapter 03",
    title: "The lamp becomes the atmosphere around it.",
    copy:
      "The story widens here. The lamp fills more of the frame and the viewer starts reading it as presence, not just object. The glow feels continuous with the motion of the page.",
    metrics: ["Ambient glow", "Deeper zoom", "Continuous flow"],
    tone: "violet",
    caption: "The lamp turns into a source of mood.",
  },
  {
    id: "signal",
    label: "Home",
    kicker: "Chapter 04",
    title: "The lamp settles into its final frame.",
    copy:
      "The last chapter resolves the movement. The lamp arrives fully, turns once more, and rests without looping forever. What remains is a stable image and a finished story.",
    metrics: ["Final reveal", "Motion resolved", "Calm ending"],
    tone: "graphite",
    caption: "The lamp ends in a composed final pose.",
  },
] as const;

const details = [
  {
    name: "Single object narrative",
    text: "One lamp carries the whole experience, so every chapter feels like part of the same journey.",
  },
  {
    name: "Scroll choreography",
    text: "The lamp moves forward with the page instead of spinning on a fixed loop.",
  },
  {
    name: "Resolved ending",
    text: "The final frame lands in a stable pose, which makes the motion feel intentional and complete.",
  },
];

const lampStops: LampPose[] = [
  {
    zoom: 7.8,
    scale: 0.92,
    rotateX: -0.14,
    rotateY: -0.5,
    rotateZ: 0.04,
    screenX: -16,
    screenY: 4,
    screenScale: 0.92,
    screenRotate: -10,
  },
  {
    zoom: 6.9,
    scale: 1,
    rotateX: -0.1,
    rotateY: 0.02,
    rotateZ: 0.02,
    screenX: -4,
    screenY: -1,
    screenScale: 1,
    screenRotate: -3,
  },
  {
    zoom: 5.9,
    scale: 1.08,
    rotateX: -0.06,
    rotateY: 0.56,
    rotateZ: -0.01,
    screenX: 10,
    screenY: -5,
    screenScale: 1.06,
    screenRotate: 4,
  },
  {
    zoom: 5.15,
    scale: 1.14,
    rotateX: -0.03,
    rotateY: 0.98,
    rotateZ: 0,
    screenX: 2,
    screenY: 2,
    screenScale: 1.14,
    screenRotate: 0,
  },
];

function SceneIcon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="scene-icon">
      <path d={path} />
    </svg>
  );
}

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

  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );

    if (!scenes.length) return;

    let frame = 0;
    let lastActive = -1;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      let travel = 0;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        const total = Math.max(1, rect.height - viewportHeight);
        const progress = 1 - Math.min(1, Math.max(0, rect.top / total));
        const depth = Math.max(
          -1,
          Math.min(1, (viewportHeight * 0.45 - rect.top) / viewportHeight),
        );

        scene.style.setProperty("--progress", progress.toFixed(4));
        scene.style.setProperty("--depth", depth.toFixed(4));

        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
          travel = index + progress;
        }
      });

      if (closestIndex !== lastActive) {
        lastActive = closestIndex;
        setActiveChapter(closestIndex);
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

  const lampPose = interpolatePose(lampTravel);

  return (
    <main className="journey-shell">
      <div className="journey-orb journey-orb-a" aria-hidden="true" />
      <div className="journey-orb journey-orb-b" aria-hidden="true" />
      <div className="journey-grain" aria-hidden="true" />

      <header className="journey-topbar">
        <a className="brand-lockup" href="#arrival">
          <span>Michael Tampus</span>
          <small>Scrollytelling portfolio</small>
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

      <div className="lamp-rig" aria-hidden="true">
        <GlbStage src="/models/gal-b-lantern-4120.glb" pose={lampPose} />
      </div>

      <section className="intro-frame">
        <p className="intro-eyebrow">A lamp story in four chapters</p>
        <h1>One GLB lamp, told through light, distance, and scroll.</h1>
        <p className="intro-copy">
          The same GLB travels through the page as a single cinematic object.
          It zooms in, rotates with the scroll, and lands in a final stable pose instead of looping forever.
        </p>
      </section>

      <div className="storyline">
        {chapters.map((chapter, index) => (
          <section
            className={`scene scene-${chapter.tone}`}
            id={chapter.id}
            key={chapter.id}
            data-scene
          >
            <div className="scene-sticky">
              <div className="scene-backdrop" aria-hidden="true">
                <span className="backdrop-ring backdrop-ring-a" />
                <span className="backdrop-ring backdrop-ring-b" />
                <span className="backdrop-grid" />
              </div>

              <div className="scene-copy">
                <p className="scene-kicker">{chapter.kicker}</p>
                <h2>{chapter.title}</h2>
                <p className="scene-text">{chapter.copy}</p>

                <div className="scene-metrics" aria-label={`${chapter.label} highlights`}>
                  {chapter.metrics.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="scene-side">
                <div className="scene-side-card">
                  <span>Passing lamp</span>
                  <strong>{chapter.caption}</strong>
                </div>
                <div className="scene-foot">
                  <div className="chapter-index">
                    <SceneIcon path="M4 12h16M12 4l8 8-8 8" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="scene-note">
                    <span>Scroll</span>
                    <strong>
                      Section {index + 1} of {chapters.length}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="epilogue">
        <div className="epilogue-card">
          <div>
            <p className="scene-kicker">Epilogue</p>
            <h2>The lamp moves as one object, and the page ends without a loop.</h2>
          </div>

          <div className="epilogue-details">
            {details.map((item) => (
              <article key={item.name} className="detail-card">
                <SceneIcon path="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 4v10l10 5 10-5V4l-10 5Z" />
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="epilogue-actions">
            <a className="primary-link" href="mailto:hello@example.com">
              Start a project
            </a>
            <a className="secondary-link" href="#arrival">
              Replay journey
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
