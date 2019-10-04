UPDATE users
SET email = $2, 
    first_name = $3,
    last_name = $4
WHERE user_id = $1 
RETURNING *;

