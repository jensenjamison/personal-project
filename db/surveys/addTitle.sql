INSERT INTO survey (user_id, survey_name)
VALUES ($1, $2)
RETURNING *;