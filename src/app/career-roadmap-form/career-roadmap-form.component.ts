import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface CareerDataset {
  marks: number;
  interest: string;
  study_mode: string;
  skills: string;
  career_path: string;
}

@Component({
  selector: 'app-career-roadmap-form',
  templateUrl: './career-roadmap-form.component.html',
  styleUrls: ['./career-roadmap-form.component.css']
})
export class CareerRoadmapFormComponent implements OnInit {
  careerForm: FormGroup;
  careerPath: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  // Dataset
  careerDataset: CareerDataset[] = [];
  
  // Derived from dataset
  careerOptions: string[] = [];
  skillOptions: string[] = [];
  
  selectedSkills: string[] = [];
  selectedSkill: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.careerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      marks: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      interest: ['', Validators.required],
      study_mode: ['Online Courses', Validators.required],
      skills: ['']
    });
  }

  ngOnInit(): void {
    // Load career dataset from a JSON file or API
    this.loadCareerData();
    
    // Listen for changes in the interest field
    this.careerForm.get('interest')?.valueChanges.subscribe(interest => {
      if (interest) {
        this.updateSkillOptions(interest);
      }
    });
  }

  loadCareerData() {
    this.careerDataset = this.getCareerDataset();
    this.extractCareerOptions();
  }

  getCareerDataset(): CareerDataset[] {
    // This is just a simplified version of your dataset for demonstration
    return [{"marks":95,"interest":"Science","study_mode":"Self-study","skills":"Mathematics;Coding","career_path":"Data Scientist"},
      {"marks":90,"interest":"Science","study_mode":"Online Courses","skills":"Physics;AI","career_path":"AI Researcher"},
      {"marks":85,"interest":"Science","study_mode":"Classroom","skills":"Biology;Chemistry","career_path":"Biotechnologist"},
      {"marks":80,"interest":"Science","study_mode":"Self-study","skills":"Space Science;Astrophysics","career_path":"Astronomer"},
      {"marks":78,"interest":"Science","study_mode":"Online Courses","skills":"Quantum Mechanics;AI","career_path":"Quantum Researcher"},
      {"marks":88,"interest":"Science","study_mode":"Classroom","skills":"Biotech;Genetics","career_path":"Genetic Engineer"},
      {"marks":70,"interest":"Science","study_mode":"Self-study","skills":"Environmental Science","career_path":"Environmental Scientist"},
      {"marks":92,"interest":"Science","study_mode":"Online Courses","skills":"Chemical Engineering","career_path":"Chemical Engineer"},
      {"marks":85,"interest":"Science","study_mode":"Classroom","skills":"AI;Computer Vision","career_path":"AI Engineer"},
      {"marks":60,"interest":"Science","study_mode":"Self-study","skills":"Astronomy;Data Analysis","career_path":"Space Analyst"},
      {"marks":75,"interest":"Science","study_mode":"Classroom","skills":"Geology;Geophysics","career_path":"Geologist"},
      {"marks":81,"interest":"Science","study_mode":"Online Courses","skills":"Marine Biology;Ecology","career_path":"Marine Biologist"},
      {"marks":87,"interest":"Science","study_mode":"Self-study","skills":"Neuroscience;Psychology","career_path":"Neuroscientist"},
      {"marks":69,"interest":"Science","study_mode":"Online Courses","skills":"Physics;Machine Learning","career_path":"Research Scientist"},
      {"marks":88,"interest":"Science","study_mode":"Classroom","skills":"Nanotechnology;AI","career_path":"Nano Engineer"},
      {"marks":95,"interest":"Science","study_mode":"Self-study","skills":"Robotics;IoT","career_path":"Robotics Engineer"},
      {"marks":90,"interest":"Commerce","study_mode":"Online Courses","skills":"Finance;Investment","career_path":"Financial Analyst"},
      {"marks":78,"interest":"Commerce","study_mode":"Classroom","skills":"Marketing;Sales","career_path":"Marketing Manager"},
      {"marks":65,"interest":"Commerce","study_mode":"Self-study","skills":"Stock Trading;Investment","career_path":"Stock Market Analyst"},
      {"marks":55,"interest":"Commerce","study_mode":"Classroom","skills":"Economics;Business Law","career_path":"Economist"},
      {"marks":72,"interest":"Commerce","study_mode":"Online Courses","skills":"Entrepreneurship;Business","career_path":"Entrepreneur"},
      {"marks":85,"interest":"Commerce","study_mode":"Self-study","skills":"Supply Chain;Logistics","career_path":"Supply Chain Manager"},
      {"marks":93,"interest":"Commerce","study_mode":"Classroom","skills":"Taxation;Law","career_path":"Tax Consultant"},
      {"marks":80,"interest":"Commerce","study_mode":"Self-study","skills":"Digital Marketing;SEO","career_path":"Digital Marketer"},
      {"marks":88,"interest":"Commerce","study_mode":"Online Courses","skills":"Hotel Management","career_path":"Hotel Manager"},
      {"marks":70,"interest":"Commerce","study_mode":"Self-study","skills":"E-commerce;Retail","career_path":"Online Business Owner"},
      {"marks":92,"interest":"Engineering","study_mode":"Classroom","skills":"Renewable Energy","career_path":"Energy Engineer"},
      {"marks":83,"interest":"Engineering","study_mode":"Online Courses","skills":"Aerospace;Fluid Dynamics","career_path":"Aerospace Engineer"},
      {"marks":67,"interest":"Engineering","study_mode":"Self-study","skills":"Civil Engineering;CAD","career_path":"Civil Engineer"},
      {"marks":80,"interest":"Engineering","study_mode":"Online Courses","skills":"Automobile Engineering","career_path":"Automobile Engineer"},
      {"marks":90,"interest":"Engineering","study_mode":"Classroom","skills":"Biomedical Engineering","career_path":"Biomedical Engineer"},
      {"marks":95,"interest":"Engineering","study_mode":"Self-study","skills":"AI;IoT","career_path":"IoT Engineer"},
      {"marks":78,"interest":"Engineering","study_mode":"Online Courses","skills":"Embedded Systems;Circuit Design","career_path":"Embedded Engineer"},
      {"marks":86,"interest":"Engineering","study_mode":"Classroom","skills":"Structural Engineering","career_path":"Structural Engineer"},
      {"marks":72,"interest":"Engineering","study_mode":"Self-study","skills":"Power Systems;Electronics","career_path":"Electrical Engineer"},
      {"marks":88,"interest":"Engineering","study_mode":"Online Courses","skills":"Mechatronics","career_path":"Mechatronics Engineer"},
      {"marks":91,"interest":"Engineering","study_mode":"Classroom","skills":"Telecommunications","career_path":"Telecom Engineer"},
      {"marks":45,"interest":"Arts","study_mode":"Self-study","skills":"Writing;Painting","career_path":"Writer"},
      {"marks":65,"interest":"Arts","study_mode":"Classroom","skills":"Acting;Directing","career_path":"Filmmaker"},
      {"marks":72,"interest":"Arts","study_mode":"Online Courses","skills":"Graphic Design","career_path":"Graphic Designer"},
      {"marks":85,"interest":"Arts","study_mode":"Self-study","skills":"Animation;3D Modeling","career_path":"Animator"},
      {"marks":78,"interest":"Arts","study_mode":"Online Courses","skills":"Music Production;Editing","career_path":"Music Producer"},
      {"marks":58,"interest":"Arts","study_mode":"Classroom","skills":"Photography;Storytelling","career_path":"Photographer"},
      {"marks":70,"interest":"Arts","study_mode":"Self-study","skills":"Art Curation;Museums","career_path":"Art Curator"},
      {"marks":82,"interest":"Arts","study_mode":"Online Courses","skills":"Sculpture;Painting","career_path":"Sculptor"},
      {"marks":88,"interest":"Arts","study_mode":"Classroom","skills":"Fashion Design;Styling","career_path":"Fashion Designer"},
      {"marks":90,"interest":"Arts","study_mode":"Self-study","skills":"Creative Writing;Poetry","career_path":"Poet"},
      {"marks":92,"interest":"Medical","study_mode":"Classroom","skills":"Surgery;Anatomy","career_path":"Surgeon"},
      {"marks":78,"interest":"Medical","study_mode":"Online Courses","skills":"Pharmacy;Chemistry","career_path":"Pharmacist"},
      {"marks":68,"interest":"Medical","study_mode":"Self-study","skills":"Nursing;Healthcare","career_path":"Nurse"},
      {"marks":85,"interest":"Medical","study_mode":"Online Courses","skills":"Physiotherapy","career_path":"Physiotherapist"},{"marks":75,"interest":"Medical","study_mode":"Classroom","skills":"Psychology;Therapy","career_path":"Psychologist"},{"marks":88,"interest":"Medical","study_mode":"Self-study","skills":"Sports Medicine","career_path":"Sports Therapist"},{"marks":90,"interest":"Medical","study_mode":"Online Courses","skills":"Cardiology;Medicine","career_path":"Cardiologist"},{"marks":96,"interest":"Medical","study_mode":"Classroom","skills":"Neuroscience","career_path":"Neurologist"},{"marks":80,"interest":"Medical","study_mode":"Self-study","skills":"Veterinary Science","career_path":"Veterinarian"},{"marks":93,"interest":"Medical","study_mode":"Online Courses","skills":"Dentistry","career_path":"Dentist"},{"marks":88,"interest":"IT","study_mode":"Self-study","skills":"Cybersecurity;Hacking","career_path":"Ethical Hacker"},{"marks":92,"interest":"IT","study_mode":"Online Courses","skills":"Web Dev;UX/UI","career_path":"Web Developer"},{"marks":79,"interest":"IT","study_mode":"Classroom","skills":"Database;Cloud Computing","career_path":"Database Administrator"},{"marks":75,"interest":"IT","study_mode":"Self-study","skills":"Game Development;Unity","career_path":"Game Developer"},{"marks":89,"interest":"IT","study_mode":"Online Courses","skills":"Blockchain;Crypto","career_path":"Blockchain Developer"},{"marks":85,"interest":"IT","study_mode":"Classroom","skills":"Software Security;AI","career_path":"Security Engineer"},{"marks":80,"interest":"IT","study_mode":"Self-study","skills":"Data Analysis;Python","career_path":"Data Analyst"},{"marks":96,"interest":"IT","study_mode":"Online Courses","skills":"NLP;Machine Learning","career_path":"NLP Engineer"},{"marks":70,"interest":"IT","study_mode":"Classroom","skills":"UI/UX;Frontend Dev","career_path":"Frontend Developer"},{"marks":85,"interest":"IT","study_mode":"Self-study","skills":"Backend Dev;DevOps","career_path":"Backend Developer"},{"marks":60,"interest":"IT","study_mode":"Online Courses","skills":"Tech Support;Networking","career_path":"IT Support Specialist"},{"marks":74,"interest":"IT","study_mode":"Classroom","skills":"Cloud Computing;AWS","career_path":"Cloud Engineer"},{"marks":83,"interest":"IT","study_mode":"Self-study","skills":"Software Testing;QA","career_path":"Software Tester"},{"marks":88,"interest":"IT","study_mode":"Online Courses","skills":"Embedded Systems;IoT","career_path":"Embedded Engineer"},{"marks":92,"interest":"IT","study_mode":"Classroom","skills":"Full-Stack Development","career_path":"Full-Stack Developer"},{"marks":85,"interest":"IT","study_mode":"Self-study","skills":"AR/VR Development","career_path":"AR/VR Developer"},{"marks":70,"interest":"Science","study_mode":"Classroom","skills":"Agriculture;Botany","career_path":"Agricultural Scientist"},{"marks":94,"interest":"Science","study_mode":"Online Courses","skills":"Genetics;Bioinformatics","career_path":"Bioinformatics Scientist"},{"marks":78,"interest":"Science","study_mode":"Self-study","skills":"Biochemistry;Drug Development","career_path":"Biochemist"},{"marks":85,"interest":"Science","study_mode":"Classroom","skills":"Ecology;Climate Science","career_path":"Climate Scientist"},{"marks":72,"interest":"Science","study_mode":"Online Courses","skills":"Medical Physics;Radiology","career_path":"Medical Physicist"},{"marks":81,"interest":"Science","study_mode":"Self-study","skills":"Space Engineering;Astrodynamics","career_path":"Space Engineer"},{"marks":90,"interest":"Commerce","study_mode":"Classroom","skills":"Wealth Management;Corporate Finance","career_path":"Investment Banker"},{"marks":60,"interest":"Commerce","study_mode":"Self-study","skills":"Real Estate;Mortgage Finance","career_path":"Real Estate Analyst"},{"marks":88,"interest":"Commerce","study_mode":"Online Courses","skills":"Human Resources;Recruitment","career_path":"HR Specialist"},{"marks":75,"interest":"Commerce","study_mode":"Classroom","skills":"Brand Management;Advertising","career_path":"Brand Manager"},{"marks":89,"interest":"Engineering","study_mode":"Online Courses","skills":"Petroleum Engineering","career_path":"Petroleum Engineer"},{"marks":77,"interest":"Engineering","study_mode":"Self-study","skills":"Mining Engineering;Geomechanics","career_path":"Mining Engineer"},{"marks":91,"interest":"Engineering","study_mode":"Classroom","skills":"Textile Engineering","career_path":"Textile Engineer"},{"marks":85,"interest":"Engineering","study_mode":"Self-study","skills":"Audio Engineering;Music Tech","career_path":"Audio Engineer"},{"marks":90,"interest":"Arts","study_mode":"Online Courses","skills":"Video Editing;Post Production","career_path":"Video Editor"},{"marks":78,"interest":"Arts","study_mode":"Self-study","skills":"Interior Design;Architecture","career_path":"Interior Designer"},{"marks":88,"interest":"Medical","study_mode":"Classroom","skills":"Orthopedics;Physiotherapy","career_path":"Orthopedic Surgeon"},{"marks":95,"interest":"Medical","study_mode":"Online Courses","skills":"Radiology;Medical Imaging","career_path":"Radiologist"},{"marks":70,"interest":"Medical","study_mode":"Self-study","skills":"Dermatology;Cosmetology","career_path":"Dermatologist"},{"marks":80,"interest":"IT","study_mode":"Classroom","skills":"AI Ethics;Explainable AI","career_path":"AI Ethics Specialist"},
      {"marks":91,"interest":"IT","study_mode":"Online Courses","skills":"Robotics Software Development","career_path":"Robotics Software Engineer"},
      {"marks":87,"interest":"IT","study_mode":"Self-study","skills":"Game AI;Procedural Generation","career_path":"AI Game Developer"},{"marks":88,"interest":"Science","study_mode":"Classroom","skills":"Climate Science;Data Science","career_path":"Climate Data Analyst"},{"marks":82,"interest":"Science","study_mode":"Online Courses","skills":"Oceanography;Remote Sensing","career_path":"Marine Researcher"},{"marks":77,"interest":"Science","study_mode":"Self-study","skills":"Agritech;IoT","career_path":"Smart Farming Specialist"},{"marks":91,"interest":"Commerce","study_mode":"Classroom","skills":"Economic Research;Policy Making","career_path":"Economic Policy Analyst"},{"marks":86,"interest":"Commerce","study_mode":"Online Courses","skills":"E-commerce;Dropshipping","career_path":"E-commerce Specialist"},{"marks":73,"interest":"Commerce","study_mode":"Self-study","skills":"Content Marketing;SEO","career_path":"Content Strategist"},{"marks":89,"interest":"Engineering","study_mode":"Classroom","skills":"Energy Systems;Sustainability","career_path":"Green Energy Engineer"},{"marks":93,"interest":"Engineering","study_mode":"Online Courses","skills":"Machine Design;Simulation","career_path":"CAD Specialist"},{"marks":81,"interest":"Engineering","study_mode":"Self-study","skills":"Automation;Control Systems","career_path":"Automation Engineer"},{"marks":75,"interest":"Arts","study_mode":"Classroom","skills":"Cultural Studies;History","career_path":"Museum Curator"},{"marks":79,"interest":"Arts","study_mode":"Online Courses","skills":"Creative Direction;Fashion Trends","career_path":"Fashion Director"},{"marks":90,"interest":"Arts","study_mode":"Self-study","skills":"Scriptwriting;Short Films","career_path":"Screenwriter"},{"marks":94,"interest":"Medical","study_mode":"Classroom","skills":"Forensic Science;Pathology","career_path":"Forensic Pathologist"},{"marks":83,"interest":"Medical","study_mode":"Online Courses","skills":"Occupational Therapy;Kinesiology","career_path":"Occupational Therapist"},{"marks":69,"interest":"Medical","study_mode":"Self-study","skills":"Disease Prevention;Epidemiology","career_path":"Epidemiologist"},
      {"marks":91,"interest":"IT","study_mode":"Online Courses","skills":"AI Security;Adversarial ML","career_path":"AI Security Researcher"},{"marks":86,"interest":"IT","study_mode":"Self-study","skills":"DevSecOps;Kubernetes","career_path":"DevOps Security Engineer"},{"marks":78,"interest":"IT","study_mode":"Classroom","skills":"System Architecture;Microservices","career_path":"System Architect"},{"marks":88,"interest":"Science","study_mode":"Online Courses","skills":"Agricultural Tech;Soil Science","career_path":"AgroTech Specialist"},{"marks":80,"interest":"Commerce","study_mode":"Self-study","skills":"Crypto Trading;Finance","career_path":"Cryptocurrency Analyst"},{"marks":70,"interest":"Engineering","study_mode":"Classroom","skills":"Hydraulics;Bridge Design","career_path":"Bridge Engineer"},{"marks":95,"interest":"Arts","study_mode":"Online Courses","skills":"Visual Effects;Film Production","career_path":"VFX Artist"},{"marks":84,"interest":"Medical","study_mode":"Self-study","skills":"Nutrition;Dietetics","career_path":"Clinical Nutritionist"},{"marks":92,"interest":"IT","study_mode":"Classroom","skills":"Edge Computing;AI Chips","career_path":"Edge AI Engineer"},{"marks":74,"interest":"Science","study_mode":"Self-study","skills":"Planetary Science;Mathematics","career_path":"Astrophysicist"},{"marks":87,"interest":"Commerce","study_mode":"Online Courses","skills":"Fintech;Blockchain","career_path":"Fintech Developer"},{"marks":90,"interest":"Engineering","study_mode":"Online Courses","skills":"Smart Grids;IoT","career_path":"Smart Grid Engineer"},{"marks":82,"interest":"Arts","study_mode":"Self-study","skills":"Typography;Graphic Novels","career_path":"Comic Illustrator"},{"marks":68,"interest":"Medical","study_mode":"Online Courses","skills":"Speech Therapy;Audiology","career_path":"Speech Therapist"},{"marks":73,"interest":"IT","study_mode":"Online Courses","skills":"Data Pipelines;ETL","career_path":"Data Engineer"},{"marks":77,"interest":"Science","study_mode":"Online Courses","skills":"Bioinformatics;Data Mining","career_path":"BioData Analyst"},{"marks":92,"interest":"Science","study_mode":"Classroom","skills":"Microbiology;Molecular Biology","career_path":"Microbiologist"},{"marks":76,"interest":"Science","study_mode":"Online Courses","skills":"Biometrics;Computer Vision","career_path":"Biometric Researcher"},{"marks":87,"interest":"Science","study_mode":"Self-study","skills":"Meteorology;Data Analysis","career_path":"Meteorologist"},{"marks":93,"interest":"Science","study_mode":"Classroom","skills":"Medicinal Chemistry;Drug Discovery","career_path":"Pharmaceutical Scientist"},{"marks":79,"interest":"Science","study_mode":"Online Courses","skills":"Zoology;Wildlife Conservation","career_path":"Wildlife Biologist"},{"marks":85,"interest":"Science","study_mode":"Self-study","skills":"Materials Science;Nanotechnology","career_path":"Materials Scientist"},{"marks":72,"interest":"Science","study_mode":"Classroom","skills":"Food Science;Nutrition","career_path":"Food Scientist"},{"marks":89,"interest":"Science","study_mode":"Online Courses","skills":"Computational Physics;Modeling","career_path":"Computational Physicist"},{"marks":91,"interest":"Science","study_mode":"Self-study","skills":"Applied Mathematics;Algorithms","career_path":"Mathematical Modeler"},{"marks":68,"interest":"Science","study_mode":"Classroom","skills":"Plant Science;Forestry","career_path":"Plant Pathologist"},{"marks":82,"interest":"Science","study_mode":"Online Courses","skills":"Nuclear Physics;Energy","career_path":"Nuclear Physicist"},{"marks":87,"interest":"Science","study_mode":"Self-study","skills":"Systems Biology;Network Analysis","career_path":"Systems Biologist"},{"marks":93,"interest":"Commerce","study_mode":"Classroom","skills":"Investment Banking;Financial Markets","career_path":"Investment Manager"},{"marks":79,"interest":"Commerce","study_mode":"Online Courses","skills":"International Business;Global Markets","career_path":"International Business Consultant"},{"marks":86,"interest":"Commerce","study_mode":"Self-study","skills":"Risk Management;Actuarial Science","career_path":"Risk Analyst"},{"marks":72,"interest":"Commerce","study_mode":"Classroom","skills":"Public Relations;Communication","career_path":"PR Specialist"},{"marks":88,"interest":"Commerce","study_mode":"Online Courses","skills":"Business Analytics;Data Visualization","career_path":"Business Intelligence Analyst"},{"marks":92,"interest":"Commerce","study_mode":"Self-study","skills":"Mergers & Acquisitions;Corporate Strategy","career_path":"M&A Analyst"},{"marks":77,"interest":"Commerce","study_mode":"Classroom","skills":"Retail Management;Operations","career_path":"Retail Operations Manager"},{"marks":83,"interest":"Commerce","study_mode":"Online Courses","skills":"Project Management;Agile","career_path":"Project Manager"},{"marks":69,"interest":"Commerce","study_mode":"Self-study","skills":"Insurance;Risk Assessment","career_path":"Insurance Underwriter"},{"marks":91,"interest":"Commerce","study_mode":"Classroom","skills":"Banking;Credit Analysis","career_path":"Credit Risk Analyst"},
      {"marks":87,"interest":"Engineering","study_mode":"Online Courses","skills":"Marine Engineering;Naval Architecture","career_path":"Marine Engineer"},{"marks":74,"interest":"Engineering","study_mode":"Self-study","skills":"Transportation Engineering;Urban Planning","career_path":"Transportation Engineer"},{"marks":90,"interest":"Engineering","study_mode":"Classroom","skills":"Manufacturing;Lean Production","career_path":"Manufacturing Engineer"},{"marks":83,"interest":"Engineering","study_mode":"Online Courses","skills":"Network Engineering;5G Technology","career_path":"Network Engineer"},{"marks":88,"interest":"Engineering","study_mode":"Self-study","skills":"Geotechnical Engineering;Soil Mechanics","career_path":"Geotechnical Engineer"},{"marks":71,"interest":"Engineering","study_mode":"Classroom","skills":"Materials Engineering;Composites","career_path":"Materials Engineer"},
      {"marks":93,"interest":"Engineering","study_mode":"Online Courses","skills":"Nuclear Engineering;Reactor Design","career_path":"Nuclear Engineer"},{"marks":85,"interest":"Engineering","study_mode":"Self-study","skills":"Water Resources;Hydrology","career_path":"Hydraulic Engineer"},{"marks":79,"interest":"Engineering","study_mode":"Classroom","skills":"Optical Engineering;Photonics","career_path":"Optical Engineer"},{"marks":92,"interest":"Engineering","study_mode":"Online Courses","skills":"Instrumentation;Control Systems","career_path":"Instrumentation Engineer"},{"marks":81,"interest":"Arts","study_mode":"Self-study","skills":"Digital Art;Concept Design","career_path":"Digital Artist"},{"marks":70,"interest":"Arts","study_mode":"Classroom","skills":"Dance;Choreography","career_path":"Professional Dancer"},{"marks":83,"interest":"Arts","study_mode":"Online Courses","skills":"Filmmaking;Cinematography","career_path":"Film Director"},{"marks":88,"interest":"Arts","study_mode":"Self-study","skills":"Music Composition;Sound Design","career_path":"Composer"},{"marks":75,"interest":"Arts","study_mode":"Classroom","skills":"Theater Production;Stage Management","career_path":"Theater Producer"},{"marks":90,"interest":"Arts","study_mode":"Online Courses","skills":"Game Art;Character Design","career_path":"Game Artist"},{"marks":67,"interest":"Arts","study_mode":"Self-study","skills":"Pottery;Sculpture","career_path":"Ceramic Artist"},
      {"marks":82,"interest":"Arts","study_mode":"Classroom","skills":"Journalism;Media Studies","career_path":"Journalist"},{"marks":87,"interest":"Arts","study_mode":"Online Courses","skills":"UX/UI Design;Wireframing","career_path":"UX Designer"},{"marks":93,"interest":"Arts","study_mode":"Self-study","skills":"Photojournalism;Documentary","career_path":"Photojournalist"},{"marks":89,"interest":"Medical","study_mode":"Classroom","skills":"Anesthesiology;Critical Care","career_path":"Anesthesiologist"},{"marks":76,"interest":"Medical","study_mode":"Online Courses","skills":"Ophthalmology;Vision Science","career_path":"Ophthalmologist"},{"marks":85,"interest":"Medical","study_mode":"Self-study","skills":"Pediatrics;Child Development","career_path":"Pediatrician"},{"marks":91,"interest":"Medical","study_mode":"Classroom","skills":"Psychiatry;Mental Health","career_path":"Psychiatrist"},{"marks":72,"interest":"Medical","study_mode":"Online Courses","skills":"Emergency Medicine;Trauma Care","career_path":"Emergency Physician"},{"marks":88,"interest":"Medical","study_mode":"Self-study","skills":"Oncology;Cancer Research","career_path":"Oncologist"},{"marks":84,"interest":"Medical","study_mode":"Classroom","skills":"Medical Research;Clinical Trials","career_path":"Medical Researcher"},{"marks":94,"interest":"Medical","study_mode":"Online Courses","skills":"Pathology;Laboratory Medicine","career_path":"Pathologist"},{"marks":79,"interest":"Medical","study_mode":"Self-study","skills":"Public Health;Epidemiology","career_path":"Public Health Specialist"},{"marks":86,"interest":"Medical","study_mode":"Classroom","skills":"Gynecology;Women's Health","career_path":"Gynecologist"},{"marks":90,"interest":"IT","study_mode":"Self-study","skills":"Computer Vision;Deep Learning","career_path":"Computer Vision Engineer"},{"marks":78,"interest":"IT","study_mode":"Online Courses","skills":"Mobile Development;Flutter;React Native","career_path":"Mobile App Developer"},{"marks":85,"interest":"IT","study_mode":"Classroom","skills":"IT Project Management;Scrum","career_path":"IT Project Manager"},{"marks":93,"interest":"IT","study_mode":"Self-study","skills":"Quantum Computing;Quantum Algorithms","career_path":"Quantum Computing Researcher"},{"marks":77,"interest":"IT","study_mode":"Online Courses","skills":"Networking;Cisco;CCNA","career_path":"Network Administrator"},{"marks":89,"interest":"IT","study_mode":"Classroom","skills":"Enterprise Architecture;Systems Integration","career_path":"Enterprise Architect"},{"marks":72,"interest":"IT","study_mode":"Self-study","skills":"Big Data;Hadoop;Spark","career_path":"Big Data Engineer"},{"marks":94,"interest":"IT","study_mode":"Online Courses","skills":"Information Security;Penetration Testing","career_path":"Security Consultant"},{"marks":83,"interest":"IT","study_mode":"Classroom","skills":"Business Intelligence;Data Warehousing","career_path":"BI Developer"},{"marks":76,"interest":"IT","study_mode":"Self-study","skills":"Technical Writing;Documentation","career_path":"Technical Writer"},{"marks":88,"interest":"IT","study_mode":"Online Courses","skills":"Systems Analysis;Requirements Engineering","career_path":"Systems Analyst"},{"marks":95,"interest":"Science","study_mode":"Classroom","skills":"Astrobiology;Exoplanet Research","career_path":"Astrobiologist"},{"marks":80,"interest":"Science","study_mode":"Online Courses","skills":"Synthetic Biology;Genetic Engineering","career_path":"Synthetic Biologist"},{"marks":86,"interest":"Science","study_mode":"Self-study","skills":"Cosmology;Theoretical Physics","career_path":"Cosmologist"},{"marks":73,"interest":"Science","study_mode":"Classroom","skills":"Paleontology;Evolutionary Biology","career_path":"Paleontologist"},{"marks":89,"interest":"Science","study_mode":"Online Courses","skills":"Computational Chemistry;Molecular Modeling","career_path":"Computational Chemist"},{"marks":94,"interest":"Commerce","study_mode":"Self-study","skills":"Corporate Law;Business Ethics","career_path":"Corporate Lawyer"},{"marks":75,"interest":"Commerce","study_mode":"Classroom","skills":"Logistics Management;Supply Chain Optimization","career_path":"Logistics Manager"},{"marks":87,"interest":"Commerce","study_mode":"Online Courses","skills":"Consumer Behavior;Market Research","career_path":"Market Research Analyst"},{"marks":91,"interest":"Commerce","study_mode":"Self-study","skills":"Accounting;Auditing;Taxation","career_path":"Chartered Accountant"},{"marks":78,"interest":"Engineering","study_mode":"Classroom","skills":"Biomechanics;Prosthetics Design","career_path":"Biomechanical Engineer"},{"marks":92,"interest":"Engineering","study_mode":"Online Courses","skills":"Railway Engineering;Transport Systems","career_path":"Railway Engineer"},{"marks":83,"interest":"Engineering","study_mode":"Self-study","skills":"Waste Management;Environmental Engineering","career_path":"Environmental Engineer"},{"marks":77,"interest":"Engineering","study_mode":"Classroom","skills":"Thermal Engineering;HVAC Systems","career_path":"HVAC Engineer"},{"marks":86,"interest":"Arts","study_mode":"Online Courses","skills":"Art Therapy;Counseling","career_path":"Art Therapist"},{"marks":71,"interest":"Arts","study_mode":"Self-study","skills":"Web Design;Front-end Development","career_path":"Web Designer"},{"marks":88,"interest":"Arts","study_mode":"Classroom","skills":"Publishing;Editorial Management","career_path":"Editor"},{"marks":93,"interest":"Arts","study_mode":"Online Courses","skills":"Product Design;Industrial Design","career_path":"Product Designer"},{"marks":79,"interest":"Medical","study_mode":"Self-study","skills":"Immunology;Vaccine Development","career_path":"Immunologist"},{"marks":90,"interest":"Medical","study_mode":"Classroom","skills":"Endocrinology;Hormone Research","career_path":"Endocrinologist"},{"marks":84,"interest":"Medical","study_mode":"Online Courses","skills":"Telemedicine;Digital Health","career_path":"Telehealth Specialist"},{"marks":73,"interest":"IT","study_mode":"Self-study","skills":"Cybersecurity Policy;Governance","career_path":"Cybersecurity Policy Analyst"},
      {"marks":87,"interest":"IT","study_mode":"Classroom","skills":"Software Architecture;Distributed Systems","career_path":"Software Architect"},{"marks":94,"interest":"IT","study_mode":"Online Courses","skills":"Voice Technology;Speech Recognition","career_path":"Voice Technology Developer"},{"marks":82,"interest":"Science","study_mode":"Self-study","skills":"Renewable Energy Research;Sustainability","career_path":"Sustainability Scientist"},{"marks":76,"interest":"Commerce","study_mode":"Classroom","skills":"Financial Planning;Wealth Management","career_path":"Financial Planner"},{"marks":91,"interest":"Engineering","study_mode":"Online Courses","skills":"Acoustical Engineering;Noise Control","career_path":"Acoustical Engineer"},{"marks":85,"interest":"Arts","study_mode":"Self-study","skills":"Advertising;Creative Direction","career_path":"Creative Director"},{"marks":78,"interest":"Medical","study_mode":"Classroom","skills":"Physical Medicine;Rehabilitation","career_path":"Rehabilitation Physician"},{"marks":89,"interest":"IT","study_mode":"Online Courses","skills":"Virtual Reality;Immersive Experiences","career_path":"VR Developer"},{"marks":74,"interest":"Science","study_mode":"Classroom","skills":"Conservation Biology;Wildlife Management","career_path":"Conservation Biologist"},{"marks":90,"interest":"Commerce","study_mode":"Self-study","skills":"Export-Import;International Trade","career_path":"Import-Export Specialist"},{"marks":81,"interest":"Engineering","study_mode":"Online Courses","skills":"Satellite Engineering;Space Communications","career_path":"Satellite Engineer"},{"marks":70,"interest":"Arts","study_mode":"Classroom","skills":"Music Therapy;Psychology","career_path":"Music Therapist"},{"marks":92,"interest":"Medical","study_mode":"Self-study","skills":"Pain Management;Anesthesia","career_path":"Pain Management Specialist"},{"marks":85,"interest":"IT","study_mode":"Online Courses","skills":"Natural Language Processing;Text Analytics","career_path":"NLP Specialist"},{"marks":79,"interest":"Science","study_mode":"Classroom","skills":"Forensic Chemistry;Toxicology","career_path":"Forensic Chemist"},{"marks":88,"interest":"Commerce","study_mode":"Online Courses","skills":"Event Management;Hospitality","career_path":"Event Manager"},{"marks":93,"interest":"Engineering","study_mode":"Self-study","skills":"Offshore Engineering;Marine Structures","career_path":"Offshore Engineer"},{"marks":76,"interest":"Arts","study_mode":"Classroom","skills":"Motion Graphics;Animation","career_path":"Motion Designer"},{"marks":87,"interest":"Medical","study_mode":"Online Courses","skills":"Medical Administration;Healthcare Management","career_path":"Healthcare Administrator"},{"marks":95,"interest":"IT","study_mode":"Self-study","skills":"Cloud Architecture;Serverless Computing","career_path":"Cloud Architect"},{"marks":82,"interest":"Science","study_mode":"Online Courses","skills":"Green Chemistry;Sustainable Processes","career_path":"Green Chemist"},{"marks":72,"interest":"Commerce","study_mode":"Self-study","skills":"Sports Management;Athlete Representation","career_path":"Sports Manager"},{"marks":89,"interest":"Engineering","study_mode":"Classroom","skills":"Packaging Engineering;Materials","career_path":"Packaging Engineer"},{"marks":77,"interest":"Arts","study_mode":"Online Courses","skills":"Content Creation;Social Media","career_path":"Content Creator"},{"marks":91,"interest":"Medical","study_mode":"Self-study","skills":"Precision Medicine;Genomics","career_path":"Precision Medicine Specialist"},{"marks":84,"interest":"IT","study_mode":"Classroom","skills":"IT Governance;Compliance","career_path":"IT Governance Specialist"}]
    this.extractCareerOptions();
  }

  extractCareerOptions() {
    // Extract unique interest areas from dataset
    this.careerOptions = [...new Set(this.careerDataset.map(item => item.interest))].sort();
    
    // If there are career options and none selected yet, update form with first option
    if (this.careerOptions.length > 0 && !this.careerForm.get('interest')?.value) {
      this.careerForm.get('interest')?.setValue(this.careerOptions[0]);
    }
  }

  updateSkillOptions(selectedInterest: string) {
    // Filter dataset for the selected interest
    const relevantEntries = this.careerDataset.filter(entry => 
      entry.interest.toLowerCase() === selectedInterest.toLowerCase()
    );
    
    // Extract and flatten all skills for this interest area
    const allSkills = relevantEntries
      .map(entry => entry.skills.split(';'))
      .flat();
    
    // Remove duplicates and sort
    this.skillOptions = [...new Set(allSkills)].sort();
    
    // Clear previously selected skills as they might not be relevant anymore
    this.selectedSkills = [];
  }

  addSkill() {
    if (this.selectedSkill && !this.selectedSkills.includes(this.selectedSkill)) {
      this.selectedSkills.push(this.selectedSkill);
      this.selectedSkill = '';  // Clear the input after adding
      this.careerForm.get('skills')?.setValue('');
    }
  }

  removeSkill(skill: string) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  }

  onSubmit() {
    if (this.careerForm.valid) {
      this.isLoading = true;
      
      const payload = {
        ...this.careerForm.value,
        skills: this.selectedSkills.join(';')  // Format skills as semicolon-separated string
      };

      this.http.post<any>('http://localhost:5000/career-roadmap', payload).subscribe({
        next: (response) => {
          this.careerPath = response.career_prediction;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'An error occurred. Please check your input or try again later.';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }
}