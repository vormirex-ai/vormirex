// type Props = {
//   courseId?: string;
// };

// export default function ModalGain({ courseId }: Props) {
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
//         What You’ll Gain from AI & Machine Learning
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
//         Practical skills, real-world problem solving, and a future-ready career
//         foundation.
//       </p>

//       {/* Gain Cards */}
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
//           <h3>🧠 Strong AI-ML Fundamentals</h3>
//           <p>
//             Understand how intelligent systems think, learn, and make decisions
//             using data.
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
//           <h3>🛠️ Practical, Hands-on Skills</h3>
//           <p>
//             Work with real-world use cases like recommendations, fraud detection,
//             and intelligent automation.
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
//           <h3>🚀 Ability to Build Intelligent Systems</h3>
//           <p>
//             Design and develop systems that analyze data, recognize patterns, and
//             make predictions.
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
//           <h3>🌍 Future-Ready, Global Skills</h3>
//           <p>
//             Gain skills that are in demand across industries and countries,
//             enabling long-term career stability.
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
//           <h3>💡 Confidence to Solve Real-World Problems</h3>
//           <p>
//             Apply AI-ML techniques to practical challenges in healthcare,
//             finance, e-commerce, and more.
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
//         This course focuses on skills, problem-solving, and real-world impact —
//         not just theory.
//       </p>
//     </div>
//   );
// }

import { courseModalContent } from './courseModalContent';

type Props = {
  courseId?: string;
};

type CourseKey = keyof typeof courseModalContent;

export default function ModalGain({ courseId }: Props) {
  const data =
    courseId && courseModalContent[courseId as CourseKey]?.gain;

  if (!data) {
    return <p className="modal-empty">Content coming soon.</p>;
  }

  return (
    <div className="modal-wrapper">
      <h1 className="modal-title">{data.title}</h1>
      <p className="modal-subtitle">{data.subtitle}</p>


      <div className="modal-grid">
        {data.points.map((point, index) => (
          <div key={index} className="modal-box modal-card">
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
      <p className="modal-note">{data.note}</p>

    </div>
  );
}
