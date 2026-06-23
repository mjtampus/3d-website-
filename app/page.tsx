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
    title: "A first signal in the dark.",
    copy: "Every interface begins the same way — a single decision that everything else has to earn its place beside. I start from that decision and design outward, not inward.",
    metrics: ["React / Three.js", "Scroll-driven", "GLB native"],
    tone: "gold",
    caption: "The lamp enters the story with restraint.",
  },
  {
    id: "craft",
    label: "Craft",
    kicker: "Chapter 02",
    title: "Inspect the structure — the build tells you everything.",
    copy: "Getting close to something changes the questions you ask. Material, proportion, the way it handles light — these are design decisions, not finishing touches. So is every line of code.",
    metrics: ["Material tuned", "Viewport aware", "Precision render"],
    tone: "blue",
    caption: "The lamp shifts toward inspection.",
  },
  {
    id: "momentum",
    label: "Glow",
    kicker: "Chapter 03",
    title: "The right light changes the room it is in.",
    copy: "Great interfaces create atmosphere, not just utility. When something is built right, it shifts the mood of the whole page. You notice the absence before you notice the presence.",
    metrics: ["Ambient glow", "Depth layered", "Full-frame presence"],
    tone: "violet",
    caption: "The lamp becomes the atmosphere around it.",
  },
  {
    id: "signal",
    label: "Home",
    kicker: "Chapter 04",
    title: "It stops moving because it has arrived.",
    copy: "Every scroll animation should resolve — a final frame that feels deliberate, not abandoned. I design each motion to end on purpose. The last position is as considered as the first.",
    metrics: ["Final pose", "No loop", "Resolved"],
    tone: "graphite",
    caption: "The lamp ends in a composed final pose.",
  },
] as const;

const details = [
  {
    name: "Single-object storytelling",
    text: "One lamp carries an entire journey. Every project I work on has this quality — a clear through-line that gives the experience coherence from first view to last.",
  },
  {
    name: "Scroll as narrative",
    text: "The page doesn't animate for decoration. Motion advances a story, reveals information, and rewards the people who take the time to read it.",
  },
  {
    name: "Endings that land",
    text: "This stops. That's intentional. Good interfaces don't loop forever — they resolve to a state that makes sense, and leave you with something complete.",
  },
];

const lampStops: LampPose[] = [
  {
    zoom: 7.4,
    scale: 0.9,
    rotateX: -0.1,
    rotateY: -0.4,
    rotateZ: 0.03,
    screenX: 20,
    screenY: 0,
    screenScale: 0.86,
    screenRotate: 8,
  },
  {
    zoom: 6.6,
    scale: 1.0,
    rotateX: -0.07,
    rotateY: 0.04,
    rotateZ: 0.01,
    screenX: 14,
    screenY: -1,
    screenScale: 0.96,
    screenRotate: 1,
  },
  {
    zoom: 5.6,
    scale: 1.08,
    rotateX: -0.04,
    rotateY: 0.52,
    rotateZ: -0.01,
    screenX: 10,
    screenY: 2,
    screenScale: 1.06,
    screenRotate: -2,
  },
  {
    zoom: 5.0,
    scale: 1.15,
    rotateX: -0.01,
    rotateY: 0.92,
    rotateZ: 0,
    screenX: 17,
    screenY: 0,
    screenScale: 1.12,
    screenRotate: 0,
  },
];

function SceneIcon({ path, stroke = true }: { path: string; stroke?: boolean }) {
  return stroke ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="scene-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="scene-icon" fill="currentColor">
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

      <div className="lamp-rig" aria-hidden="true">
        <GlbStage src="/models/gal-b-lantern-4120.glb" pose={lampPose} />
      </div>

      <section className="intro-frame">
        <p className="intro-eyebrow">Portfolio — Scrollytelling</p>
        <h1>Work that resolves.</h1>
        <p className="intro-copy">
          One 3D object. Four chapters. One scroll. This is how I approach every project —
          with a single clear decision followed all the way through to a deliberate end.
        </p>
        <a className="intro-cta" href="#arrival">Begin the journey</a>
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
                    <SceneIcon path="M5 12h14M12 5l7 7-7 7" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="scene-note">
                    <span>Scroll</span>
                    <strong>
                      {index + 1} of {chapters.length}
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
            <p className="scene-kicker epilogue-kicker">Epilogue</p>
            <h2>A portfolio that is also the proof.</h2>
          </div>

          <div className="epilogue-details">
            {details.map((item) => (
              <article key={item.name} className="detail-card">
                <SceneIcon path="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 4v10l10 5 10-5V4l-10 5Z" stroke={false} />
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
