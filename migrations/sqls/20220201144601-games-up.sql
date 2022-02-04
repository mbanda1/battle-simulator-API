CREATE TABLE public.games
(
    _id SERIAL PRIMARY KEY UNIQUE,
    results VARCHAR,  
    created_at TIMESTAMPTZ DEFAULT NOW()
    
);