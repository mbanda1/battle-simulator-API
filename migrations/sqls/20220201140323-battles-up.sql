CREATE TABLE public.battles
(
    _id SERIAL PRIMARY KEY UNIQUE,
    name character varying(255) NOT NULL,
    active Boolean DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW() ,
  
     UNIQUE(name)
);