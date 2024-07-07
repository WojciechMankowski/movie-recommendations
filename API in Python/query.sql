CREATE TABLE users (
     id SERIAL PRIMARY KEY ,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE genres (
    id INTEGER,
    name TEXT,
    id_genres INTEGER
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY ,
    title TEXT,
    original_title TEXT,
    original_language TEXT,
    overview TEXT,
    popularity FLOAT,
    production_companies TEXT,
    release_date DATE,
    runtime FLOAT,
    vote_average FLOAT,
    vote_count FLOAT,
    keywords TEXT,
    poster_path TEXT
);


CREATE TABLE moviegenres(
    id SERIAL PRIMARY KEY ,
    movie_id INTEGER,
    genre_id INTEGER
);


CREATE TABLE usermovies (
    id SERIAL PRIMARY KEY ,
    user_id UUID REFERENCES Users(id),
    movie_id UUID REFERENCES Movies(id),
    watched BOOLEAN DEFAULT false,
    created_at TIMESTAMP
);
