-- CREATE DATABASE learning_platform;

-- Creating sequence for each primary key to auto inserted
CREATE SEQUENCE user_seq START WITH 10001 INCREMENT BY 1;
CREATE SEQUENCE course_seq START WITH 10001 INCREMENT BY 1;
CREATE SEQUENCE enrollment_seq START WITH 10001 INCREMENT BY 1;
CREATE SEQUENCE chapter_seq START WITH 10001 INCREMENT BY 1;

-- Creating enum type datatype for all the columns in need
CREATE TYPE role AS ENUM ('admin', 'guest', 'user');
CREATE TYPE assess_type AS ENUM ('course', 'chapter', 'subchapter', 'content');
CREATE TYPE options_type AS ENUM ('text', 'code');
CREATE TYPE lesson_type_enum AS ENUM ('video', 'text', 'code', 'quiz');

-- Functions to update updated_at column for tables
CREATE OR REPLACE FUNCTION set_updated_columns()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Creating trigger to auto update the updated_at column in each table
CREATE TRIGGER trg_users_updated BEFORE 
UPDATE ON Users FOR EACH ROW EXECUTE FUNCTION set_updated_columns();

CREATE TRIGGER trg_courses_updated BEFORE
UPDATE ON Courses FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_enrollments_updated BEFORE
UPDATE ON Enrollments FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_chapters_updated BEFORE
UPDATE ON Chapters FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_subchapters_updated BEFORE
UPDATE ON Subchapters FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_contents_updated BEFORE
UPDATE ON Contents FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_assessments_updated BEFORE
UPDATE ON Assessments FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_assessment_questions_updated BEFORE
UPDATE ON Assessment_questions FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_assessment_options_updated BEFORE
UPDATE ON Assessment_options FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_marks_updated BEFORE
UPDATE ON Marks FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_feedbacks_updated BEFORE
UPDATE ON Feedbacks FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_comments_updated BEFORE
UPDATE ON Comments FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_payments_updated BEFORE
UPDATE ON Payments FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_courses_overview_updated BEFORE
UPDATE ON Courses_overview FOR each ROW EXECUTE PROCEDURE set_updated_columns();

CREATE TRIGGER trg_progress_updated BEFORE
UPDATE ON Progress FOR each ROW EXECUTE PROCEDURE set_updated_columns();


-- TABLES SCHEMA
CREATE TABLE Users (
    user_id VARCHAR(10) PRIMARY KEY DEFAULT ('U' || NEXTVAL('user_seq')),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_phone_number VARCHAR(15) UNIQUE NOT NULL,
    passhash VARCHAR(100) NOT NULL,
    user_role role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE Courses (
    course_id VARCHAR(10) PRIMARY KEY DEFAULT ('C' || NEXTVAL('course_seq')),
    course_name VARCHAR(100) NOT NULL,
    course_duration INTERVAL NOT NULL,
    course_price INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE Enrollments (
    enrollment_id VARCHAR(10) PRIMARY KEY DEFAULT ('E' || NEXTVAL('enrollment_seq')),
    user_id VARCHAR(10) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    expiry_date TIMESTAMP,
    isRenewed BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_entrollments_users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_entrollments_courses FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Chapters (
    chapter_id VARCHAR(10) PRIMARY KEY DEFAULT ('CH' || NEXTVAL('chapter_seq')),
    chapter_name VARCHAR(200) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_chapters_courses FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Subchapters (
    subchapter_id SERIAL PRIMARY KEY,
    subchapter_name VARCHAR(200) NOT NULL,
    chapter_id VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_subchapters_chapters FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id) 
);

CREATE TABLE Contents (
    content_id SERIAL PRIMARY KEY,
    content_url TEXT,
    content_text TEXT,
    lesson_type lesson_type_enum,
    subchapter_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_contents_subchapters FOREIGN KEY (subchapter_id) REFERENCES Subchapters(subchapter_id)
);

CREATE TABLE Assessments (
    assessment_id SERIAL PRIMARY KEY,
    assessment_type assess_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE Assessment_questions (
    assessment_question_id SERIAL PRIMARY KEY,
    assessment_id INTEGER NOT NULL,
    question TEXT,
    option1 TExT,
    option2 TEXT,
    option3 TEXT,
    option4 TEXT,
    correct_option_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_questions_assessments FOREIGN KEY (assessment_id) REFERENCES Assessments(assessment_id)
);

CREATE TABLE Assessment_options (
    assessment_option_id SERIAL PRIMARY KEY,
    assessment_question_id INTEGER NOT NULL,
    option_type options_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_options_questions FOREIGN KEY (assessment_question_id) REFERENCES Assessment_questions(assessment_question_id)
);

CREATE TABLE Marks (
    mark_id SERIAL PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    assessment_id INTEGER NOT NULL,
    passing_percentage INTEGER NOT NULL,
    gained_percentage INTEGER,
    isPassed BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_marks_users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_marks_assessments FOREIGN KEY (assessment_id) REFERENCES Assessments(assessment_id)
);

CREATE TABLE Feedbacks (
    feedback_id SERIAL PRIMARY KEY,
    course_id VARCHAR(10) NOT NULL,
    stars SMALLINT,
    feedback_content TEXT,
    is_visible BOOLEAN,
    user_id VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_feedback_courses FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    CONSTRAINT fk_feedback_users FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    comment_content TEXT NOT NULL,
    user_id VARCHAR(10) NOT NULL,
    content_id INTEGER NOT NULL,
    is_visible BOOLEAN,
    user_like BOOLEAN,
    admin_like BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_comments_users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_comments_contents FOREIGN KEY (content_id) REFERENCES Contents(content_id)
);

CREATE TABLE Payments (
    payment_id SERIAL PRIMARY KEY,
    course_id VARCHAR(10) NOT NULL,
    user_id VARCHAR(10) NOT NULL,
    transaction_id VARCHAR(20) NOT NULL,
    payment_status BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_payment_users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_payment_course FOREIGN Key (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Courses_overview (
    course_overview_id SERIAL PRIMARY KEY,
    course_id VARCHAR(10) NOT NULL,
    heading TEXT NOT NULL,
    selling_points TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_overview_courses FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

CREATE TABLE Progress (
    progress_id SERIAL PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    course_id VARCHAR(10) NOT NULL,
    content_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_progress_users FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_progress_courses FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    CONSTRAINT fk_progress_contents FOREIGN KEY (content_id) REFERENCES Contents(content_id)
);

-- This need to be updated as the expired at 
CREATE TABLE otp_verification (
    otp INTEGER NOT NULL,
    email VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expired_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '5 minutes')
);

CREATE INDEX idx_enrollments_user_id ON Enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON Enrollments(course_id);
