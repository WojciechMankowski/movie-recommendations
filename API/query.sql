CREATE TABLE Users (
     id SERIAL PRIMARY KEY ,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE Movies (
    id SERIAL PRIMARY KEY ,
    title TEXT,
    genresTEXTL,
    original_language TEXT,
    overview TEXT,
    popularity FLOAT,
    production_companies TEXT,
    release_date DATE,
    budget FLOAT,
    revenue FLOAT,
    runtime FLOAT,
    status TEXT,
    tagline TEXT,
    vote_average FLOAT,
    vote_count FLOAT,
    credits TEXT,
    keywords TEXT,
    poster_path TEXT,
    backdrop_path TEXT,
    recommendations TEXT
);

CREATE TABLE UserMovies (
    id SERIAL PRIMARY KEY ,
    user_id UUID REFERENCES Users(id),
    movie_id UUID REFERENCES Movies(id),
    watched BOOLEAN DEFAULT false,
    created_at TIMESTAMP
);