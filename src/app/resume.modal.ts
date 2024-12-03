export interface Profile {
    name: string;
    email: string;
    phone: string;
    location:string;
    link:string;
  }
  
  export interface Education {
    degree: string;
    field: string;
    institution: string;
    location:string;
    score:string;
    year: string;
  }
  
  export interface WorkExperience {
    title: string;
    company: string;
    startYear: string;
    endYear: string;
    descriptions: string[];
  }
  
  export interface Skill {
    name: string;
    details:string[];
  }
  
  export interface Project {
    name: string;
    description: string;
    link:string;
    tools:string[]
  }
  
  export interface Award {
    title: string;
    organization: string;
    year: string;
    description: string;
  }
  
  export interface ResumeData {
    profile: Profile;
    education: Education[];
    work: WorkExperience[];
    skills: Skill[];
    projects: Project[];
    awards: Award[];
  }
  