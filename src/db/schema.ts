import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  institutionName: text("institution_name"),
  qualificationType: text("qualification_type"),
  fieldOfStudy: text("field_of_study"),
  yearOfGraduation: integer("year_of_graduation"),
  grade: text("grade"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const employment = sqliteTable("employment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  employmentStatus: text("employment_status"),
  currentEmployer: text("current_employer"),
  jobTitle: text("job_title"),
  sector: text("sector"),
  workDuration: text("work_duration"),
  roles: text("roles"),
  references: text("references"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  skillName: text("skill_name"),
  category: text("category"),
  proficiencyLevel: text("proficiency_level"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const certifications = sqliteTable("certifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  certificationName: text("certification_name"),
  issuingOrganization: text("issuing_organization"),
  dateObtained: text("date_obtained"),
  expiryDate: text("expiry_date"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cvUploads = sqliteTable("cv_uploads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  fileName: text("file_name"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const mentors = sqliteTable("mentors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  category: text("category"),
  bio: text("bio"),
  expertise: text("expertise"),
  isApproved: integer("is_approved").default(0),
  rating: real("rating"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const mentorshipRelationships = sqliteTable("mentorship_relationships", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  menteeId: integer("mentee_id").references(() => users.id),
  mentorId: integer("mentor_id").references(() => users.id),
  status: text("status").default("active"),
  startDate: integer("start_date", { mode: "timestamp" }).$defaultFn(() => new Date()),
  endDate: integer("end_date", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const mentorshipSessions = sqliteTable("mentorship_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  relationshipId: integer("relationship_id").references(() => mentorshipRelationships.id),
  sessionType: text("session_type"),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  duration: integer("duration"),
  status: text("status").default("scheduled"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  senderId: integer("sender_id").references(() => users.id),
  receiverId: integer("receiver_id").references(() => users.id),
  content: text("content"),
  filePath: text("file_path"),
  isRead: integer("is_read").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const chatRooms = sqliteTable("chat_rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  topic: text("topic"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const chatRoomMembers = sqliteTable("chat_room_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").references(() => chatRooms.id),
  userId: integer("user_id").references(() => users.id),
  joinedAt: integer("joined_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const chatMessages = sqliteTable("chat_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  roomId: integer("room_id").references(() => chatRooms.id),
  senderId: integer("sender_id").references(() => users.id),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const jobs = sqliteTable("jobs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const jobApplications = sqliteTable("job_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  jobId: integer("job_id").references(() => jobs.id),
  applicantId: integer("applicant_id").references(() => users.id),
  status: text("status").default("pending"),
  appliedAt: integer("applied_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const recruiters = sqliteTable("recruiters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name"),
  companyType: text("company_type"),
  isVerified: integer("is_verified").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cbtExams = sqliteTable("cbt_exams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  creatorId: integer("creator_id").references(() => users.id),
  jobId: integer("job_id").references(() => jobs.id),
  duration: integer("duration"),
  passingScore: real("passing_score"),
  randomizeQuestions: integer("randomize_questions").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cbtQuestions = sqliteTable("cbt_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  examId: integer("exam_id").references(() => cbtExams.id),
  question: text("question").notNull(),
  options: text("options"),
  correctAnswer: text("correct_answer"),
  points: real("points").default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const cbtResults = sqliteTable("cbt_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  examId: integer("exam_id").references(() => cbtExams.id),
  userId: integer("user_id").references(() => users.id),
  score: real("score"),
  totalPoints: real("total_points"),
  passed: integer("passed"),
  startedAt: integer("started_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const courseLessons = sqliteTable("course_lessons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title").notNull(),
  content: text("content"),
  videoUrl: text("video_url"),
  duration: text("duration"),
  order: integer("order"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const courseEnrollments = sqliteTable("course_enrollments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").references(() => courses.id),
  userId: integer("user_id").references(() => users.id),
  progress: real("progress").default(0),
  enrolledAt: integer("enrolled_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const courseMaterials = sqliteTable("course_materials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").references(() => courseLessons.id),
  title: text("title"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const quizQuestions = sqliteTable("quiz_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").references(() => quizzes.id),
  question: text("question").notNull(),
  options: text("options"),
  correctAnswer: text("correct_answer"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const quizResults = sqliteTable("quiz_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").references(() => quizzes.id),
  userId: integer("user_id").references(() => users.id),
  score: real("score"),
  passed: integer("passed"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const certificates = sqliteTable("certificates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  certificateNumber: text("certificate_number"),
  issuedAt: integer("issued_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  title: text("title"),
  message: text("message"),
  type: text("type"),
  isRead: integer("is_read").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const lgas = sqliteTable("lgas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  senatorialZone: text("senatorial_zone"),
});

export const wards = sqliteTable("wards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  lgaId: integer("lga_id").references(() => lgas.id),
});

export const systemSettings = sqliteTable("system_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});