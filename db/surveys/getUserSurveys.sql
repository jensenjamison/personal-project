SELECT * FROM survey
WHERE user_id = $1;

-- SELECT s.survey_id, s.survey_name, q.question_id, q.question, o.option_id, o.option FROM survey s
-- INNER JOIN question q ON s.survey_id = q.survey_id
-- INNER JOIN option o ON q.question_id = o.question_id
-- WHERE s.user_id = $1;