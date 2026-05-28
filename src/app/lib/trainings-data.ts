
import { 
  BookOpen, 
  Microscope, 
  ShieldCheck, 
  GraduationCap, 
  Settings, 
  Award, 
  Activity, 
  Zap, 
  Search, 
  Waves,
  Wrench
} from "lucide-react";

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Professional" | "Technical";
  duration: string;
  fee: string;
  shortDescription: string;
  description: string;
  features: string[];
  curriculum: {
    title: string;
    topics: string[];
  }[];
  icon: any;
  image: string;
  videoUrl: string;
  isPopular?: boolean;
}

export const COURSES: Course[] = [
  {
    id: "ro-tech-cert",
    title: "RO Technician Certification",
    level: "Beginner",
    duration: "30 Days",
    fee: "₹15,000",
    shortDescription: "Master the fundamentals of RO technology and professional servicing.",
    description: "This comprehensive course is designed for aspiring water treatment professionals. You will learn the mechanics of Reverse Osmosis, identify every component of a standard system, and master hands-on repair techniques.",
    features: [
      "Hands-on assembly practice",
      "Leakage diagnostic training",
      "ISO Standard Certification",
      "Job placement assistance"
    ],
    curriculum: [
      {
        title: "Module 1: Principles of RO",
        topics: ["Membrane Technology Basics", "Osmotic Pressure Fundamentals", "Flow Rate Dynamics"]
      },
      {
        title: "Module 2: Practical Assembly",
        topics: ["Filter Housing Setup", "High-Pressure Pump Calibration", "Auto-Cut Switch Wiring"]
      }
    ],
    icon: GraduationCap,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_50%20PM.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    isPopular: true
  },
  {
    id: "industrial-ro-ops",
    title: "Industrial Plant Operation",
    level: "Professional",
    duration: "15 Days",
    fee: "₹25,000",
    shortDescription: "Advanced operational training for large-scale industrial RO plants.",
    description: "Tailored for senior engineers, this course dives deep into PLC-controlled industrial plants. Learn how to optimize recovery rates, manage high-volume throughput, and perform emergency restorations.",
    features: [
      "PLC Programming Basics",
      "Membrane CIP Training",
      "System Performance Mapping",
      "Safety Protocol Mastery"
    ],
    curriculum: [
      {
        title: "Module 1: Industrial Automation",
        topics: ["PLC Controller Logic", "Digital Flow Meter Integration", "Remote Monitoring Setup"]
      },
      {
        title: "Module 2: Maintenance Strategy",
        topics: ["Chemical Cleaning (CIP)", "Anti-scalant Dosing Precision", "Vessel Seal Replacement"]
      }
    ],
    icon: Settings,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2003_45_45%20PM.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "water-quality-specialist",
    title: "Water Quality Specialist",
    level: "Technical",
    duration: "10 Days",
    fee: "₹12,000",
    shortDescription: "Specialized training in laboratory water analysis and chemical treatment.",
    description: "A deep dive into the chemistry of water. This course focuses on interpreting lab results to design perfect treatment regimens for varying source water conditions like high TDS or heavy metal contamination.",
    features: [
      "Lab Equipment Operation",
      "Chemical Dosing Calculation",
      "WHO/ISO Standard Audit",
      "Final Project Assessment"
    ],
    curriculum: [
      {
        title: "Module 1: Chemical Parameters",
        topics: ["TDS and pH Modulation", "Heavy Metal Identification", "Microbiological Analysis"]
      },
      {
        title: "Module 2: Treatment Design",
        topics: ["Pre-filtration Media Selection", "Resin Regeneration Cycles", "Ozone Disinfection Basics"]
      }
    ],
    icon: Microscope,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_17_43%20PM.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];
