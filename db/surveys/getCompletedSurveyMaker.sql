SELECT u.email FROM users u 
INNER JOIN survey s ON u.user_id = s.user_id
WHERE s.survey_id = $1;