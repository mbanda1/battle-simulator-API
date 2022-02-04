CREATE TABLE public.attack_strategy
(
    _id SERIAL PRIMARY KEY UNIQUE,
    name character varying(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    --CONSTRAINT account_groups_pkey PRIMARY KEY (id),
    CONSTRAINT  attack_strategy_type_check CHECK 
     (name::text = ANY (ARRAY['random'::character varying, 'weakest'::character varying, 'strongest'::character varying]::text[]))
);
 