import { Icon } from "@/components/icon";
import type { Detail } from "@/lib/journey-content";

type JourneyEpilogueProps = {
  details: Detail[];
};

export function JourneyEpilogue({ details }: JourneyEpilogueProps) {
  return (
    <section className="epilogue" data-epilogue data-reveal>
      <div className="epilogue-card">
        <div>
          <p className="scene-kicker epilogue-kicker">Epilogue</p>
          <h2>A portfolio that is also the proof.</h2>
        </div>

        <div className="epilogue-details">
          {details.map((item) => (
            <article key={item.name} className="detail-card">
              <Icon
                path="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 4v10l10 5 10-5V4l-10 5Z"
                className="scene-icon"
                viewBox="0 0 24 24"
              />
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
  );
}
