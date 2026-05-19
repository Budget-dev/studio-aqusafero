
import { BookOpen, Microscope, ShieldCheck, GraduationCap, Clock, Award, Activity, Zap, Search, Waves } from "lucide-react";

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
    id: "ro-basic",
    title: "Water Treatment Fundamentals",
    level: "Beginner",
    duration: "3 Days",
    fee: "₹15,000",
    shortDescription: "A comprehensive introduction to reverse osmosis technology and system operations.",
    description: "This course is designed for entry-level technicians and facility managers who need to understand the core principles of water purification. We cover everything from source water analysis to the chemical thermodynamics of membranes. Participants will gain hands-on experience with standard domestic and light-commercial RO systems.",
    features: [
      "Basic Hydraulics & Pressure",
      "Membrane Chemistry Overview",
      "Pre-filtration Essentials",
      "Daily Logging & Monitoring"
    ],
    curriculum: [
      {
        title: "Day 1: Theory of Filtration",
        topics: ["Osmosis vs Reverse Osmosis", "TDS & Conductivity Basics", "Particulate Removal"]
      },
      {
        title: "Day 2: Component Mastery",
        topics: ["Pumps & Motors", "Membrane Types", "Control Valves"]
      },
      {
        title: "Day 3: Practical Ops",
        topics: ["Start-up Sequences", "Shutdown Protocols", "Basic Maintenance"]
      }
    ],
    icon: BookOpen,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_50%20PM.png",
    videoUrl: "https://www.youtube.com/embed/fW72n_2f15w",
    isPopular: true
  },
  {
    id: "ro-advanced",
    title: "Advanced Industrial Plant Design",
    level: "Professional",
    duration: "5 Days",
    fee: "₹45,000",
    shortDescription: "Technical deep-dive into plant sizing, flux calculations, and custom RO solutions.",
    description: "Designed for senior engineers and plant designers, this intensive 5-day module focuses on the engineering mathematics behind large-scale water treatment. We utilize proprietary design software to model flux rates, salt rejection curves, and energy recovery systems. You will learn to build systems capable of handling 50,000+ GPD.",
    features: [
      "System Design Software Training",
      "Pressure Vessel Stress Analysis",
      "PLC & Automation Logic Design",
      "Cost-Efficiency & Recovery Mapping"
    ],
    curriculum: [
      {
        title: "Module 1: Design Software",
        topics: ["ROSA/IMSDesign Pro", "Scaling Prediction", "Flux Optimization"]
      },
      {
        title: "Module 2: Automation",
        topics: ["PLC Logic (Ladders)", "SCADA Integration", "Remote IoT Sensors"]
      },
      {
        title: "Module 3: Industrial Integration",
        topics: ["ZLD Concepts", "Effluent Recycling", "High-Pressure Safety"]
      }
    ],
    icon: Microscope,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2004_01_45%20PM.png",
    videoUrl: "https://www.youtube.com/embed/2X96_B-C294"
  },
  {
    id: "maintenance-specialist",
    title: "Service & Troubleshooting Expert",
    level: "Technical",
    duration: "4 Days",
    fee: "₹35,000",
    shortDescription: "Hands-on training for system failure diagnostics and pump restoration.",
    description: "The 'Golden Wrench' course. This is purely technical and hands-on. Students will work on active plants with induced faults to learn rapid diagnostics. We cover chemical-in-place (CIP) membrane cleaning, mechanical seal restoration on vertical multi-stage pumps, and electronic control board repairs.",
    features: [
      "Advanced Diagnostic Tools",
      "CIP Procedure Mastery",
      "Pump Mechanical Seal Repair",
      "Emergency Protocol Training"
    ],
    curriculum: [
      {
        title: "Day 1: Diagnostics",
        topics: ["Fault Tree Analysis", "Sensor Calibration", "Electrical Continuity"]
      },
      {
        title: "Day 2: Membrane Cleaning",
        topics: ["Acidic vs Alkaline Wash", "Biological Fouling Removal", "Flux Recovery"]
      },
      {
        title: "Day 3: Mechanical Overhaul",
        topics: ["Pump Rewinding Basics", "Valve Re-seating", "Vessel Seal Replacement"]
      }
    ],
    icon: ShieldCheck,
    image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_48%20PM.png",
    videoUrl: "https://www.youtube.com/embed/rP3iXhH3Dww"
  }
];
