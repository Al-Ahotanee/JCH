export type UserRole = 
  | "super_admin"
  | "citizen_db_admin"
  | "mentorship_admin"
  | "recruitment_admin"
  | "cbt_admin"
  | "learning_admin"
  | "lga_officer"
  | "ward_officer"
  | "recruiter"
  | "instructor"
  | "mentor"
  | "user";

export interface SessionUser {
  id: number;
  email: string;
  fullName: string | null;
  role: UserRole;
  profileComplete: number;
}

export const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Administrator",
  citizen_db_admin: "Citizen Database Admin",
  mentorship_admin: "Mentorship Admin",
  recruitment_admin: "Recruitment Admin",
  cbt_admin: "CBT Admin",
  learning_admin: "Learning Platform Admin",
  lga_officer: "LGA Officer",
  ward_officer: "Ward Data Officer",
  recruiter: "Recruiter",
  instructor: "Instructor",
  mentor: "Mentor (Trailblazer)",
  user: "User",
};

export const allRoles: UserRole[] = [
  "super_admin",
  "citizen_db_admin",
  "mentorship_admin",
  "recruitment_admin",
  "cbt_admin",
  "learning_admin",
  "lga_officer",
  "ward_officer",
  "recruiter",
  "instructor",
  "mentor",
  "user",
];