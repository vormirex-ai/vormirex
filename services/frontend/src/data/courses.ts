export type CourseId = 'cyber-security' | 'data-analytics' | 'data-science';
export type CourseLevel = 'Foundation' | 'Advanced';

export interface CourseModule {
  title: string;
  items: string[];
}

export interface CourseLevelBlock {
  level: CourseLevel;
  modules: CourseModule[];
  highlights?: string[]; // e.g., Certificate / Project lines
  duration?: string; // e.g., "6 months"
}

export interface Course {
  id: CourseId;
  title: string;
  subtitle: string;
  description: string;
  levels: CourseLevelBlock[];
}

export const COURSES: Record<CourseId, Course> = {
  /* -------------------------------------------------------------------------- */
  /* DATA SCIENCE */
  /* -------------------------------------------------------------------------- */
  'data-science': {
    id: 'data-science',
    title: 'Data Science',
    subtitle: 'Foundation → Advanced',
    description:
      'From strong mathematical foundations to advanced ML, deep learning, MLOps, and production-grade AI systems.',
    levels: [
      /* ---------- FOUNDATION ---------- */
      {
        level: 'Foundation',
        duration: '4 months',
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
        highlights: ['Certificate'],
      },
      /* ---------- ADVANCED ---------- */
      {
        level: 'Advanced',
        duration: '6 months',
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
        highlights: ['Certificate', 'Capstone Project'],
      },
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* DATA ANALYTICS */
  /* -------------------------------------------------------------------------- */
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics',
    subtitle: 'Foundation → Advanced',
    description:
      'Build strong analytics fundamentals, then move into ML, data engineering, and real-world deployment.',
    levels: [
      {
        level: 'Foundation',
        duration: '4 months',
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
        highlights: ['Certificate'],
      },
      {
        level: 'Advanced',
        duration: '6 months',
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
        highlights: ['Project', 'Certificate'],
      },
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* CYBER SECURITY */
  /* -------------------------------------------------------------------------- */
  'cyber-security': {
    id: 'cyber-security',
    title: 'Cyber Security',
    subtitle: 'Foundation → Advanced',
    description:
      'Learn security fundamentals, then progress into red teaming, cloud security, forensics, governance, and emerging threats.',
    levels: [
      {
        level: 'Foundation',
        duration: '6 months',
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
        highlights: ['Certificate'],
      },
      {
        level: 'Advanced',
        duration: '8 months',
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
        highlights: ['Certificate'],
      },
    ],
  },
};
