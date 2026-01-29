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
} from 'lucide-react';
import './Courses.css';
import { getAllCourses } from '../../api/courses';
import {
  getCatalogImage,
  getDetailImages,
  getHeroVideo,
  getSlug,
} from '../../utils/courseUtils';

import SyllabusPDF from '../../assets/CoursesPdf (2).pdf';

// --- Type Declaration for Prefetching ---
declare global {
  interface Window {
    __PREFETCHED_COURSES__?: Record<string, any>;
  }
}

// Unique course content data for the three special courses
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
        role: 'Cloud Architect',
        content:
          'The exam prep kit was a game-changer. I passed my AWS certification on the first try!',
        rating: 5,
      },
      {
        name: 'Michael Chen',
        role: 'Security Analyst',
        content:
          'The practice questions were incredibly similar to the actual exam. Highly recommended!',
        rating: 5,
      },
    ],
    certificationPaths: [
      {
        name: 'Cloud Computing',
        certifications: [
          'AWS Certified Solutions Architect',
          'Azure Fundamentals',
          'Google Cloud Professional',
        ],
        difficulty: 'Intermediate',
        duration: '6-8 weeks',
      },
      {
        name: 'Cybersecurity',
        certifications: ['CompTIA Security+', 'CISSP', 'CEH'],
        difficulty: 'Advanced',
        duration: '10-12 weeks',
      },
      {
        name: 'Project Management',
        certifications: ['PMP', 'PRINCE2', 'Agile Scrum Master'],
        difficulty: 'Intermediate',
        duration: '8-10 weeks',
      },
      {
        name: 'Data Science',
        certifications: [
          'TensorFlow Developer',
          'AWS Machine Learning Specialty',
          'Microsoft Azure AI Engineer',
        ],
        difficulty: 'Advanced',
        duration: '12-16 weeks',
      },
    ],
  },
  'career-transition-programs': {
    title: 'Career Transition Programs',
    subtitle: 'Transform Your Career Journey',
    description:
      'Navigate your career transition with confidence through our structured programs designed for professionals seeking new paths.',
    stats: [
      { value: '85%', label: 'Successful Transitions' },
      { value: '30+', label: 'Career Paths' },
      { value: '1000+', label: 'Mentors Available' },
      { value: '6 months', label: 'Average Transition Time' },
    ],
    features: [
      {
        icon: <TrendingUp size={24} />,
        title: 'Personalized Roadmaps',
        description:
          'Customized career transition plans based on your background and goals',
      },
      {
        icon: <Briefcase size={24} />,
        title: 'Industry Insights',
        description:
          'Deep understanding of target industries and required skill sets',
      },
      {
        icon: <Users size={24} />,
        title: 'Mentor Network',
        description:
          'Connect with industry professionals who have made similar transitions',
      },
      {
        icon: <Award size={24} />,
        title: 'Skill Development',
        description:
          'Focused training to bridge gaps between your current and desired role',
      },
    ],
    successStories: [
      {
        name: 'Alex Rivera',
        from: 'Marketing Manager',
        to: 'UX Designer',
        duration: '4 months',
        quote:
          'I never thought I could transition from marketing to design, but this program made it possible.',
      },
      {
        name: 'Jordan Taylor',
        from: 'Teacher',
        to: 'Data Analyst',
        duration: '6 months',
        quote:
          'The structured approach and mentorship helped me completely change my career trajectory.',
      },
    ],
    transitionPaths: [
      {
        from: 'Non-Technical',
        to: 'Tech Industry',
        duration: '4-6 months',
        skills: [
          'Programming Fundamentals',
          'System Design',
          'Technical Communication',
        ],
        roles: ['Junior Developer', 'QA Engineer', 'Technical Support'],
      },
      {
        from: 'Corporate',
        to: 'Startup Environment',
        duration: '2-3 months',
        skills: [
          'Agile Methodologies',
          'Cross-functional Collaboration',
          'Resource Management',
        ],
        roles: ['Product Manager', 'Operations Lead', 'Growth Hacker'],
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
};

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState<'FOUNDATION' | 'ADVANCED'>('FOUNDATION');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if current course is one of the new courses without video
  const isSpecialCourse =
    courseId &&
    (courseId === 'exam-preparation-kit' ||
      courseId === 'career-transition-programs' ||
      courseId === 'ai-powered-learning-paths');

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
            // Add levels for compatibility
            levels: [
              {
                level: 'FOUNDATION',
                modules: [
                  {
                    title: 'Getting Started',
                    items: ['Introduction', 'Overview', 'Prerequisites'],
                  },
                ],
              },
            ],
          };
          setCourse(staticCourse);
        } else {
          // --- Fetch original courses ---
          const allCourses = await getAllCourses();
          const fetchedCourse = allCourses.find((c) => getSlug(c) === courseId);

          if (!fetchedCourse) {
            throw new Error(
              'Course not found. It may have been moved or renamed.'
            );
          }

          setCourse(fetchedCourse);

          // Optional: Cache the fetched course for faster navigation
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
  }, [courseId]);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | Vormirex`;
    }
  }, [course]);

  const heroMedia = useMemo(() => {
    if (!course || isSpecialCourse) return { type: 'video' as const, src: '' };
    return { type: 'video' as const, src: getHeroVideo(course) };
  }, [course, isSpecialCourse]);

  const detailImages = useMemo(() => {
    if (!course) return { career: '', gain: '' };
    return getDetailImages(course);
  }, [course]);

  const levelBlock = useMemo(() => {
    if (!course || !course.levels) return null;
    return (
      course.levels.find((l: any) => l.level === level) ?? course.levels[0]
    );
  }, [course, level]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Request for ${course?.title}:`, formData);
    alert('Request submitted successfully!');
    setFormData({ name: '', email: '', phone: '' });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroMedia.src || isSpecialCourse) return;

    video.muted = true;
    video.playsInline = true;
    const play = () =>
      video.play().catch(() => console.log('Autoplay blocked'));

    if (video.readyState >= 3) {
      play();
    } else {
      video.addEventListener('canplay', play, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', play);
    };
  }, [heroMedia, isSpecialCourse]);

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
    const courseData: any =
      COURSE_CONTENT_DATA[courseId as keyof typeof COURSE_CONTENT_DATA];

    // Render special content for the three new courses
    if (courseData) {
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
              {courseData.stats.map((stat: any, index: number) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="features-section">
              <h2>Why Choose Our Exam Prep Kit?</h2>
              <div className="features-grid">
                {courseData.features.map((feature: any, index: number) => (
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
                {courseData.certificationPaths.map((path: any, index: number) => (
                  <div key={index} className="path-card">
                    <h3>{path.name}</h3>
                    <div className="path-meta">
                      <span className="difficulty">{path.difficulty}</span>
                      <span className="duration">
                        <Clock size={16} /> {path.duration}
                      </span>
                    </div>
                    <div className="certifications">
                      {path.certifications.map((cert: any, certIndex: number) => (
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
                {courseData.testimonials.map((testimonial: any, index: number) => (
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
              {courseData.stats.map((stat: any, index: number) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="features-section">
              <h2>Our Transition Approach</h2>
              <div className="features-grid">
                {courseData.features.map((feature: any, index: number) => (
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
                {courseData.transitionPaths.map((path: any, index: number) => (
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
                        {path.skills.map((skill: any, skillIndex: number) => (
                          <div key={skillIndex} className="skill-tag">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="path-roles">
                      <h4>Potential Roles:</h4>
                      <ul>
                        {path.roles.map((role: any, roleIndex: number) => (
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
                {courseData.successStories.map((story: any, index: number) => (
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
              {courseData.stats.map((stat: any, index: number) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="features-section">
              <h2>The AI Learning Advantage</h2>
              <div className="features-grid">
                {courseData.features.map((feature: any, index: number) => (
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
                {courseData.technologies.map((tech: any, index: number) => (
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
                {courseData.learningModes.map((mode: any, index: number) => (
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
                            <div className="node-title">
                              Foundation Concepts
                            </div>
                          </div>
                          <div className="path-node current">
                            <div className="node-icon">
                              <Zap size={24} />
                            </div>
                            <div className="node-title">
                              Advanced Techniques
                            </div>
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
    }

    // Return original course content for cybersecurity, data science, data analytics, and AI/ML
    return (
      <>


        <div className="course-level-tabs below-hero">
          <button
            className={`tab ${level === 'FOUNDATION' ? 'active' : ''}`}
            onClick={() => setLevel('FOUNDATION')}
          >
            Foundation
          </button>
          <button
            className={`tab ${level === 'ADVANCED' ? 'active' : ''}`}
            onClick={() => setLevel('ADVANCED')}
          >
            Advanced
          </button>
        </div>

        <div className="hero-action-area">
          <button
            className="course-btn main-cta"
            onClick={() => window.open(SyllabusPDF, '_blank')}
          >
            Download Full Syllabus (PDF)
          </button>
        </div>

        <section className="course-info-cards">
          <div
            className="info-card"
            onClick={() => setModalImage(getCatalogImage(course))}
          >
            <div className="info-card-image-wrapper">
              <img src={getCatalogImage(course)} alt="Why" />
            </div>
            <p className="info-card-title">Why {course.title}</p>
          </div>

          <div
            className="info-card"
            onClick={() => setModalImage(detailImages.career)}
          >
            <div className="info-card-image-wrapper">
              <img src={detailImages.career} alt="Career" />
            </div>
            <p className="info-card-title">Career Path</p>
          </div>

          <div
            className="info-card"
            onClick={() => setModalImage(detailImages.gain)}
          >
            <div className="info-card-image-wrapper">
              <img src={detailImages.gain} alt="Gain" />
            </div>
            <p className="info-card-title">What You'll Gain</p>
          </div>
        </section>

        <section className="course-content">
          <h2 className="section-title">{level} Curriculum</h2>
          <div className="modules">
            {levelBlock &&
            levelBlock.modules &&
            levelBlock.modules.length > 0 ? (
              levelBlock.modules.map((m: any, idx: number) => (
                <details key={idx} className="module" open={idx === 0}>
                  <summary className="module-summary">
                    <span className="module-title">{m.title}</span>
                    <span className="module-meta">
                      {m.items?.length || 0} topics
                    </span>
                  </summary>
                  <ul className="module-list">
                    {m.items?.map((it: string, i: number) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </details>
              ))
            ) : (
              <p>No modules found for this level.</p>
            )}
          </div>
        </section>

        {modalImage && (
          <div className="image-modal" onClick={() => setModalImage(null)}>
            <div className="modal-content">
              <img src={modalImage} alt="Preview" />
              <button className="modal-close">×</button>
            </div>
          </div>
        )}
      </>
    );
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
            <video
              ref={videoRef}
              key={heroMedia.src}
              className="hero-video-bg"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={heroMedia.src} type="video/mp4" />
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
              <div className="course-level-tabs desktop-tabs">
                <button
                  className={`tab ${level === 'FOUNDATION' ? 'active' : ''}`}
                  onClick={() => setLevel('FOUNDATION')}
                >
                  Foundation
                </button>
                <button
                  className={`tab ${level === 'ADVANCED' ? 'active' : ''}`}
                  onClick={() => setLevel('ADVANCED')}
                >
                  Advanced
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
