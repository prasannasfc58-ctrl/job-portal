import type { Candidate } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getAvatarUrl = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/placeholder/200/200';
};

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Elena Vance',
    avatar: getAvatarUrl('avatar-1'),
    email: 'elena.vance@example.com',
    phone: '555-0101',
    linkedin: 'linkedin.com/in/elenavance',
    location: 'New York, NY',
    status: 'On Hold',
    courses: ['Advanced React', 'State Management Patterns'],
    caddScore: 85,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Jest'],
    topics: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Jest', 'CSS'],
    summary: 'Senior Frontend Engineer with 8 years of experience in building scalable web applications. Passionate about clean code and user experience.',
    education: [
      { institution: 'NYU', degree: 'B.S. in Computer Science', years: '2010-2014' }
    ],
    experience: [
      { company: 'Innovate Inc.', role: 'Senior Frontend Engineer', years: '2018-Present', description: 'Led the development of a new user-facing analytics dashboard.' },
      { company: 'Tech Solutions', role: 'Frontend Developer', years: '2014-2018', description: 'Worked on a team to build and maintain a large-scale e-commerce platform.' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    avatar: getAvatarUrl('avatar-2'),
    email: 'marcus.thorne@example.com',
    phone: '555-0102',
    linkedin: 'linkedin.com/in/marcusthorne',
    location: 'San Francisco, CA',
    status: 'On Hold',
    courses: ['Cloud Native Go', 'Microservices Architecture'],
    caddScore: 92,
    skills: ['Go', 'Kubernetes', 'Docker', 'PostgreSQL', 'gRPC', 'DevOps Automation', 'SQL'],
    topics: ['Distributed Systems', 'Backend Scalability', 'DevOps Automation', 'Go', 'Kubernetes'],
    summary: 'Backend developer specializing in cloud-native technologies and distributed systems. Proven track record of designing and deploying robust microservices.',
    education: [
      { institution: 'Stanford University', degree: 'M.S. in Computer Science', years: '2012-2014' }
    ],
    experience: [
      { company: 'CloudWorks', role: 'Lead Backend Engineer', years: '2016-Present', description: 'Architected and implemented a new microservices-based platform.' },
      { company: 'Data Systems', role: 'Software Engineer', years: '2014-2016', description: 'Developed and maintained data processing pipelines.' }
    ]
  },
  {
    id: '3',
    name: 'Chloe Rivera',
    avatar: getAvatarUrl('avatar-3'),
    email: 'chloe.rivera@example.com',
    phone: '555-0103',
    linkedin: 'linkedin.com/in/chloerivera',
    location: 'Austin, TX',
    status: 'On Hold',
    courses: ['UI/UX Design Principles', 'Figma for UI Design'],
    caddScore: 78,
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    topics: ['Design Systems', 'User-Centered Design', 'Mobile App UX', 'Figma', 'Prototyping', 'Accessibility'],
    summary: 'Creative UI/UX designer with a strong focus on creating intuitive and visually appealing digital experiences. Proficient in all stages of the design process.',
    education: [
      { institution: 'The University of Texas at Austin', degree: 'B.A. in Design', years: '2013-2017' }
    ],
    experience: [
      { company: 'Bright Ideas', role: 'Senior UI/UX Designer', years: '2019-Present', description: 'Led the redesign of the company\'s flagship mobile application.' },
      { company: 'Creative Co.', role: 'UI/UX Designer', years: '2017-2019', description: 'Created wireframes, prototypes, and high-fidelity mockups for various client projects.' }
    ]
  },
  {
    id: '4',
    name: 'David Chen',
    avatar: getAvatarUrl('avatar-4'),
    email: 'david.chen@example.com',
    phone: '555-0104',
    linkedin: 'linkedin.com/in/davidchen',
    location: 'Seattle, WA',
    status: 'On Hold',
    courses: ['Machine Learning with Python', 'Deep Learning Specialization'],
    caddScore: 95,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'Natural Language Processing', 'SQL'],
    topics: ['Natural Language Processing', 'Computer Vision', 'Recommender Systems', 'Python', 'TensorFlow'],
    summary: 'Data Scientist with expertise in machine learning and deep learning models. Skilled in turning data into actionable insights.',
    education: [
      { institution: 'University of Washington', degree: 'Ph.D. in Machine Learning', years: '2015-2020' }
    ],
    experience: [
      { company: 'AI Innovations', role: 'Senior Data Scientist', years: '2020-Present', description: 'Developed and deployed machine learning models for predictive analytics.' },
      { company: 'Data Insights', role: 'Data Scientist', years: '2018-2020', description: 'Performed data analysis and built statistical models.' }
    ]
  },
  {
    id: '5',
    name: 'Sofia Petrova',
    avatar: getAvatarUrl('avatar-5'),
    email: 'sofia.petrova@example.com',
    phone: '555-0105',
    linkedin: 'linkedin.com/in/sofiapetrova',
    location: 'Chicago, IL',
    status: 'On Hold',
    courses: ['Agile Project Management', 'Certified ScrumMaster'],
    caddScore: 88,
    skills: ['Agile Methodologies', 'Scrum', 'Jira', 'Product Roadmapping', 'Stakeholder Management', 'Team Leadership'],
    topics: ['Lean Product Development', 'Team Leadership', 'Release Planning', 'Agile Methodologies', 'Scrum', 'Budgeting'],
    summary: 'Experienced Project Manager with a knack for leading cross-functional teams in fast-paced environments. Certified ScrumMaster with a focus on agile principles.',
    education: [
      { institution: 'University of Chicago', degree: 'MBA', years: '2012-2014' }
    ],
    experience: [
      { company: 'Agile Solutions', role: 'Senior Project Manager', years: '2016-Present', description: 'Managed multiple software development projects from conception to launch.' },
      { company: 'Tech Corp', role: 'Project Manager', years: '2014-2016', description: 'Coordinated project timelines, resources, and stakeholder communication.' }
    ]
  },
  {
    id: '6',
    name: 'Leo Kim',
    avatar: getAvatarUrl('avatar-6'),
    email: 'leo.kim@example.com',
    phone: '555-0106',
    linkedin: 'linkedin.com/in/leokim',
    location: 'Boston, MA',
    status: 'On Hold',
    courses: ['Cybersecurity Fundamentals', 'Ethical Hacking'],
    caddScore: 82,
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Python', 'Wireshark', 'Cloud Security'],
    topics: ['Threat Analysis', 'Incident Response', 'Cloud Security', 'Python', 'Network Security', 'SIEM'],
    summary: 'Cybersecurity analyst passionate about protecting digital assets. Experienced in identifying vulnerabilities and implementing robust security measures.',
    education: [
      { institution: 'MIT', degree: 'B.S. in Cybersecurity', years: '2016-2020' }
    ],
    experience: [
      { company: 'SecureNet', role: 'Cybersecurity Analyst', years: '2020-Present', description: 'Monitored networks for security breaches and investigated violations.' },
      { company: 'InfoSec', role: 'Junior Security Analyst', years: '2019-2020', description: 'Assisted in security audits and vulnerability assessments.' }
    ]
  }
];

export const candidateStatuses: Candidate['status'][] = ['Interviewing', 'Hired'];
