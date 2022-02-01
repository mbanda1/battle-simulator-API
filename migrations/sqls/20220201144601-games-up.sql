CREATE TABLE public.games
(
    _id SERIAL PRIMARY KEY UNIQUE,
    name character varying(255) NOT NULL UNIQUE,
    units int not null,
    check(units >= 80 and units <= 100),
    battleId bigint NOT NULL,
    attackStrategyId bigint NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() ,
   
     UNIQUE(name, battleId),

      --CONSTRAINT subject_pkey PRIMARY KEY (id),
    CONSTRAINT battle_id_foreign FOREIGN KEY (battleId)
        REFERENCES public.battles (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

     CONSTRAINT attack_str_id_foreign FOREIGN KEY (attackStrategyId)
        REFERENCES public.attack_strategy (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);