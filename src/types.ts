export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  website: { label: string; url: string };
  social: { github: string; linkedin: string; email: string };
  about: string;
  resumeUrl: string;
  avatarUrl: string;
  heroBannerUrl: string;
  techStack: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: { start: string; end: string };
  location: string;
  icon: string;
  isActive: boolean;
  year: string;
  bullets: string[];
  tags?: string[];
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  isActive: boolean;
  note?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  meta: string;
  icon: string;
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  links: { demo: string | null; source: string | null };
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  skills: string[];
}
