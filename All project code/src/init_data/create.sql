DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    username VARCHAR(50) PRIMARY KEY,
    password	CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS hotels CASCADE;
CREATE TABLE hotels (
    hotelName VARCHAR(255) PRIMARY KEY,
    hotelURL VARCHAR(255),
    username VARCHAR(50) NOT NULL REFERENCES users (username), 
    hotelCity      VARCHAR(50) NOT NULL
);