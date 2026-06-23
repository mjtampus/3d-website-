export type LampPose = {
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

export type Chapter = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  copy: string;
  metrics: string[];
  tone: "gold" | "blue" | "violet" | "graphite";
  caption: string;
};

export type Detail = {
  name: string;
  text: string;
};

export const chapters: Chapter[] = [
  {
    id: "arrival",
    label: "Spark",
    kicker: "Chapter 01",
    title: "A first signal in the dark.",
    copy:
      "Every interface begins the same way - a single decision that everything else has to earn its place beside. I start from that decision and design outward, not inward.",
    metrics: ["React / Three.js", "Scroll-driven", "GLB native"],
    tone: "gold",
    caption: "The lamp enters the story with restraint.",
  },
  {
    id: "craft",
    label: "Craft",
    kicker: "Chapter 02",
    title: "Inspect the structure - the build tells you everything.",
    copy:
      "Getting close to something changes the questions you ask. Material, proportion, the way it handles light - these are design decisions, not finishing touches. So is every line of code.",
    metrics: ["Material tuned", "Viewport aware", "Precision render"],
    tone: "blue",
    caption: "The lamp shifts toward inspection.",
  },
  {
    id: "momentum",
    label: "Glow",
    kicker: "Chapter 03",
    title: "The right light changes the room it is in.",
    copy:
      "Great interfaces create atmosphere, not just utility. When something is built right, it shifts the mood of the whole page. You notice the absence before you notice the presence.",
    metrics: ["Ambient glow", "Depth layered", "Full-frame presence"],
    tone: "violet",
    caption: "The lamp becomes the atmosphere around it.",
  },
  {
    id: "signal",
    label: "Home",
    kicker: "Chapter 04",
    title: "It stops moving because it has arrived.",
    copy:
      "Every scroll animation should resolve - a final frame that feels deliberate, not abandoned. I design each motion to end on purpose. The last position is as considered as the first.",
    metrics: ["Final pose", "No loop", "Resolved"],
    tone: "graphite",
    caption: "The lamp ends in a composed final pose.",
  },
];

export const details: Detail[] = [
  {
    name: "Single-object storytelling",
    text:
      "One lamp carries an entire journey. Every project I work on has this quality - a clear through-line that gives the experience coherence from first view to last.",
  },
  {
    name: "Scroll as narrative",
    text:
      "The page doesn't animate for decoration. Motion advances a story, reveals information, and rewards the people who take the time to read it.",
  },
  {
    name: "Endings that land",
    text:
      "This stops. That's intentional. Good interfaces don't loop forever - they resolve to a state that makes sense, and leave you with something complete.",
  },
];

export const lampStops: LampPose[] = [
  {
    zoom: 7.4,
    scale: 0.9,
    rotateX: -0.20,
    rotateY: -0.4,
    rotateZ: 0.03,
    screenX: 24,
    screenY: 0,
    screenScale: 0.84,
    screenRotate: 8,
  },
  {
    zoom: 3.7,
    scale: 0.58,
    rotateX: -0.23,
    rotateY: 0.04,
    rotateZ: 0.01,
    screenX: 14,
    screenY: 4,
    screenScale: 1.1,
    screenRotate: 1,
  },
  {
    zoom: 4.0,
    scale: 0.42,
    rotateX: -0.04,
    rotateY: 0.52,
    rotateZ: -0.01,
    screenX: 20,
    screenY: 4,
    screenScale: 1.30,
    screenRotate: -2,
  },
  {
    zoom: 4.4,
    scale: 0.58,
    rotateX: -0.01,
    rotateY: 0.92,
    rotateZ: 0,
    screenX: 24,
    screenY: 3,
    screenScale: 1.26,
    screenRotate: 0,
  },
  {
    zoom: 3.4,
    scale: 0.50,
    rotateX: -0.01,
    rotateY: 0.92,
    rotateZ: 0,
    screenX: 24,
    screenY: 3,
    screenScale: 1.26,
    screenRotate: 0,
  },
];
