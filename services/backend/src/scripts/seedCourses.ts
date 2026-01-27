
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import CourseModel, { CourseLevel, CourseStatus } from '../modules/courses/course.model.js';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '../../env/backend/.env') });

const INSTRUCTOR_ID = '69575880579da67736bf688c'; // Ashish Singh

const courses = [
  /* -------------------------------------------------------------------------- */
  /* DATA SCIENCE */
  /* -------------------------------------------------------------------------- */
  {
    title: 'Data Science',
    subtitle: 'Foundation → Advanced',
    description:
      'From strong mathematical foundations to advanced ML, deep learning, MLOps, and production-grade AI systems.',
    price: 49999, // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER, // Default top-level
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['data-science', 'python', 'machine-learning'],
    levels: [
      {
        level: CourseLevel.FOUNDATION,
        duration: '4 months',
        highlights: ['Certificate'],
        modules: [
          {
            title: 'Mathematics Basics',
            items: [
              'Linear algebra (vectors, matrices, eigen-values)',
              'Probability & statistics (distributions, hypothesis testing, confidence intervals)',
              'Calculus fundamentals (derivatives, gradients)',
            ],
          },
          {
            title: 'Programming Foundations',
            items: [
              'Python core (variables, loops, functions, OOP)',
              'NumPy, Pandas, Matplotlib, Seaborn',
              'Jupyter notebooks',
              'Version control – Git basics',
            ],
          },
          {
            title: 'Data Handling',
            items: [
              'Data collection: CSV, Excel, SQL, APIs, web scraping',
              'Cleaning: missing values, outliers, data type conversion',
              'Transforming: merging, reshaping, feature scaling',
            ],
          },
          {
            title: 'Exploratory Data Analysis (EDA)',
            items: [
              'Descriptive statistics',
              'Histograms, box plots, scatter plots, heatmaps',
              'Identifying patterns, correlations, anomalies',
            ],
          },
          {
            title: 'Statistical Foundations',
            items: [
              'Descriptive vs inferential statistics',
              'Linear & logistic regression',
              'Hypothesis testing basics',
            ],
          },
          {
            title: 'Intro to Machine Learning',
            items: [
              'Supervised vs unsupervised learning',
              'k-NN, Decision Trees, k-Means',
              'Train/test split',
              'Accuracy, RMSE, confusion matrix',
            ],
          },
          {
            title: 'Data Visualization & Storytelling',
            items: [
              'Principles of effective charts',
              'Matplotlib, Seaborn',
              'Plotly, Bokeh',
              'Communicating insights to non-technical audiences',
            ],
          },
          {
            title: 'Project Workflow',
            items: [
              'CRISP-DM framework',
              'Code & result documentation',
              'End-to-end project: data → cleaning → EDA → model',
            ],
          },
        ],
      },
      {
        level: CourseLevel.ADVANCED,
        duration: '6 months',
        highlights: ['Certificate', 'Capstone Project'],
        modules: [
          {
            title: 'Advanced Mathematics & Statistics',
            items: [
              'Multivariate calculus',
              'Optimization (convex, gradient descent, Newton methods)',
              'Bayesian inference',
              'Probabilistic graphical models',
              'MCMC',
              'Advanced hypothesis testing',
              'A/B testing frameworks',
            ],
          },
          {
            title: 'Advanced Programming & Tooling',
            items: [
              'Advanced Python (decorators, generators, context managers)',
              'Numba, Cython',
              'Dask',
              'PySpark',
              'Git-flow',
              'CI/CD pipelines',
              'Docker & containerization',
            ],
          },
          {
            title: 'Data Engineering',
            items: [
              'ETL / ELT pipelines (Airflow, Prefect, Dagster)',
              'Big-data storage: Hadoop, Hive, Delta Lake',
              'Snowflake, Redshift',
              'Kafka, Kinesis',
              'Spark Structured Streaming',
              'Flink',
            ],
          },
          {
            title: 'Machine Learning – Advanced Algorithms',
            items: [
              'Gradient Boosting',
              'XGBoost',
              'LightGBM',
              'CatBoost',
              'Kernel methods',
              'SVM variants',
              'Gaussian Processes',
              'Autoencoders',
              't-SNE, UMAP',
              'Feature selection techniques',
            ],
          },
          {
            title: 'Deep Learning',
            items: [
              'Neural network theory',
              'Regularization & optimization tricks',
              'CNNs (object detection, segmentation, transfer learning)',
              'RNNs',
              'Transformers',
              'Attention mechanisms',
              'BERT / GPT fine-tuning',
              'GANs',
              'VAEs',
              'Diffusion models',
              'Reinforcement Learning (Q-learning, PPO, policy gradients)',
            ],
          },
          {
            title: 'NLP & Speech',
            items: [
              'Text preprocessing',
              'Word2Vec, GloVe, FastText',
              'Contextual embeddings',
              'NER',
              'Sentiment analysis',
              'Summarization',
              'Question answering',
              'Dialogue systems',
              'Speech recognition (ASR)',
              'Text-to-Speech (TTS)',
            ],
          },
          {
            title: 'Computer Vision & Multimodal Learning',
            items: [
              'Image classification',
              'YOLO',
              'Faster R-CNN',
              'U-Net',
              'Mask R-CNN',
              'Video analysis',
              'Action recognition',
              'CLIP',
              'ALIGN',
            ],
          },
          {
            title: 'Advanced Analytics & Special Topics',
            items: [
              'Time-series forecasting (ARIMA, Prophet, LSTM, TFT)',
              'Anomaly detection',
              'Outlier analysis',
              'Graph Neural Networks',
              'Recommendation systems',
              'Ethical AI',
              'Bias mitigation',
              'Privacy-preserving ML',
              'Federated learning',
            ],
          },
          {
            title: 'MLOps & Production Engineering',
            items: [
              'MLflow',
              'DVC',
              'Experiment tracking',
              'CI/CD for ML',
              'TensorFlow Serving',
              'TorchServe',
              'FastAPI',
              'Kubernetes',
              'Model monitoring',
              'Drift detection',
              'Model governance',
            ],
          },
          {
            title: 'Advanced Tooling & Frameworks',
            items: [
              'PyTorch Lightning',
              'TensorFlow 2.x',
              'JAX / Flax',
              'Horovod',
              'Ray',
              'Spark ML',
              'AutoML (Auto-sklearn, H2O, Optuna)',
            ],
          },
          {
            title: 'Capstone Project',
            items: [
              'Problem definition',
              'Data pipeline design',
              'Feature engineering',
              'Model development',
              'Deployment',
              'Monitoring',
              'Documentation',
              'Final presentation',
            ],
          },
        ],
      },
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* DATA ANALYTICS */
  /* -------------------------------------------------------------------------- */
  {
    title: 'Data Analytics',
    subtitle: 'Foundation → Advanced',
    description:
      'Build strong analytics fundamentals, then move into ML, data engineering, and real-world deployment.',
    price: 39999,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['data-analytics', 'sql', 'power-bi', 'tableau'],
    levels: [
      {
        level: CourseLevel.FOUNDATION,
        duration: '4 months',
        highlights: ['Certificate'],
        modules: [
          {
            title: 'Basics',
            items: [
              'Data Entry',
              'Formatting',
              'Formulas',
              'Pivot Tables',
              'Charts',
            ],
          },
          {
            title: 'SQL Fundamentals',
            items: ['SELECT', 'WHERE', 'GROUP BY', 'JOIN', 'Basic Aggregation'],
          },
          {
            title: 'Statistics Basics',
            items: ['Mean', 'Median', 'Mode', 'Variance', 'Simple Probability'],
          },
          {
            title: 'Data Visualization',
            items: ['Power BI/Tableau Dashboards', 'Basic Storytelling'],
          },
          {
            title: 'SQL Deep Dive',
            items: [
              'Sub-queries',
              'Window Functions',
              'CTEs',
              'Performance tuning',
            ],
          },
          {
            title: 'Python/R',
            items: [
              'Pandas/dplyr for data wrangling',
              'Basic scripting',
              'Automation',
            ],
          },
          {
            title: 'Stats & Analytics',
            items: [
              'Hypothesis Testing',
              'A/B Testing',
              'Regression Basics',
              'Cohort Analysis',
            ],
          },
          {
            title: 'Advanced Visualization',
            items: [
              'Interactive dashboards (Power BI Custom Visuals, Tableau Story)',
              'Storytelling',
            ],
          },
          {
            title: 'Project Work',
            items: [
              'Real-world datasets',
              'Cleaning pipelines',
              'Simple predictive models',
            ],
          },
        ],
      },
      {
        level: CourseLevel.ADVANCED,
        duration: '6 months',
        highlights: ['Project', 'Certificate'],
        modules: [
          {
            title: 'Machine Learning',
            items: [
              'Supervised/Unsupervised algorithms',
              'Model evaluation',
              'Feature engineering',
            ],
          },
          {
            title: 'Big-data Tools',
            items: [
              'Spark (PySpark/Scala)',
              'Hadoop',
              'SQL-on-Hadoop',
              'Large-scale data handling',
            ],
          },
          {
            title: 'Advanced Stats',
            items: [
              'Time-series forecasting',
              'Survival Analysis',
              'Bayesian Methods',
            ],
          },
          {
            title: 'Data Engineering',
            items: [
              'ETL pipelines',
              'Data warehousing (Snowflake, Redshift)',
              'Orchestration with Airflow',
            ],
          },
          {
            title: 'Specialized Visualization',
            items: [
              'Interactive web dashboards (Plotly, Dash)',
              'Geospatial mapping',
              'Tableau extensions',
            ],
          },
          {
            title: 'Capstone & Deployment',
            items: [
              'End-to-end project',
              'API integration',
              'Cloud deployment (AWS/GCP)',
              'Stakeholder storytelling',
            ],
          },
        ],
      },
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* CYBER SECURITY */
  /* -------------------------------------------------------------------------- */
  {
    title: 'Cyber Security',
    subtitle: 'Foundation → Advanced',
    description:
      'Learn security fundamentals, then progress into red teaming, cloud security, forensics, governance, and emerging threats.',
    price: 44999,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['cyber-security', 'network-security', 'ethical-hacking'],
    levels: [
      {
        level: CourseLevel.FOUNDATION,
        duration: '6 months',
        highlights: ['Certificate'],
        modules: [
          {
            title: 'Networking Fundamentals',
            items: ['OSI model', 'TCP/IP', 'Basic protocols (HTTP, DNS, DHCP)'],
          },
          {
            title: 'Operating Systems',
            items: [
              'Windows & Linux basics',
              'File permissions',
              'User management',
            ],
          },
          {
            title: 'Security Concepts',
            items: ['CIA Triad', 'Threat types', 'Malware overview'],
          },
          {
            title: 'Basic Cryptography',
            items: [
              'Symmetric vs. Asymmetric',
              'Hashing (MD5, SHA-1)',
              'Simple ciphers',
            ],
          },
          {
            title: 'Identity & Access',
            items: [
              'Authentication methods',
              'Password policies',
              'Basic IAM terms',
            ],
          },
          {
            title: 'Risk & Compliance',
            items: [
              'Intro to risk assessment',
              'Awareness of GDPR/ISO 27001 basics',
            ],
          },
          {
            title: 'Security Tools',
            items: ['Firewalls', 'Antivirus', 'Basic VPN concepts'],
          },
          {
            title: 'Network Security',
            items: [
              'Firewalls',
              'IDS/IPS',
              'VPN',
              'Subnetting',
              'Basic packet analysis',
            ],
          },
          {
            title: 'OS Hardening',
            items: [
              'User rights',
              'Patch management',
              'Windows/Linux security configs',
            ],
          },
          {
            title: 'IAM (Deeper)',
            items: ['IAM', 'MFA', 'RBAC', 'LDAP/Active Directory basics'],
          },
          {
            title: 'Vulnerability Management',
            items: [
              'Scanning (Nessus, OpenVAS)',
              'CVE analysis',
              'Patch prioritisation',
            ],
          },
          {
            title: 'Secure Coding',
            items: ['OWASP Top 10', 'Input validation', 'Secure APIs'],
          },
          {
            title: 'Incident Response',
            items: [
              'Detection',
              'Containment',
              'Eradication',
              'Recovery workflow',
            ],
          },
          {
            title: 'Compliance & Governance',
            items: ['ISO 27001 fundamentals', 'GDPR basics', 'NIST CSF intro'],
          },
        ],
      },
      {
        level: CourseLevel.ADVANCED,
        duration: '8 months',
        highlights: ['Certificate'],
        modules: [
          {
            title: 'Threat Modeling & Risk Analysis',
            items: [
              'STRIDE',
              'MITRE ATT&CK framework',
              'Quantitative risk metrics',
            ],
          },
          {
            title: 'Advanced Cryptography',
            items: [
              'PKI',
              'Elliptic-curve crypto',
              'Homomorphic encryption',
              'Secure protocols',
            ],
          },
          {
            title: 'Penetration Testing & Red-team Ops',
            items: [
              'Reconnaissance',
              'Exploit development',
              'Privilege escalation',
              'Post-exploitation',
              'Reporting & remediation',
            ],
          },
          {
            title: 'Security Architecture',
            items: [
              'Zero-trust design',
              'Micro-segmentation',
              'Secure SDLC',
              'Hardware Security Modules (HSM)',
            ],
          },
          {
            title: 'Cloud & Container Security',
            items: [
              'CSPM',
              'IAM policies',
              'Kubernetes RBAC',
              'Runtime security',
            ],
          },
          {
            title: 'Server Security',
            items: [
              'Hardening practices',
              'Secure configs',
              'Monitoring & logging basics',
            ],
          },
          {
            title: 'DevSecOps & Automation',
            items: [
              'CI/CD pipeline hardening',
              'IaC scanning (Terraform)',
              'Automated compliance',
            ],
          },
          {
            title: 'Incident Response & Forensics',
            items: [
              'IR playbooks',
              'Memory & disk forensics',
              'Log correlation with SIEM',
              'Threat hunting',
            ],
          },
          {
            title: 'Governance, Compliance & Audit',
            items: [
              'ISO 27001',
              'SOC 2',
              'NIST CSF',
              'GDPR/CCPA deep-dive',
              'Audit trails',
            ],
          },
          {
            title: 'Emerging Topics',
            items: [
              'AI/ML security',
              'IoT/OT security',
              'Blockchain security',
              'Supply-chain risk',
            ],
          },
        ],
      },
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* AI / ML ENGINEER */
  /* -------------------------------------------------------------------------- */
  {
    title: 'AI / ML Engineer',
    subtitle: 'Foundation → Advanced',
    description:
      'Complete roadmap to become a production-ready AI/ML Engineer – from mathematical foundations and core ML to deep learning, LLMs, MLOps, and end-to-end deployment.',
    price: 54999,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['ai', 'machine-learning', 'deep-learning', 'llms', 'mlops'],
    levels: [
      {
        level: CourseLevel.FOUNDATION,
        duration: '2 months',
        highlights: ['Certificate', 'Foundation Project'],
        modules: [
          {
            title: 'Mathematical Foundations',
            items: [
              'Linear Algebra: vectors, matrices, dot product, eigen concepts',
              'Probability basics: events, distributions',
              'Statistics: mean, variance, standard deviation',
              'Calculus basics: derivatives, gradients (intuition only)',
            ],
          },
          {
            title: 'Python for Data Science',
            items: [
              'Python fundamentals (loops, functions, OOP basics)',
              'NumPy (arrays, broadcasting, vectorization)',
              'Pandas (dataframes, indexing, merging)',
              'Jupyter Notebook workflow',
            ],
          },
          {
            title: 'Data Handling & EDA',
            items: [
              'Data cleaning (missing values, duplicates)',
              'Data preprocessing & scaling',
              'Feature engineering basics',
              'Exploratory Data Analysis (EDA)',
              'Data visualization (Matplotlib, Seaborn)',
            ],
          },
          {
            title: 'Supervised Learning – Regression',
            items: [
              'Machine Learning pipeline',
              'Linear Regression',
              'Multiple Linear Regression',
              'Logistic Regression',
              'Bias–variance tradeoff',
              'Hands-on mini project',
            ],
          },
          {
            title: 'Supervised Learning – Classification',
            items: [
              'Decision Trees',
              'Random Forest',
              'K-Nearest Neighbors (KNN)',
              'Support Vector Machines (SVM)',
              'Evaluation metrics (Accuracy, Precision, Recall, F1)',
            ],
          },
          {
            title: 'Unsupervised Learning',
            items: [
              'K-Means clustering',
              'Hierarchical clustering',
              'Dimensionality reduction (PCA)',
              'Use cases & visualization',
            ],
          },
          {
            title: 'Deep Learning Basics',
            items: [
              'Neural Network fundamentals',
              'Activation functions',
              'Backpropagation intuition',
              'CNN basics (image understanding)',
              'RNN basics (sequence data)',
            ],
          },
          {
            title: 'Model Evaluation & Deployment',
            items: [
              'Cross-validation',
              'Hyper-parameter tuning',
              'Regularization techniques',
              'Intro to deployment',
              'Deploy ML model using Streamlit',
              'Foundation final project',
            ],
          },
        ],
      },
      {
        level: CourseLevel.ADVANCED,
        duration: '5 months',
        highlights: ['Certificate', 'Capstone Project with Deployment'],
        modules: [
          {
            title: 'Advanced Mathematics',
            items: [
              'Multivariate calculus',
              'Optimization techniques (GD, SGD)',
              'Convex optimization',
            ],
          },
          {
            title: 'Bayesian & Probabilistic ML',
            items: [
              'Bayesian inference',
              'Probability models',
              'Probabilistic graphical models',
            ],
          },
          {
            title: 'Advanced Machine Learning',
            items: [
              'Regularization (L1, L2, ElasticNet)',
              'Kernel methods',
              'Model selection strategies',
            ],
          },
          {
            title: 'Ensemble Learning',
            items: [
              'Gradient Boosting',
              'XGBoost',
              'LightGBM',
              'Feature importance & tuning',
            ],
          },
          {
            title: 'CNN Deep Dive',
            items: [
              'CNN architectures',
              'Image classification',
              'Object detection basics',
              'Transfer learning',
            ],
          },
          {
            title: 'Advanced Computer Vision',
            items: [
              'Object detection (YOLO, SSD, Faster R-CNN)',
              'Image segmentation (U-Net, Mask R-CNN)',
            ],
          },
          {
            title: 'RNNs & Transformers',
            items: [
              'RNN, LSTM, GRU',
              'Seq2Seq models',
              'Attention mechanism',
              'Transformers overview',
            ],
          },
          {
            title: 'Generative Models',
            items: [
              'GANs',
              'VAEs',
              'Diffusion models',
              'Image & text generation projects',
            ],
          },
          {
            title: 'NLP Fundamentals',
            items: [
              'Text preprocessing',
              'Tokenization',
              'Word embeddings (Word2Vec, GloVe, FastText)',
            ],
          },
          {
            title: 'Advanced NLP Tasks',
            items: [
              'Sentiment analysis',
              'Named Entity Recognition (NER)',
              'Text summarization',
              'Question Answering',
            ],
          },
          {
            title: 'Large Language Models',
            items: [
              'Transformer architecture deep dive',
              'BERT, GPT overview',
              'Prompt engineering',
              'Fine-tuning LLMs',
            ],
          },
          {
            title: 'LLM Applications',
            items: [
              'Chatbots',
              'RAG systems',
              'LLM evaluation',
              'LLM deployment basics',
            ],
          },
          {
            title: 'MLOps Fundamentals',
            items: [
              'ML lifecycle',
              'Model versioning (DVC, MLflow)',
              'Experiment tracking',
            ],
          },
          {
            title: 'CI/CD for ML',
            items: [
              'Git & GitHub',
              'CI/CD pipelines',
              'GitHub Actions / Jenkins for ML',
            ],
          },
          {
            title: 'Deployment & Scaling',
            items: [
              'Docker',
              'Kubernetes basics',
              'REST APIs for ML',
              'Scaling inference',
            ],
          },
          {
            title: 'Monitoring & Reliability',
            items: [
              'Model monitoring',
              'Data & concept drift',
              'Logging & alerting',
              'Production best practices',
            ],
          },
          {
            title: 'Advanced Topics',
            items: [
              'Graph Neural Networks (GNNs)',
              'Time-Series forecasting',
              'Anomaly detection',
            ],
          },
          {
            title: 'Ethical & Responsible AI',
            items: [
              'Bias & fairness',
              'Explainable AI',
              'Privacy-preserving ML',
              'Federated learning & DP',
            ],
          },
          {
            title: 'Capstone Project',
            items: [
              'Problem definition & data pipeline',
              'Model development & evaluation',
              'End-to-end deployment',
              'Documentation, presentation & demo',
            ],
          },
        ],
      },
    ],
  },
];

const seedCourses = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not defined');
    }
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    for (const courseData of courses) {
      const existingCourse = await CourseModel.findOne({ title: courseData.title });
      
      if (existingCourse) {
        console.log(`Updating course: ${courseData.title}`);
        Object.assign(existingCourse, courseData);
        await existingCourse.save();
      } else {
        console.log(`Creating course: ${courseData.title}`);
        await CourseModel.create(courseData);
      }
    }

    console.log('All courses seeded successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();
