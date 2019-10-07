DELETE FROM option
WHERE question_id IN (SELECT question_id FROM question WHERE survey_id = $1);

DELETE FROM question
WHERE survey_id = $1; 

DELETE FROM survey
WHERE survey_id = $1;

SELECT * FROM survey
WHERE user_id = $2;