

import { courseModalContent } from './courseModalContent';

type Props = {
  courseId?: string;
};

type CourseKey = keyof typeof courseModalContent;

export default function ModalCareer({ courseId }: Props) {
  const data =
    courseId && courseModalContent[courseId as CourseKey]?.career;

  if (!data) {
    return <p className="modal-empty">Content coming soon.</p>;
  }

  return (
    <div className="modal-wrapper">
      <h1 className="modal-title">{data.title}</h1>
      <p className="modal-subtitle">{data.subtitle}</p>

      <div className="modal-grid">
        {data.roles.map((role, index) => (
          <div key={index} className="modal-box modal-card">
            <h3>{role.title}</h3>
            <p>{role.text}</p>
          </div>
        ))}
      </div>

      <p className="modal-note">{data.note}</p>
    </div>
  );
}
