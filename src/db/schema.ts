import { pgTable, text, integer, real, timestamp, serial, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  fullName: text("full_name"),
  phone: text("phone"),
  gender: text("gender"),
  dateOfBirth: text("date_of_birth"),
  maritalStatus: text("marital_status"),
  nationality: text("nationality").default("Nigerian"),
  stateOfOrigin: text("state_of_origin").default("Jigawa"),
  lga: text("lga"),
  ward: text("ward"),
  village: text("village"),
  residentialAddress: text("residential_address"),
  nin: text("nin"),
  passportPhoto: text("passport_photo"),
  profileComplete: integer("profile_complete").default(0),
  isApproved: integer("is_approved").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  institutionName: text("institution_name"),
  qualificationType: text("qualification_type"),
  fieldOfStudy: text("field_of_study"),
  yearOfGraduation: integer("year_of_graduation"),
  grade: text("grade"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employment = pgTable("employment", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  employmentStatus: text("employment_status"),
  currentEmployer: text("current_employer"),
  jobTitle: text("job_title"),
  sector: text("sector"),
  workDuration: text("work_duration"),
  roles: text("roles"),
  references: text("references"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  skillName: text("skill_name"),
  category: text("category"),
  proficiencyLevel: text("proficiency_level"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  certificationName: text("certification_name"),
  issuingOrganization: text("issuing_organization"),
  dateObtained: text("date_obtained"),
  expiryDate: text("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cvUploads = pgTable("cv_uploads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fileName: text("file_name"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  category: text("category"),
  bio: text("bio"),
  expertise: text("expertise"),
  isApproved: integer("is_approved").default(0),
  rating: real("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const mentorshipRelationships = pgTable("mentorship_relationships", {
  id: serial("id").primaryKey(),
  menteeId: integer("mentee_id").references(() => users.id),
  mentorId: integer("mentor_id").references(() => users.id),
  status: text("status").default("active"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const mentorshipSessions = pgTable("mentorship_sessions", {
  id: serial("id").primaryKey(),
  relationshipId: integer("relationship_id").references(() => mentorshipRelationships.id),
  sessionType: text("session_type"),
  scheduledAt: timestamp("scheduled_at"),
  duration: integer("duration"),
  status: text("status").default("scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").references(() => users.id),
  receiverId: integer("receiver_id").references(() => users.id),
  content: text("content"),
  filePath: text("file_path"),
  isRead: integer("is_read").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),
  name: text("name"),
  topic: text("topic"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatRoomMembers = pgTable("chat_room_members", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").references(() => chatRooms.id),
  userId: integer("user_id").references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").references(() => chatRooms.id),
  senderId: integer("sender_id").references(() => users.id),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  employerId: integer("employer_id").references(() => users.id),
  jobType: text("job_type"),
  industry: text("industry"),
  qualification: text("qualification"),
  skillRequirement: text("skill_requirement"),
  experienceLevel: text("experience_level"),
  location: text("location"),
  lga: text("lga"),
  employmentType: text("employment_type"),
  isInternal: integer("is_internal").default(0),
  isApproved: integer("is_approved").default(0),
  applicationDeadline: text("application_deadline"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id),
  applicantId: integer("applicant_id").references(() => users.id),
  status: text("status").default("pending"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const recruiters = pgTable("recruiters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name"),
  companyType: text("company_type"),
  isVerified: integer("is_verified").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cbtExams = pgTable("cbt_exams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  creatorId: integer("creator_id").references(() => users.id),
  jobId: integer("job_id").references(() => jobs.id),
  duration: integer("duration"),
  passingScore: real("passing_score"),
  randomizeQuestions: integer("randomize_questions").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cbtQuestions = pgTable("cbt_questions", {
  id: serial("id").primaryKey(),
  examId: integer("exam_id").references(() => cbtExams.id),
  question: text("question").notNull(),
  options: text("options"),
  correctAnswer: text("correct_answer"),
  points: real("points").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cbtResults = pgTable("cbt_results", {
  id: serial("id").primaryKey(),
  examId: integer("exam_id").references(() => cbtExams.id),
  userId: integer("user_id").references(() => users.id),
  score: real("score"),
  totalPoints: real("total_points"),
  passed: integer("passed"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  instructorId: integer("instructor_id").references(() => users.id),
  category: text("category"),
  level: text("level"),
  duration: text("duration"),
  price: real("price").default(0),
  isFree: integer("is_free").default(1),
  isApproved: integer("is_approved").default(0),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseLessons = pgTable("course_lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title").notNull(),
  content: text("content"),
  videoUrl: text("video_url"),
  duration: text("duration"),
  lessonOrder: integer("lesson_order"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  userId: integer("user_id").references(() => users.id),
  progress: real("progress").default(0),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const courseMaterials = pgTable("course_materials", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => courseLessons.id),
  title: text("title"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").references(() => quizzes.id),
  question: text("question").notNull(),
  options: text("options"),
  correctAnswer: text("correct_answer"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").references(() => quizzes.id),
  userId: integer("user_id").references(() => users.id),
  score: real("score"),
  passed: integer("passed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  certificateNumber: text("certificate_number"),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title"),
  message: text("message"),
  type: text("type"),
  isRead: integer("is_read").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lgas = pgTable("lgas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  senatorialZone: text("senatorial_zone"),
});

export const wards = pgTable("wards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  lgaId: integer("lga_id").references(() => lgas.id),
});

export const systemSettings = pgTable("system_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: integer("entity_id"),
  details: text("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videoSessions = pgTable("video_sessions", {
  id: serial("id").primaryKey(),
  mentorshipSessionId: integer("mentorship_session_id").references(() => mentorshipSessions.id),
  roomId: text("room_id").notNull(),
  hostUserId: integer("host_user_id").references(() => users.id),
  participantUserId: integer("participant_user_id").references(() => users.id),
  status: text("status").default("pending"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").defaultNow(),
});