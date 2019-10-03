UPDATE survey
SET survey_status = 'inactive'
WHERE user_id = $1 AND survey_id = $2;

SELECT * FROM survey
WHERE user_id = $1 AND survey_status = 'active';