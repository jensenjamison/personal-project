INSERT INTO survey (user_id, survey_name, survey_status )
VALUES ($1, $2, 'active')
RETURNING *;