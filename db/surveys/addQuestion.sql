INSERT INTO question (survey_id, question)
VALUES ($1, $2)
RETURNING *;