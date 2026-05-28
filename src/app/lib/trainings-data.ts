
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

// Mock data removed. Hub is ready for production content.
export const COURSES: Course[] = [];
