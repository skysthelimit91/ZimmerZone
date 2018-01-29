DROP DATABASE IF EXISTS Zimmer;

CREATE DATABASE Zimmer;



\c Zimmer

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  likes INTEGER
  
);

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  artistName VARCHAR (255),
  collectionName VARCHAR(255),
  artworkUrl100 VARCHAR(255),
  collectionViewUrl VARCHAR(255)
  
);
