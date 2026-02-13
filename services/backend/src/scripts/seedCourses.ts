
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
      /* ---------- FOUNDATION ---------- */
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
      /* ---------- ADVANCED ---------- */
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
    title: 'Data Analysis', // Previously 'Data Analytics', updated to match frontend
    subtitle: 'Beginner to Job-Ready',
    description:
      '7-Month comprehensive program covering Excel, Statistics, SQL, Python, Data Visualization, and BI Tools to become a job-ready Data Analyst.',
    price: 39999,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['data-analytics', 'sql', 'power-bi', 'tableau'],
    levels: [
      /* ---------- FOUNDATION ---------- */
      {
        level: CourseLevel.FOUNDATION,
        duration: '4 months',
        highlights: ['Certificate'],
        modules: [
          /* Month 1: Introduction to Data Analysis & Excel */
          {
            title: 'Introduction to Data Analysis',
            items: [
              'Excel interface & navigation',
              'What is Data Analysis?',
              'Types of data (structured & unstructured)',
              'Data analysis lifecycle',
              'Role & responsibilities of a Data Analyst',
              'Real-world business use cases',
              'Tools used in data analysis',
            ],
          },
          {
            title: 'Excel Basics for Data Analysis',
            items: [
              'Basic data visualization',
              'Excel shortcuts & productivity tips',
              'Data types in Excel',
              'Importing data',
              'Basic formulas',
            ],
          },
          {
            title: 'Excel Data Cleaning & Functions',
            items: [
              'Data cleaning techniques',
              'Handling missing & duplicate data',
              'Conditional formatting',
              'Pivot tables',
              'Pivot charts',
              'Common Excel functions (SUM, IF, VLOOKUP/XLOOKUP)',
              'Text & date functions',
              'Data validation',
            ],
          },
          {
            title: 'Excel Analysis & Visualization',
            items: [
              'Common Excel functions',
              'Basic data visualization',
              'Excel-based mini project',
              'Excel shortcuts & productivity tips',
            ],
          },
          /* Month 2: Statistics for Data Analysis */
          {
            title: 'Descriptive Statistics',
            items: [
              'What is statistics?',
              'Descriptive vs inferential statistics',
              'Mean, median, mode',
              'Range & percentiles',
              'Real-world examples',
            ],
          },
          {
            title: 'Probability & Data Distribution',
            items: [
              'Probability basics',
              'Data distributions',
              'Variance & standard deviation',
              'Normal distribution',
              'Outliers & data spread',
            ],
          },
          {
            title: 'Correlation, Regression & Sampling',
            items: [
              'Correlation concepts',
              'Linear regression basics',
              'Sampling techniques',
              'Bias & data accuracy',
              'Business examples',
              'Statistics using Excel',
            ],
          },
          {
            title: 'Statistics Practical Applications',
            items: [
              'Business problem-solving',
              'Case studies',
              'Foundation-level assessment',
            ],
          },
        ],
      },
      /* ---------- ADVANCED ---------- */
      {
        level: CourseLevel.ADVANCED,
        duration: '3 months',
        highlights: ['Certificate', 'Real-World Project', 'Job-Ready Portfolio'], // From frontend
        modules: [
          /* Month 3: SQL for Data Analysis */
          {
            title: 'Database Fundamentals & SQL Basics',
            items: [
              'What is a database?',
              'Tables, rows & columns',
              'SQL syntax basics',
              'SELECT & WHERE clauses',
              'Filtering data',
            ],
          },
          {
            title: 'SQL Aggregation & Grouping',
            items: [
              'GROUP BY & HAVING',
              'Aggregate functions (SUM, AVG, COUNT)',
              'Sorting & limiting results',
            ],
          },
          {
            title: 'SQL Joins & Subqueries',
            items: [
              'Types of joins',
              'Subqueries',
              'Nested queries',
              'Real-world use cases',
            ],
          },
          {
            title: 'Advanced SQL Concepts',
            items: [
              'Window functions',
              'Performance optimization basics',
              'SQL project',
              'Assessment',
            ],
          },
          /* Month 4: Python for Data Analysis */
          {
            title: 'Python Basics',
            items: [
              'Python for data analysis overview',
              'Introduction to Python',
              'Variables & data types',
              'Loops & conditions',
              'Functions',
            ],
          },
          {
            title: 'NumPy & Pandas',
            items: [
              'NumPy arrays',
              'Pandas Series & DataFrames',
              'Reading datasets',
              'Data selection & filtering',
            ],
          },
          {
            title: 'Data Cleaning & EDA',
            items: [
              'Handling missing values',
              'Data transformation',
              'Exploratory Data Analysis (EDA)',
              'Descriptive statistics with Pandas',
            ],
          },
          {
            title: 'Data Visualization with Python',
            items: [
              'Matplotlib basics',
              'Seaborn basics',
              'Charts & plots',
              'Real dataset visualization project',
            ],
          },
          /* Month 5: Data Visualization & BI Tools */
          {
            title: 'Visualization Principles',
            items: [
              'Data visualization fundamentals',
              'Choosing the right chart',
              'Color & design principles',
              'Dashboard planning',
            ],
          },
          {
            title: 'Power BI / Tableau Basics',
            items: [
              'BI tool interface',
              'Business reporting',
              'Data import',
              'Data modeling basics',
              'Simple visual creation',
            ],
          },
          {
            title: 'Dashboards & KPI Reporting',
            items: [
              'KPI creation',
              'Interactive dashboards',
              'Filters & slicers',
            ],
          },
          {
            title: 'Storytelling with Data',
            items: [
              'Data storytelling concepts',
              'Business insights',
              'Report presentation',
            ],
          },
          /* Month 6: Advanced Analytics & Data Ethics */
          {
            title: 'Hypothesis Testing',
            items: [
              'Hypothesis concepts',
              'Null & alternative hypothesis',
              'Statistical testing basics',
              'Business examples',
            ],
          },
          {
            title: 'A/B Testing & Time Series',
            items: [
              'A/B testing concepts',
              'Metrics & analysis',
              'Time series data',
              'Trend & seasonality',
              'Forecasting basics',
              'Predictive analysis overview',
              'Business analytics use cases',
            ],
          },
          {
            title: 'Forecasting & Business Analytics',
            items: [
              'Predictive analysis overview',
              'Business analytics use cases',
            ],
          },
          {
            title: 'Data Management & Ethics',
            items: [
              'Data quality management',
              'Data governance',
              'Data privacy & security',
              'GDPR basics',
              'Ethical data usage',
              'Case studies',
            ],
          },
          /* Month 7: Projects & Career Preparation */
          {
            title: 'Real-World Data Project – Phase 1',
            items: [
              'Problem statement',
              'Data collection',
              'Data cleaning',
              'Analysis planning',
            ],
          },
          {
            title: 'Real-World Data Project – Phase 2',
            items: [
              'Analysis execution',
              'Visualization',
              'Insight generation',
              'Final reporting',
            ],
          },
          {
            title: 'Case Studies & Portfolio',
            items: ['Industry case studies', 'Portfolio building'],
          },
          {
            title: 'Career Preparation',
            items: [
              'GitHub / dashboard showcase',
              'Best practices',
              'Resume building',
              'Interview questions (SQL, Python, Stats)',
              'Mock interviews',
              'Industry roadmap',
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
    subtitle: 'Beginner to Job-Ready',
    description:
      '7-Month comprehensive program covering networking, OS security, ethical hacking, penetration testing, cloud security, and incident response to become a job-ready Cyber Security professional.',
    price: 44999,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['cyber-security', 'network-security', 'ethical-hacking'],
    levels: [
      /* ---------- FOUNDATION ---------- */
      {
        level: CourseLevel.FOUNDATION,
        duration: '2 months',
        highlights: ['Certificate'],
        modules: [
          /* Month 1: Cyber Security & Networking Basics */
          {
            title: 'Introduction to Cyber Security',
            items: [
              'What is Cyber Security?',
              'Importance of Cyber Security',
              'Types of cyber threats',
              'Attack surfaces',
              'Cyber Security domains & roles',
              'Industry overview',
              'Basics of computer networks',
              'Network types (LAN, WAN, MAN)',
              'OSI model (7 layers)',
            ],
          },
          {
            title: 'Networking Fundamentals',
            items: [
              'TCP/IP model',
              'Data transmission concepts',
              'IPv4 & IPv6',
              'Subnetting basics',
              'DNS & DHCP',
              'Common ports',
              'Protocols: HTTP, HTTPS, FTP, SMTP',
            ],
          },
          {
            title: 'IP Addressing & Protocols',
            items: [
              'IPv4 & IPv6',
              'Subnetting basics',
              'DNS & DHCP',
              'Common ports',
              'Protocols: HTTP, HTTPS, FTP, SMTP',
            ],
          },
          {
            title: 'Network Security Basics',
            items: [
              'Firewalls (types & working)',
              'VPN concepts',
              'Network security best practices',
              'Introduction to Network monitoring',
              'Cyber Security career paths',
            ],
          },
          /* Month 2: Operating Systems & Security Fundamentals */
          {
            title: 'Windows Security',
            items: [
              'Windows OS architecture',
              'User accounts & permissions',
              'NTFS permissions',
              'Windows Firewall',
              'Basic security settings',
            ],
          },
          {
            title: 'Linux Fundamentals for Security',
            items: [
              'Linux architecture',
              'Basic Linux commands',
              'File & directory permissions',
              'Users & groups',
              'Linux security basics',
            ],
          },
          {
            title: 'System Hardening & Authentication',
            items: [
              'System hardening techniques',
              'Access control models',
              'Password policies',
              'Multi-Factor Authentication (MFA)',
              'Authentication vs Authorization',
            ],
          },
          {
            title: 'Cryptography & Security Best Practices',
            items: [
              'Cryptography basics',
              'Symmetric & asymmetric encryption',
              'Hashing concepts',
              'Digital certificates',
              'Security best practices',
            ],
          },
        ],
      },
      /* ---------- ADVANCED ---------- */
      {
        level: CourseLevel.ADVANCED,
        duration: '5 months',
        highlights: ['Certificate', 'Capstone Project', 'Certification Roadmap'],
        modules: [
          /* Month 3: Cyber Threats, Attacks & Defense */
          {
            title: 'Malware & Threat Landscape',
            items: [
              'Types of malware',
              'Malware infection methods',
              'Basic malware analysis',
              'Threat actors',
            ],
          },
          {
            title: 'Social Engineering & Network Attacks',
            items: [
              'Phishing attacks',
              'Email spoofing',
              'Social engineering techniques',
              'Man-in-the-Middle attacks',
              'DoS & DDoS attacks',
              'Attack tools overview',
            ],
          },
          {
            title: 'Vulnerability Assessment',
            items: [
              'Vulnerability assessment concepts',
              'Vulnerability scanning tools',
            ],
          },
          {
            title: 'Security Monitoring & Threat Intelligence',
            items: [
              'Security monitoring basics',
              'Logs & alerts',
              'Threat intelligence concepts',
              'Incident detection basics',
            ],
          },
          /* Month 4: Web & Network Security */
          {
            title: 'Web Application Fundamentals',
            items: [
              'Web architecture',
              'Client-server model',
              'HTTP request/response',
              'Web servers & databases',
            ],
          },
          {
            title: 'OWASP Top 10',
            items: [
              'OWASP overview',
              'SQL Injection',
              'XSS',
              'CSRF attacks',
              'Security misconfigurations',
            ],
          },
          {
            title: 'Advanced Web Attacks',
            items: [
              'Authentication flaws',
              'Session hijacking',
              'Secure coding basics',
            ],
          },
          {
            title: 'Network & Wireless Security',
            items: [
              'Network security tools',
              'IDS & IPS',
              'Wi-Fi security',
              'Wireless attacks',
              'Traffic analysis',
            ],
          },
          /* Month 5: Ethical Hacking & Penetration Testing */
          {
            title: 'Ethical Hacking Methodology',
            items: [
              'Ethical hacking lifecycle',
              'Legal & ethical guidelines',
              'Lab setup',
              'Reconnaissance techniques',
            ],
          },
          {
            title: 'Scanning & Enumeration',
            items: [
              'Network scanning',
              'Service enumeration',
              'Vulnerability discovery',
              'Tool usage (Nmap etc.)',
            ],
          },
          {
            title: 'Exploitation & Password Attacks',
            items: [
              'Exploitation basics',
              'Password cracking methods',
              'Brute-force & dictionary attacks',
              'Defense strategies',
              'Privilege escalation concepts',
              'Maintaining access',
              'Clearing tracks',
            ],
          },
          {
            title: 'Post-Exploitation & Reporting',
            items: ['Penetration testing reports', 'IAM concepts'],
          },
          /* Month 6: Cloud, IoT & Advanced Security */
          {
            title: 'Cloud Computing & Security',
            items: [
              'Cloud service models',
              'Shared responsibility model',
              'Cloud security risks',
              'Cloud security controls',
            ],
          },
          {
            title: 'AWS / Azure Security Basics',
            items: [
              'Cloud access control',
              'Storage security',
              'Monitoring & logging',
            ],
          },
          {
            title: 'API, IoT & Container Security',
            items: [
              'API security risks',
              'IoT vulnerabilities',
              'Container security basics',
              'DevSecOps overview',
            ],
          },
          {
            title: 'Zero Trust & Advanced Models',
            items: [
              'Zero Trust architecture',
              'Network segmentation',
              'Identity-based security',
              'Modern enterprise security',
            ],
          },
          /* Month 7: Incident Response, Forensics & Career */
          {
            title: 'Incident Response',
            items: [
              'Incident response lifecycle',
              'Detection & analysis',
              'Containment & recovery',
              'Case studies',
            ],
          },
          {
            title: 'Digital Forensics & SIEM',
            items: [
              'Digital forensics basics',
              'Evidence collection',
              'Log analysis',
              'SIEM tools basics',
            ],
          },
          {
            title: 'Cyber Laws & Risk Management',
            items: [
              'Data protection laws',
              'Cyber laws (global overview)',
              'Risk assessment',
              'Compliance frameworks',
            ],
          },
          {
            title: 'Capstone Project & Career Prep',
            items: [
              'Real-world capstone project',
              'Resume building',
              'Interview preparation',
              'Certification roadmap (CEH, Security+, CISSP)',
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
    subtitle: 'Beginner to Job-Ready',
    description:
      'Complete 7-month roadmap to become a production-ready AI/ML Engineer – from mathematical foundations and core ML to deep learning, LLMs, MLOps, and end-to-end deployment.',
    price: 54999,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
    instructorId: INSTRUCTOR_ID,
    level: CourseLevel.BEGINNER,
    status: CourseStatus.PUBLISHED,
    isHidden: false,
    tags: ['ai', 'machine-learning', 'deep-learning', 'llms', 'mlops'],
    levels: [
      /* ---------- FOUNDATION ---------- */
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
      /* ---------- ADVANCED ---------- */
      {
        level: CourseLevel.ADVANCED,
        duration: '5 months',
        highlights: ['Certificate', 'Capstone Project with Deployment'],
        modules: [
          /* Month 1: Advanced Math & ML */
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
          /* Month 2: Deep Learning Specialization */
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
          /* Month 3: NLP & LLMs */
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
          /* Month 4: MLOps & Production */
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
          /* Month 5: Special Topics & Capstone */
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
            title: 'Capstone Project (Build Phase)',
            items: [
              'Problem definition',
              'Data pipeline',
              'Model development',
              'Evaluation',
            ],
          },
          {
            title: 'Capstone Project (Deploy & Present)',
            items: [
              'End-to-end deployment',
              'Documentation',
              'Presentation & demo',
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
