// type Props = {
//   courseId?: string;
// };

// export default function ModalWhy({ courseId }: Props) {
//   return (
//     <div className="modal-wrapper">
//       <h1 className="modal-title">
//         Why Choose AI & Machine Learning?
//       </h1>

//       <p className="modal-subtitle">
//         Understand why AI-ML is shaping the future of technology.
//       </p>

//       <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
//         <div className="modal-card">
//           <h3>🏢 For Businesses</h3>
//           <p>
//             Automates operations, reduces costs, and boosts efficiency using
//             intelligent systems.
//           </p>
//         </div>

//         <div className="modal-card">
//           <h3>📈 Career Growth</h3>
//           <p>
//             One of the fastest-growing tech careers with excellent salaries.
//           </p>
//         </div>

//         <div className="modal-card">
//           <h3>🌍 Industry-Wide Usage</h3>
//           <p>
//             Used in healthcare, finance, e-commerce, cybersecurity, robotics,
//             gaming, and smart cities.
//           </p>
//         </div>

//         <div className="modal-card">
//           <h3>🌐 Global Demand</h3>
//           <p>
//             Opportunities worldwide — startups, MNCs, or remote roles.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
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

