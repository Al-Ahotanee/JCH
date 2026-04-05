import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/server-session";

interface MentorProfile {
  id: number;
  userId: number;
  category: string;
  expertise: string;
  bio: string;
  isApproved: number;
  fullName: string;
  lga: string;
}

interface MenteeProfile {
  id: number;
  userId: number;
  fullName: string;
  lga: string;
  skills: string[];
  careerInterest: string;
}

function calculateMatchScore(mentor: MentorProfile, mentee: MenteeProfile): number {
  let score = 0;
  
  if (mentor.category && mentee.careerInterest) {
    const mentorCategories = mentor.category.toLowerCase().split(",").map(c => c.trim());
    const interest = mentee.careerInterest.toLowerCase();
    
    if (mentorCategories.some(c => interest.includes(c) || c.includes(interest))) {
      score += 40;
    }
  }
  
  if (mentor.expertise && mentee.skills.length > 0) {
    const mentorSkills = mentor.expertise.toLowerCase().split(",").map(s => s.trim());
    const menteeSkills = mentee.skills.map(s => s.toLowerCase());
    
    const skillMatches = mentorSkills.filter(ms => 
      menteeSkills.some(mes => ms.includes(mes) || mes.includes(ms))
    ).length;
    
    score += Math.min(skillMatches * 20, 40);
  }
  
  if (mentor.lga && mentee.lga && mentor.lga === mentee.lga) {
    score += 20;
  }
  
  return score;
}

function getMatchReason(mentor: MentorProfile, mentee: MenteeProfile): string[] {
  const reasons: string[] = [];
  
  if (mentor.category && mentee.careerInterest) {
    const mentorCategories = mentor.category.toLowerCase().split(",").map(c => c.trim());
    const interest = mentee.careerInterest.toLowerCase();
    
    if (mentorCategories.some(c => interest.includes(c) || c.includes(interest))) {
      reasons.push("Matching career interest");
    }
  }
  
  if (mentor.expertise && mentee.skills.length > 0) {
    const mentorSkills = mentor.expertise.toLowerCase().split(",").map(s => s.trim());
    const menteeSkills = mentee.skills.map(s => s.toLowerCase());
    
    const skillMatches = mentorSkills.filter(ms => 
      menteeSkills.some(mes => ms.includes(mes) || mes.includes(ms))
    );
    
    if (skillMatches.length > 0) {
      reasons.push(`Expertise in: ${skillMatches.join(", ")}`);
    }
  }
  
  if (mentor.lga && mentee.lga && mentor.lga === mentee.lga) {
    reasons.push("Same LGA");
  }
  
  if (reasons.length === 0) {
    reasons.push("Available mentor");
  }
  
  return reasons;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { menteeId, careerInterest, skills, lga, limit = 5 } = body;

    if (!menteeId) {
      return NextResponse.json({ error: "Mentee ID is required" }, { status: 400 });
    }

    const approvedMentors: MentorProfile[] = [];
    const mentee: MenteeProfile = {
      id: menteeId,
      userId: session.id,
      fullName: session.fullName || "User",
      lga: lga || "",
      skills: skills || [],
      careerInterest: careerInterest || ""
    };

    const scoredMentors = approvedMentors.map(mentor => ({
      mentor,
      score: calculateMatchScore(mentor, mentee),
      reasons: getMatchReason(mentor, mentee)
    }));

    const sortedMentors = scoredMentors
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const matchedMentors = sortedMentors
      .filter(m => m.score > 0)
      .map(m => ({
        mentorId: m.mentor.id,
        fullName: m.mentor.fullName,
        category: m.mentor.category,
        bio: m.mentor.bio,
        expertise: m.mentor.expertise,
        matchScore: m.score,
        matchReasons: m.reasons
      }));

    return NextResponse.json({
      success: true,
      mentee: {
        id: mentee.id,
        fullName: mentee.fullName,
        careerInterest: mentee.careerInterest
      },
      matchedMentors,
      totalMatches: matchedMentors.length
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to find mentors" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const menteeId = searchParams.get("menteeId");

  if (!menteeId) {
    return NextResponse.json({ error: "Mentee ID is required" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Automated mentor matching endpoint ready",
    usage: "POST with menteeId, careerInterest, skills, lga to get matched mentors"
  });
}