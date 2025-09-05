// Define interfaces for our data types
export interface StudentDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  student_mode?: { premium: boolean };
}

export interface ClassDetails {
  id: string;
  name: string;
  description?: string;
  class_code: string;
  created_at: string;
  updated_at: string;
  studentsCount?: number;
  student_mode?: { premium: boolean };
  class_practice?: boolean;
}

export interface ModuleDetails {
  id: string;
  title: string;
  description?: string;
  module_slug: string;
  is_class_module: boolean;
  submodules?: boolean;
  ai_enabled: boolean;
  created_at: string;
  updated_at: string;
  module_mode?: { premium: boolean };
  completion?: {
    completedSubmodules: number;
    totalSubmodules: number;
    percentage: number;
  };
}

export interface WorksheetDetails {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  attempts_count?: number;
  practice?: boolean;
}

export interface StudentAttempt {
  id: string;
  student_id: string;
  worksheet_id: string;
  attempt: any; // Using 'any' for the JSONB data
  created_at: string;
  updated_at: string;
}

export interface StudentInfo {
  id: string;
  // Add any other necessary properties
}

export interface Worksheet {
  id: string;
  name: string;
  // Add any other necessary properties
}

export interface WorksheetQuestion {
  id: string;
  question: string;
  // Add any other necessary properties
}

// Define interfaces for module submodules
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: any[];
  thumbnail?: string;
  practice?: boolean;
}

// Define enhanced module interface with submodules
export interface EnhancedModuleDetails extends ModuleDetails {
  hasSubmodules?: boolean;
  submodulesList?: Submodule[];
}

// UserData for concept slides
export interface UserData {
  studentId?: string;
  classId?: string;
  moduleId?: string;
  submoduleId?: string;
}

export interface ClassWorksheetDetails {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  attempts_count?: number;
}

// Adding default export for Next.js compatibility
export default function TypesPage() {
  return null;
} 