import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { UserRole } from "./types";

export interface SessionUser {
  id: number;
  email: string;
  fullName: string | null;
  role: UserRole;
  profileComplete: number;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  
  if (!token) return null;
  
  try {
    const userId = parseInt(token);
    const user = await db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      role: users.role,
      profileComplete: users.profileComplete,
    }).from(users).where(eq(users.id, userId)).limit(1);
    
    if (user.length === 0) return null;
    
    return {
      id: user[0].id,
      email: user[0].email,
      fullName: user[0].fullName,
      role: user[0].role as UserRole,
      profileComplete: user[0].profileComplete ?? 0,
    };
  } catch {
    return null;
  }
}

export async function setSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set("session", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export function hasRole(requiredRoles: UserRole[]): (user: SessionUser | null) => boolean {
  return (user: SessionUser | null) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };
}

export const isAdmin = hasRole([
  "super_admin",
  "citizen_db_admin", 
  "mentorship_admin",
  "recruitment_admin",
  "cbt_admin",
  "learning_admin",
]);

export const isSuperAdmin = (user: SessionUser | null) => user?.role === "super_admin";

export const isLGAOfficer = (user: SessionUser | null) => user?.role === "lga_officer";

export const isRecruiter = (user: SessionUser | null) => user?.role === "recruiter";

export const isMentor = (user: SessionUser | null) => user?.role === "mentor";

export const isInstructor = (user: SessionUser | null) => user?.role === "instructor";