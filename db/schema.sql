

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  likes INTEGER,
  comments INTEGER
  
  
);

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  artistName VARCHAR (255),
  collectionName VARCHAR(255),
  artworkUrl100 VARCHAR(255),
  collectionViewUrl VARCHAR(255)
  
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
  id BIGSERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums(id),
  comment VARCHAR(255),
  user_id VARCHAR REFERENCES users(email)

);
