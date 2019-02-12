DROP DATABASE IF EXISTS cost_db_test;

CREATE DATABASE cost_db_test;
USE cost_db_test;

CREATE TABLE cost (
id INTEGER(11) NOT NULL AUTO_INCREMENT,
city VARCHAR(255) NOT NULL,
state VARCHAR(255) NOT NULL,
country VARCHAR(255) NOT NULL,
cli_including_rent DECIMAL(10,2) NOT NULL,
cli DECIMAL(10,2) NOT NULL,

PRIMARY KEY (id)
);

CREATE TABLE college (
id INTEGER(11) NOT NULL AUTO_INCREMENT,
major VARCHAR(255) NOT NULL,
starting_salary DECIMAL(10,2) NOT NULL,
mid_career_salary DECIMAL(10,2) NOT NULL,

PRIMARY KEY (id)
);


SELECT * FROM cost;
SELECT * FROM college;

INSERT INTO cost (city, state, country, cli_including_rent, cli) VALUES ("Charlotte", "NC", "USA", 0.763, 0.84);
INSERT INTO cost (city, state, country, cli_including_rent, cli) VALUES ("Raleigh", "NC", "USA", 0.563, 0.64);

INSERT INTO college (major, starting_salary, mid_career_salary) VALUES ("Spanish", 34000, 49032);
INSERT INTO college (major, starting_salary, mid_career_salary) VALUES ("Engineer", 63540, 88372);