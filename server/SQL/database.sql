CREATE DATABASE chat_app


CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    second_name VARCHAR(25) NOT NULL,
    user_name VARCHAR(12) NOT NULL,
    
)

CREATE TABLE super_user_friends (
    user_id INTEGER REFERENCES super_user(user_id),
    friend_id INTEGER REFERENCES super_user(user_id),
    PRIMARY KEY (user_id, friend_id)
);
