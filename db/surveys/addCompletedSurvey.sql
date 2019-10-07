INSERT INTO answer (user_id, survey_id, question_id, option_id)
VALUES ($1, $2, $3, $4)
RETURNING *;
