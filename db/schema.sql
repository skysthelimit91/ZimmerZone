\c Zimmer

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  likes INTEGER
  
);