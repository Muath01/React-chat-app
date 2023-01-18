CREATE DATABASE chat_app


CREATE TABLE user(
    user_id SERIAL PRIMARY KEY
    first_name VARCHAR(25) NOT NULL;
    second_name VARCHAR(25) NOT NULL;
    user_name VARCHAR(12) NOT NULL;
    friends INTEGER[] REFRENCES super_user(id)
    
)