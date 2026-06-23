import { Icon } from "@/components/icon";
import type { Chapter } from "@/lib/journey-content";

type JourneyChapterProps = {
  chapter: Chapter;
  index: number;
  total: number;
};

export function JourneyChapter({ chapter, index, total }: JourneyChapterProps) {
  return (
    <section
      className={`scene scene-${chapter.tone}`}
      id={chapter.id}
      data-scene
      data-reveal
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
          <div className="scene-foot">
          </div>
        </div>
      </div>
    </section>
  );
}
