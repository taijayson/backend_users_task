create TABLE admin(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);

create TABLE boss(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);

create TABLE regular(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    boss_id INTEGER,
    FOREIGN KEY (boss_id) REFERENCES boss (id)
);