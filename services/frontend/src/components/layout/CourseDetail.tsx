// src/pages/CourseDetail.jsx

import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeft,
  Send,
  Clock,
  Users,
  Award,
  Target,
  Zap,
  BookOpen,
  Briefcase,
  TrendingUp,
  Brain,
  Lightbulb,
  CheckCircle,
  Star,
  BarChart3,
  Download,
} from 'lucide-react';
import './Courses.css';
import { getCourseById, getAllCourses } from '../../api/courses';
import {
  getCatalogImage,
  getDetailImages,
  getSlug,
  getHeroVideo,
} from '../../utils/courseUtils';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

// --- Type Declaration for Prefetching ---
declare global {
  interface Window {
    __PREFETCHED_COURSES__?: Record<string, any>;
  }
}

// Unique course content data for each course type
const COURSE_CONTENT_DATA = {
  'exam-preparation-kit': {
    title: 'Exam Preparation Kit',
    subtitle: 'Your Pathway to Certification Success',
    description:
      'Unlock your potential with our comprehensive exam preparation resources designed to boost confidence and ensure first-attempt success.',
    stats: [
      { value: '92%', label: 'First-Attempt Pass Rate' },
      { value: '15K+', label: 'Practice Questions' },
      { value: '24/7', label: 'Expert Support' },
      { value: '50+', label: 'Certification Paths' },
    ],
    features: [
      {
        icon: <Target size={24} />,
        title: 'Targeted Study Plans',
        description:
          'Personalized study schedules based on your learning style and exam date',
      },
      {
        icon: <BookOpen size={24} />,
        title: 'Comprehensive Materials',
        description:
          'In-depth study guides, flashcards, and visual learning aids',
      },
      {
        icon: <CheckCircle size={24} />,
        title: 'Real Exam Simulations',
        description:
          'Practice tests that mirror the actual exam environment and format',
      },
      {
        icon: <Users size={24} />,
        title: 'Study Communities',
        description:
          'Connect with fellow exam takers for motivation and support',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Data Analyst',
        content:
          'The exam prep kit was a game-changer. I passed my Data Analytics certification on the first try!',
        rating: 5,
      },
      {
        name: 'Michael Chen',
        role: 'ML Engineer',
        content:
          'The practice questions were incredibly similar to the actual AI/ML exam. Highly recommended!',
        rating: 5,
      },
    ],
    certificationPaths: [
      {
        name: 'Data Analytics',
        certifications: [
          'Google Data Analytics Professional',
          'Microsoft Power BI',
          'Tableau Desktop Specialist',
        ],
        difficulty: 'Intermediate',
        duration: '7 Months',
      },
      {
        name: 'Cybersecurity',
        certifications: ['CompTIA Security+', 'CISSP', 'CEH'],
        difficulty: 'Advanced',
        duration: '7 Months',
      },
      {
        name: 'AI/ML',
        certifications: [
          'TensorFlow Developer',
          'AWS Machine Learning Specialty',
          'Microsoft Azure AI Engineer',
        ],
        difficulty: 'Advanced',
        duration: '7 Months',
      },
      {
        name: 'Data Science',
        certifications: [
          'Data Science Professional',
          'Machine Learning Engineer',
          'Data Analyst',
        ],
        difficulty: 'Advanced',
        duration: '7 Months',
      },
    ],
  },
  'career-transition-programs': {
    title: 'Career Transition Programs',
    subtitle: 'Transform Your Professional Journey',
    description:
      'Navigate your career change with confidence through our structured transition programs designed for professionals seeking new opportunities.',
    stats: [
      { value: '78%', label: 'Career Change Success' },
      { value: '85%', label: 'Salary Increase' },
      { value: '500+', label: 'Hiring Partners' },
      { value: '12', label: 'Week Average Transition' },
    ],
    features: [
      {
        icon: <Briefcase size={24} />,
        title: 'Industry Immersion',
        description:
          'Deep dive into your target industry with real-world projects and case studies',
      },
      {
        icon: <TrendingUp size={24} />,
        title: 'Skill Gap Analysis',
        description:
          'Identify and develop the critical skills needed for your new career path',
      },
      {
        icon: <Users size={24} />,
        title: 'Mentor Network',
        description:
          'Connect with industry professionals who have successfully made similar transitions',
      },
      {
        icon: <Award size={24} />,
        title: 'Interview Preparation',
        description:
          'Master the art of interviewing for roles in your new field with mock sessions',
      },
    ],
    successStories: [
      {
        name: 'Alex Rivera',
        from: 'Marketing Manager',
        to: 'Data Analyst',
        duration: '4 months',
        quote:
          'I never thought I could transition from marketing to data analytics, but this program made it possible.',
      },
      {
        name: 'Jordan Taylor',
        from: 'Teacher',
        to: 'ML Engineer',
        duration: '6 months',
        quote:
          'The structured approach and mentorship helped me completely change my career trajectory into AI/ML.',
      },
    ],
    transitionPaths: [
      {
        from: 'Non-Technical',
        to: 'Data Analytics',
        duration: '4-6 months',
        skills: [
          'Data Visualization',
          'Statistical Analysis',
          'SQL & Database Management',
        ],
        roles: [
          'Data Analyst',
          'Business Intelligence Analyst',
          'Data Consultant',
        ],
      },
      {
        from: 'Corporate',
        to: 'AI/ML Specialist',
        duration: '6-8 months',
        skills: [
          'Machine Learning Fundamentals',
          'Python Programming',
          'Model Deployment',
        ],
        roles: ['ML Engineer', 'AI Specialist', 'Data Scientist'],
      },
      {
        from: 'Individual Contributor',
        to: 'Leadership',
        duration: '6-8 months',
        skills: [
          'Team Management',
          'Strategic Planning',
          'Executive Communication',
        ],
        roles: ['Team Lead', 'Department Head', 'Director'],
      },
    ],
  },
  'ai-powered-learning-paths': {
    title: 'AI-Powered Learning Paths',
    subtitle: 'Personalized Education for Maximum Impact',
    description:
      'Experience the future of learning with our AI-driven platform that adapts to your unique learning style, pace, and goals.',
    stats: [
      { value: '3x', label: 'Faster Learning' },
      { value: '94%', label: 'Retention Rate' },
      { value: '24/7', label: 'AI Assistant' },
      { value: '1000+', label: 'Personalized Paths' },
    ],
    features: [
      {
        icon: <Brain size={24} />,
        title: 'Cognitive Adaptation',
        description:
          'Our AI learns how you learn best and adjusts content delivery accordingly',
      },
      {
        icon: <Lightbulb size={24} />,
        title: 'Intelligent Recommendations',
        description:
          'Get personalized content suggestions based on your goals and progress',
      },
      {
        icon: <BarChart3 size={24} />,
        title: 'Predictive Analytics',
        description:
          'Identify potential knowledge gaps before they become obstacles',
      },
      {
        icon: <Zap size={24} />,
        title: 'Micro-Learning Modules',
        description:
          'Bite-sized content optimized for your attention span and schedule',
      },
    ],
    technologies: [
      {
        name: 'Neural Learning Engine',
        description:
          'Deep learning algorithms that adapt to your cognitive patterns',
      },
      {
        name: 'Knowledge Graph',
        description:
          'Interconnected concepts that build upon each other for deeper understanding',
      },
      {
        name: 'Adaptive Assessment',
        description:
          'Dynamic testing that adjusts difficulty based on your performance',
      },
      {
        name: 'Natural Language Processing',
        description: 'AI-powered explanations that match your learning style',
      },
    ],
    learningModes: [
      {
        name: 'Visual Learner',
        description:
          'Infographics, diagrams, and video content tailored to visual processing',
        icon: '👁️',
      },
      {
        name: 'Auditory Learner',
        description:
          'Audio explanations, podcasts, and verbal reinforcement techniques',
        icon: '🎧',
      },
      {
        name: 'Kinesthetic Learner',
        description:
          'Interactive exercises and hands-on projects for experiential learning',
        icon: '🙌',
      },
      {
        name: 'Reading/Writing Learner',
        description:
          'Comprehensive texts, note-taking tools, and written exercises',
        icon: '📝',
      },
    ],
  },
  // New content for main courses
  'cyber-security': {
    title: 'Cyber Security',
    subtitle: 'Protect Digital Assets and Defend Against Threats',
    description:
      'Master the art of securing systems, networks, and data from digital attacks with our comprehensive cybersecurity curriculum.',
    foundation: [
      'Networking fundamentals: OSI model, TCP/IP, Basic Protocols (HTTP, DNS, DHCP)',
      'Operating systems: Windows & Linux basics, File Permissions, User Management',
      'Security concepts: CIA Triad, Threat Types, Malware Overview',
      'Basic cryptography: Symmetric vs. Asymmetric, Hashing (MD5, SHA-1), Simple Ciphers',
      'Identity & Access: Authentication Methods, Password Policies, Basic IAM Terms',
      'Risk & compliance: Intro to Risk assessment, Awareness of GDPR/ISO 27001 basics',
      'Security tools: Firewalls, Antivirus, Basic VPN Concepts',
      'Network security: Firewalls, IDS/IPS, VPN, Subnetting, Basic packet analysis',
      'OS hardening: User Rights, Patch Management, Windows/Linux Security Configs',
      'Identity & Access: IAM, MFA, RBAC, LDAP/Active Directory Basics',
      'Vulnerability Management: Scanning (Nessus, OpenVAS), CVE Analysis, Patch Prioritisation',
      'Secure Coding: OWASP Top 10, Input Validation, Secure APIs',
      'Incident Response: detection, containment, eradication, recovery workflow',
      'Compliance & Governance: ISO 27001 Fundamentals, GDPR basics, NIST CSF Intro',
      'Certificate',
    ],
    advanced: [
      'Threat modeling & risk analysis: Stride, ATT&CK Framework, Quantitative Risk Metrics',
      'Advanced cryptography: PKI, Elliptic-curve Crypto, Homomorphic Encryption, Secure Protocols (TLS 1.3, IPSec)',
      'Penetration testing & Red-team ops: Reconnaissance, Exploit Development, Privilege Escalation, Post-exploitation, Reporting & Remediation',
      'Security architecture: Zero-trust Design, Micro-Segmentation, Secure SDLC, Hardware Security Modules (HSM)',
      'Cloud & container security: CSPM, IAM Policies, Kubernetes RBAC, Runtime Security Server Security',
      'DevSecOps & Automation: CI/CD pipeline Hardening, IaC Scanning (Terraform, CloudFormation), Automated Compliance (OPA, Chef InSpec)',
      'Incident Response & Forensics: IR Playbooks, Memory & Disk Forensics, Log Correlation with SIEM, Threat Hunting',
      'Governance, Compliance & Audit: ISO 27001, SOC 2, NIST CSF, GDPR/CCPA Deep-dive, Audit Trails & Evidence Handling',
      'Emerging topics: AI/ML security, IoT/OT Security, Blockchain Security, Supply-Chain Risk Management',
      'Project',
      'Certificate',
    ],
  },
  'data-science': {
    title: 'Data Science',
    subtitle: 'Extract Insights and Drive Decisions with Data',
    description:
      'Learn to transform raw data into actionable insights through statistical analysis, machine learning, and data visualization.',
    foundation: [
      'Data Entry, Formatting, Formulas, Pivot Tables, Charts',
      'SQL fundamentals: Select, Where, Group By, Join, Basic Aggregation',
      'Statistics basics: Mean, Median, Mode, Variance, Simple Probability',
      'Data visualization: Power BI/Tableau Dashboards, Basic Storytelling',
      'SQL deep dive – Sub-queries, Window Functions, CTEs, Performance tuning',
      'Python/R– Pandas/dplyr for Data wrangling, Basic Scripting, Automation',
      'Stats & Analytics – Hypothesis Testing, A/B Testing, Regression Basics, Cohort Analysis',
      'Advanced viz– Interactive dashboards (Power BI Custom Visuals, Tableau Story), storytelling',
      'Certificate',
      'Project work– Real-world Datasets, Cleaning pipelines, Simple Predictive Models',
    ],
    advanced: [
      'Machine Learning: Supervised/Unsupervised Algorithms, Model Evaluation, Feature Engineering',
      'Big-data tools: Spark (PySpark/Scala), Hadoop, SQL-on-Hadoop, Large-Scale Data handling',
      'Advanced Stats: Time-series forecasting, Survival Analysis, Bayesian Methods',
      'Data Engineering: ETL Pipelines, Data warehousing (Snowflake, Redshift), Orchestration with Airflow',
      'Specialized viz: Interactive Web Dashboards (Plotly, Dash), Geospatial Mapping, Tableau Extensions',
      'Capstone & Deployment: End-to-End Project, API Integration, Cloud deployment (AWS/GCP), Stakeholder Storytelling',
      'Project',
      'Certificate',
    ],
  },
  'data-analytics': {
    title: 'Data Analytics',
    subtitle: 'Transform Data into Actionable Business Insights',
    description:
      'Master the tools and techniques to analyze data, create visualizations, and drive business decisions through data-driven insights.',
    foundation: [
      'Basics: Data Entry, Formatting, Formulas, Pivot Tables, Charts',
      'SQL fundamentals: Select, Where, Group By, Join, Basic Aggregation',
      'Statistics basics: Mean, Median, Mode, Variance, Simple Probability',
      'Data visualization: Power BI/Tableau Dashboards, Basic Storytelling',
      'SQL deep dive – Sub-queries, Window Functions, CTEs, Performance tuning',
      'Python/R– Pandas/dplyr for Data wrangling, Basic Scripting, Automation',
      'Stats & Analytics – Hypothesis Testing, A/B Testing, Regression Basics, Cohort Analysis',
      'Advanced viz– Interactive dashboards (Power BI Custom Visuals, Tableau Story), storytelling',
      'Certificate',
      'Project work– Real-world Datasets, Cleaning pipelines, Simple Predictive Models',
    ],
    advanced: [
      'Machine Learning: Supervised/Unsupervised Algorithms, Model Evaluation, Feature Engineering',
      'Big-data tools: Spark (PySpark/Scala), Hadoop, SQL-on-Hadoop, Large-Scale Data handling',
      'Advanced Stats: Time-series forecasting, Survival Analysis, Bayesian Methods',
      'Data Engineering: ETL Pipelines, Data warehousing (Snowflake, Redshift), Orchestration with Airflow',
      'Specialized viz: Interactive Web Dashboards (Plotly, Dash), Geospatial Mapping, Tableau Extensions',
      'Capstone & Deployment: End-to-End Project, API Integration, Cloud deployment (AWS/GCP), Stakeholder Storytelling',
      'Project',
      'Certificate',
    ],
  },
  'ai-ml-engineer': {
    title: 'AI & Machine Learning',
    subtitle: 'Build Intelligent Systems with Advanced AI Techniques',
    description:
      'Learn to design, build, and deploy machine learning models and AI systems that can solve complex real-world problems.',
    foundation: [
      'Python Programming: Data structures, Functions, OOP, Libraries (NumPy, Pandas, Matplotlib)',
      'Mathematics for ML: Linear Algebra, Calculus, Probability & Statistics',
      'Machine Learning Fundamentals: Supervised vs. Unsupervised, Regression, Classification',
      'Data Preprocessing: Cleaning, Transformation, Feature Engineering, Dimensionality Reduction',
      'Model Evaluation: Cross-validation, Metrics (Accuracy, Precision, Recall, F1-Score), ROC Curves',
      'Deep Learning Basics: Neural Networks, Activation Functions, Backpropagation, Gradient Descent',
      'Computer Vision: Image Processing, Convolutional Neural Networks, Object Detection',
      'Natural Language Processing: Text Processing, Word Embeddings, Sentiment Analysis',
      'ML Deployment: Model Serialization, REST APIs, Containerization with Docker',
      'Ethics in AI: Bias, Fairness, Transparency, Responsible AI Practices',
      'Certificate',
      'Project: Build a complete ML pipeline from data collection to deployment',
    ],
    advanced: [
      'Advanced Deep Learning: CNNs, RNNs, LSTMs, Transformers, Attention Mechanisms',
      'Reinforcement Learning: Q-Learning, Policy Gradients, Deep Q Networks, Actor-Critic Methods',
      'Generative AI: GANs, VAEs, Diffusion Models, Large Language Models (GPT, BERT)',
      'ML Operations (MLOps): CI/CD for ML, Model Monitoring, A/B Testing, Experiment Tracking',
      'Distributed Training: Data Parallelism, Model Parallelism, Frameworks (TensorFlow Distributed, PyTorch Distributed)',
      'Edge AI: Model Optimization, Quantization, Pruning, Deployment on Edge Devices',
      'AI Product Development: Problem Framing, MVP Development, User Testing, Iteration',
      'Advanced NLP: Transformers, BERT, GPT, Fine-tuning, Transfer Learning, Multimodal Models',
      'AI Research: Reading Papers, Reproducing Results, Contributing to Open Source',
      'Capstone Project: Design and implement an end-to-end AI solution for a real-world problem',
      'Project',
      'Certificate',
    ],
  },
};

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  // Check if current course is one of the new courses without video
  const isSpecialCourse =
    courseId &&
    (courseId === 'exam-preparation-kit' ||
      courseId === 'career-transition-programs' ||
      courseId === 'ai-powered-learning-paths');

  // Check if current course is one of the main courses with curriculum content
  const isMainCourse =
    courseId &&
    (courseId === 'cyber-security' ||
      courseId === 'data-science' ||
      courseId === 'data-analytics' ||
      courseId === 'ai-ml-engineer');

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) {
        setError('Course ID is missing from URL.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Check if this is one of our new courses with static content
        if (COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]) {
          // Create a mock course object with the static content
          const staticCourse = {
            _id: courseId,
            title:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .title,
            subtitle:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .subtitle,
            description:
              COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA]
                .description,
            // Add other required properties
            price: 0,
            status: 'PUBLISHED',
            isHidden: false,
            instructor: 'Vormirex',
            createdAt: new Date().toISOString(),
          };
          setCourse(staticCourse);
        } else {
          // --- KEY CHANGE ---
          // The most reliable way is to fetch all courses and find the one
          // whose slug matches the `courseId` from the URL.
          const allCourses = await getAllCourses();
          const fetchedCourse = allCourses.find((c) => getSlug(c) === courseId);

          if (!fetchedCourse) {
            throw new Error(
              'Course not found. It may have been moved or renamed.'
            );
          }

          setCourse(fetchedCourse);

          // Optional: Cache the fetched course for faster navigation if user goes back and forth
          if (!window.__PREFETCHED_COURSES__) {
            window.__PREFETCHED_COURSES__ = {};
          }
          window.__PREFETCHED_COURSES__[courseId] = fetchedCourse;
        }
      } catch (err: any) {
        console.error('Failed to fetch course details', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]); // Rerun effect if the courseId in the URL changes

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | Vormirex`;
    }
  }, [course]);

  const detailImages = useMemo(() => {
    if (!course) return { career: '', gain: '' };
    return getDetailImages(course);
  }, [course]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Request for ${course?.title}:`, formData);
    alert('Request submitted successfully!');
    setFormData({ name: '', email: '', phone: '' });
  };

  // --- SKELETON LOADER ---
  if (loading) {
    return (
      <div className="course-page">
        <div className="course-shell">
          <div className="skeleton-loader">
            <div className="skeleton-hero"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-subtitle"></div>
              <div className="skeleton-button"></div>
            </div>
            <div className="skeleton-cards">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
            <div className="skeleton-modules">
              <div className="skeleton-module"></div>
              <div className="skeleton-module"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-page">
        <div className="course-shell">
          <div className="course-not-found">
            <h2>Course Not Found</h2>
            <p>
              {error ||
                "The course you're looking for doesn't exist or has been moved."}
            </p>
            <button
              className="course-btn main-cta"
              onClick={() => navigate('/courses')}
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render unique content based on course type
  const renderCourseContent = () => {
    const courseData =
      COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA];

    if (!courseData) {
      // Fallback to original design for other courses
      return (
        <div className="original-course-content">
          {/* Original course content would go here */}
        </div>
      );
    }

    // Render Exam Preparation Kit
    if (courseId === 'exam-preparation-kit') {
      return (
        <div className="unique-course-content exam-prep-content">
          <div className="course-hero-section">
            <div className="hero-text">
              <h1>{courseData.title}</h1>
              <p>{courseData.subtitle}</p>
              <p className="hero-description">{courseData.description}</p>
            </div>
            <div className="hero-visual">
              <div className="exam-icon-container">
                <BookOpen size={80} />
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {courseData.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="features-section">
            <h2>Why Choose Our Exam Prep Kit?</h2>
            <div className="features-grid">
              {courseData.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="certification-paths">
            <h2>Certification Paths</h2>
            <div className="paths-container">
              {courseData.certificationPaths.map((path, index) => (
                <div key={index} className="path-card">
                  <h3>{path.name}</h3>
                  <div className="path-meta">
                    <span className="difficulty">{path.difficulty}</span>
                    <span className="duration">
                      <Clock size={16} /> {path.duration}
                    </span>
                  </div>
                  <div className="certifications">
                    {path.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="cert-badge">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-section">
            <h2>Success Stories</h2>
            <div className="testimonials-grid">
              {courseData.testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"{testimonial.content}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="star-filled" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Render Career Transition Programs
    if (courseId === 'career-transition-programs') {
      return (
        <div className="unique-course-content career-transition-content">
          <div className="course-hero-section">
            <div className="hero-text">
              <h1>{courseData.title}</h1>
              <p>{courseData.subtitle}</p>
              <p className="hero-description">{courseData.description}</p>
            </div>
            <div className="hero-visual">
              <div className="career-icon-container">
                <TrendingUp size={80} />
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {courseData.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="features-section">
            <h2>Our Transition Approach</h2>
            <div className="features-grid">
              {courseData.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="transition-paths">
            <h2>Popular Transition Paths</h2>
            <div className="paths-container">
              {courseData.transitionPaths.map((path, index) => (
                <div key={index} className="transition-path-card">
                  <div className="path-header">
                    <div className="path-from">{path.from}</div>
                    <div className="path-arrow">→</div>
                    <div className="path-to">{path.to}</div>
                  </div>
                  <div className="path-duration">
                    <Clock size={16} /> {path.duration}
                  </div>
                  <div className="path-skills">
                    <h4>Key Skills You'll Develop:</h4>
                    <div className="skills-list">
                      {path.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="skill-tag">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="path-roles">
                    <h4>Potential Roles:</h4>
                    <ul>
                      {path.roles.map((role, roleIndex) => (
                        <li key={roleIndex}>{role}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="success-stories">
            <h2>Success Stories</h2>
            <div className="stories-container">
              {courseData.successStories.map((story, index) => (
                <div key={index} className="story-card">
                  <div className="story-transition">
                    <div className="role-from">{story.from}</div>
                    <div className="transition-arrow">→</div>
                    <div className="role-to">{story.to}</div>
                  </div>
                  <div className="story-duration">
                    Completed in {story.duration}
                  </div>
                  <p className="story-quote">"{story.quote}"</p>
                  <div className="story-author">- {story.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Render AI-Powered Learning Paths
    if (courseId === 'ai-powered-learning-paths') {
      return (
        <div className="unique-course-content ai-learning-content">
          <div className="course-hero-section">
            <div className="hero-text">
              <h1>{courseData.title}</h1>
              <p>{courseData.subtitle}</p>
              <p className="hero-description">{courseData.description}</p>
            </div>
            <div className="hero-visual">
              <div className="ai-icon-container">
                <Brain size={80} />
              </div>
            </div>
          </div>

          <div className="stats-grid">
            {courseData.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="features-section">
            <h2>The AI Learning Advantage</h2>
            <div className="features-grid">
              {courseData.features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-technologies">
            <h2>Powered by Cutting-Edge AI</h2>
            <div className="tech-container">
              {courseData.technologies.map((tech, index) => (
                <div key={index} className="tech-card">
                  <h3>{tech.name}</h3>
                  <p>{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="learning-modes">
            <h2>Adapted to Your Learning Style</h2>
            <div className="modes-container">
              {courseData.learningModes.map((mode, index) => (
                <div
                  key={index}
                  className={`mode-card ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="mode-icon">{mode.icon}</div>
                  <h3>{mode.name}</h3>
                  <p>{mode.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-demo">
            <h2>Experience AI-Powered Learning</h2>
            <div className="demo-container">
              <div className="demo-interface">
                <div className="demo-header">
                  <div className="demo-tabs">
                    <div
                      className={`demo-tab ${activeTab === 0 ? 'active' : ''}`}
                      onClick={() => setActiveTab(0)}
                    >
                      Dashboard
                    </div>
                    <div
                      className={`demo-tab ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => setActiveTab(1)}
                    >
                      Learning Path
                    </div>
                    <div
                      className={`demo-tab ${activeTab === 2 ? 'active' : ''}`}
                      onClick={() => setActiveTab(2)}
                    >
                      Progress
                    </div>
                  </div>
                </div>
                <div className="demo-content">
                  {activeTab === 0 && (
                    <div className="demo-dashboard">
                      <div className="dashboard-welcome">
                        <h3>Welcome back, Learner!</h3>
                        <p>
                          Your AI assistant has prepared today's personalized
                          learning materials based on your progress.
                        </p>
                      </div>
                      <div className="dashboard-stats">
                        <div className="dashboard-stat">
                          <div className="stat-label">Current Streak</div>
                          <div className="stat-value">12 days</div>
                        </div>
                        <div className="dashboard-stat">
                          <div className="stat-label">Mastery Level</div>
                          <div className="stat-value">Intermediate</div>
                        </div>
                        <div className="dashboard-stat">
                          <div className="stat-label">Next Milestone</div>
                          <div className="stat-value">85% complete</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div className="demo-path">
                      <h3>Your Personalized Learning Path</h3>
                      <div className="path-nodes">
                        <div className="path-node completed">
                          <div className="node-icon">
                            <CheckCircle size={24} />
                          </div>
                          <div className="node-title">Foundation Concepts</div>
                        </div>
                        <div className="path-node current">
                          <div className="node-icon">
                            <Zap size={24} />
                          </div>
                          <div className="node-title">Advanced Techniques</div>
                        </div>
                        <div className="path-node">
                          <div className="node-icon">
                            <Target size={24} />
                          </div>
                          <div className="node-title">
                            Real-world Applications
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="demo-progress">
                      <h3>Your Learning Progress</h3>
                      <div className="progress-chart">
                        <div className="progress-item">
                          <div className="progress-label">
                            Concept Understanding
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: '75%' }}
                            ></div>
                          </div>
                          <div className="progress-value">75%</div>
                        </div>
                        <div className="progress-item">
                          <div className="progress-label">
                            Practical Application
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: '60%' }}
                            ></div>
                          </div>
                          <div className="progress-value">60%</div>
                        </div>
                        <div className="progress-item">
                          <div className="progress-label">
                            Knowledge Retention
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: '85%' }}
                            ></div>
                          </div>
                          <div className="progress-value">85%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render main courses with curriculum content
    if (isMainCourse) {
      return (
        <div className="main-course-content">
          <div className="curriculum-header">
            <h1 className="curriculum-title">FOUNDATION Curriculum</h1>
            <button className="download-syllabus-btn">
              <Download size={18} style={{ marginRight: '8px' }} />
              DOWNLOAD FULL SYLLABUS (PDF)
            </button>
          </div>

          <div className="curriculum-cards">
            <div className="curriculum-card">
              <h2 className="card-title">Why AI - Powered Learning Paths</h2>
              <div className="card-content">
                <h3>WHY AI / ML ENGINEER?</h3>
                <p>{courseData.subtitle}</p>
                <h3>SHAPE THE FUTURE</h3>
                <p>{courseData.description}</p>
              </div>
            </div>

            <div className="curriculum-card">
              <h2 className="card-title">Career Path</h2>
              <div className="card-content">
                <div className="career-path-diagram">
                  <div className="path-node foundation">Foundation</div>
                  <div className="path-arrow">→</div>
                  <div className="path-node advanced">Advanced</div>
                  <div className="path-arrow">→</div>
                  <div className="path-node expert">Expert</div>
                </div>
              </div>
            </div>

            <div className="curriculum-card">
              <h2 className="card-title">What You'll Gain</h2>
              <div className="card-content">
                <ul className="gain-list">
                  <li>Industry-recognized skills</li>
                  <li>Hands-on project experience</li>
                  <li>Professional portfolio</li>
                  <li>Certification preparation</li>
                  <li>Career support and guidance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="curriculum-sections">
            <div className="curriculum-section">
              <h2 className="section-title">Foundation</h2>
              <div className="section-content">
                <ul className="curriculum-list">
                  {courseData.foundation.map((item, index) => (
                    <li key={index} className="curriculum-item">
                      <span className="item-bullet">●</span>
                      <span className="item-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="curriculum-section">
              <h2 className="section-title">Advanced</h2>
              <div className="section-content">
                <ul className="curriculum-list">
                  {courseData.advanced.map((item, index) => (
                    <li key={index} className="curriculum-item">
                      <span className="item-bullet">●</span>
                      <span className="item-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`course-page course-type-${courseId}`}
      data-course={courseId}
    >
      <div className="course-shell">
        {/* Conditional hero section - with video for original courses, without for new ones */}
        {isSpecialCourse ? (
          <header className="course-hero-simple">
            <div className="course-hero-top">
              <div className="hero-nav-group">
                <button
                  className="nav-icon-btn"
                  onClick={() => navigate('/courses')}
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  className="nav-icon-btn"
                  onClick={() => navigate('/dashboard')}
                >
                  <LayoutDashboard size={24} />
                </button>
              </div>
            </div>
          </header>
        ) : (
          <header className="course-hero">
            <video className="hero-video-bg" autoPlay muted loop playsInline>
              <source src={getHeroVideo(course)} type="video/mp4" />
            </video>
            <div className="course-hero-overlay" />
            <div className="hero-content">
              <h1 className="hero-title">
                Unlock Your Potential with <br />
                <span className="highlight">{course.title}</span>
              </h1>
              <p className="hero-subtitle">
                {course.subtitle || 'Master the skills of tomorrow, today.'}
              </p>
            </div>

            <div className="course-hero-top">
              <div className="hero-nav-group">
                <button
                  className="nav-icon-btn"
                  onClick={() => navigate('/courses')}
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  className="nav-icon-btn"
                  onClick={() => navigate('/dashboard')}
                >
                  <LayoutDashboard size={24} />
                </button>
              </div>
            </div>
          </header>
        )}

        {renderCourseContent()}

        <section className="course-request-form">
          <div className="form-container">
            <div className="form-text">
              <h2>Request More Information</h2>
              <p>
                Interested in <strong>{course.title}</strong>? Submit your
                request for more details.
              </p>
            </div>
            <form onSubmit={handleFormSubmit} className="details-form">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <button type="submit" className="form-submit-btn">
                <Send size={18} style={{ marginRight: '8px' }} />
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
