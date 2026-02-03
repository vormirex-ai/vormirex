// type Props = {
//   courseId?: string;
// };

// export default function ModalCareer({ courseId }: Props) {
//   return (
//     <div>
//       {/* Title */}
//       <h1
//         style={{
//           color: 'var(--color-teal)',
//           fontSize: '28px',
//           fontWeight: 700,
//           textAlign: 'center',
//           marginBottom: '8px',
//         }}
//       >
//         Career Opportunities in AI & Machine Learning
//       </h1>

//       {/* Subtitle */}
//       <p
//         style={{
//           color: '#cccccc',
//           textAlign: 'center',
//           maxWidth: '520px',
//           margin: '0 auto 24px',
//         }}
//       >
//         AI-ML opens doors to some of the most in-demand and high-paying tech
//         careers worldwide.
//       </p>

//       {/* Career Cards */}
//       <div
//         style={{
//           display: 'grid',
//           gap: '16px',
//         }}
//       >
//         <div
//           style={{
//             background: 'var(--card-bg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: '12px',
//             padding: '16px',
//           }}
//         >
//           <h3>🤖 Machine Learning Engineer</h3>
//           <p>
//             Build, train, and deploy machine learning models used in real-world
//             products.
//           </p>
//         </div>

//         <div
//           style={{
//             background: 'var(--card-bg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: '12px',
//             padding: '16px',
//           }}
//         >
//           <h3>📊 Data Scientist</h3>
//           <p>
//             Analyze large datasets to uncover insights, trends, and business
//             intelligence.
//           </p>
//         </div>

//         <div
//           style={{
//             background: 'var(--card-bg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: '12px',
//             padding: '16px',
//           }}
//         >
//           <h3>🧠 AI Research Engineer</h3>
//           <p>
//             Work on advanced AI algorithms, deep learning, and next-generation
//             intelligent systems.
//           </p>
//         </div>

//         <div
//           style={{
//             background: 'var(--card-bg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: '12px',
//             padding: '16px',
//           }}
//         >
//           <h3>🗣️ NLP Engineer</h3>
//           <p>
//             Build language-based systems like chatbots, voice assistants, and
//             text analysis tools.
//           </p>
//         </div>

//         <div
//           style={{
//             background: 'var(--card-bg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: '12px',
//             padding: '16px',
//           }}
//         >
//           <h3>👁️ Computer Vision Engineer</h3>
//           <p>
//             Develop systems that interpret images and videos — used in medical
//             imaging, surveillance, and autonomous vehicles.
//           </p>
//         </div>
//       </div>

//       {/* Footer note */}
//       <p
//         style={{
//           marginTop: '24px',
//           color: '#bdbdbd',
//           textAlign: 'center',
//           fontSize: '14px',
//         }}
//       >
//         AI-ML careers are skill-driven, and offer remote
//         as well as on-site opportunities.
//       </p>
//     </div>
//   );
// }

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
