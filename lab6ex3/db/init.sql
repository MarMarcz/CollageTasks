CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
);

INSERT INTO people (name, age) VALUES ('Alice', 30);
INSERT INTO people (name, age) VALUES ('Bob', 25);
INSERT INTO people (name, age) VALUES ('Charlie', 35);
INSERT INTO people (name, age) VALUES ('Diana', 28);
INSERT INTO people (name, age) VALUES ('Evan', 40);
