-- extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Main-tables

CREATE TABLE users(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(256) NOT NULL,
    status int NOT NULL,
    phone VARCHAR(64) NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    price int NOT NULL,
    body text NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    course_id uuid not NULL REFERENCES courses(id),
    teacher_id uuid not NULL REFERENCES users(id)
); 

CREATE TABLE student_groups(
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    group_id uuid not NULL REFERENCES groups(id),
    student_id uuid not NULL REFERENCES users(id)
); 

-- Users-Archive-Trigger

CREATE TABLE archive_users(
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(256) NOT NULL,
    status int NOT NULL,
    phone VARCHAR(64) NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION deleteUser()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN

    INSERT INTO archive_users(id, username, password, status, phone, registered_at) VALUES(OLD.id, OLD.username, OLD.password, OLD.status, OLD.phone, OLD.registered_at);
    RETURN OLD;

END
$$;

CREATE TRIGGER deletedUsersTrigger
AFTER DELETE
ON users
FOR EACH ROW
EXECUTE PROCEDURE deleteUser();

INSERT INTO users(username, password, status, phone) VALUES('abdulhamid98', crypt('954429838', gen_salt('bf')), 1, 954429838);