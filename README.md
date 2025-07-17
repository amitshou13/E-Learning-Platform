Database Schema 

Tables (created_at, updated_at) <- in all the tables
- Users (user_id, user_name, user_email, user_mobile, password, role)
- Courses (course_id, course_name, course_duration)
- Enrollment (enrolled_id, user_id, course_id, start_date, expired_date, isRenewed, updated_at, completed)
- Chapters (chapter_id, chapter_name, course_id)
- SubChapters (subchatper_id, subchapter_name, chapter_id)
- Content (content_id, content_url, content_text, subchapter_id)
- Assessment (assessment_id, assessment_type_id, enum(course, chapter, subchapter, content))
- Assessment_questions (assessment_question_id, assessment_id, question, option2, option3, option4, correct_option_id)
- Assessment_options (assessment_option_id, assessment_question_id, tssype(text, code))
- Marks (mark_id, user_id, assessment_id, passing_percentage, gained_parentage, isPassed)
- Feedbacks (feedback_id, course_id, stars, feedback_content, is_visible, user_id)
- Comments (comment_id, comment_content, user_id, content_id, is_visible, like, admin_like)
- Payments (payment_id, course_id, user_id, transaction_id, payment_status)
- Courses_overview (course_overview_id, course_id, heading, selling_points)
- Progress (progress_id, user_id, course_id, content_id)
- otp_verification (opt, email, expired_at)


// Development Phase for Backend
Step 1:- Installing all the necessary packages and setups

- mkdir backend
- cd backend
- npm init -y // Creates package.json file for node environment
- npm install express cors pg dotenv // installs all the dependencies like postgres express for apis and cors for cross origin resource sharing and dotenv for loading variables from .env file into process.env
- npm install --save-dev typescript ts-node-dev @types/express @types/node // development dependencies
- npx tsc --init // It create a tsconfig.json file to configure typescript compiler



