create TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(255),
    boss_name VARCHAR(255), 
    -- boss_id INTEGER,
    -- FOREIGN KEY (boss_id) REFERENCES users (id)
);