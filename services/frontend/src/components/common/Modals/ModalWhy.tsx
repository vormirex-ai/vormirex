
import { courseModalContent } from './courseModalContent';

type Props = {
  courseId?: string;
};

type CourseKey = keyof typeof courseModalContent;

export default function ModalWhy({ courseId }: Props) {
  const data =
    courseId && courseModalContent[courseId as CourseKey]?.why;

  if (!data) {
    return <p className="modal-empty">Content coming soon.</p>;
  }

  return (
    <div className="modal-wrapper">
      <h1 className="modal-title">{data.title}</h1>
      <p className="modal-subtitle">{data.subtitle}</p>

      <div className="modal-grid">
        {data.points.map((item, index) => (
          <div key={index} className="modal-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <p className="modal-note">{data.note}</p>

    </div>
  );
}

