create table users(
    id varchar(16) primary key,
    password varchar(255) not null default '$2b$10$/4xJti7hOZ0UEH/WdLO.WuD9zY2f98heGaoL/mkDRFRJQMunSqC/u',
    nickname varchar(16) not null default 'Daniel',
    role_id int not null default 1
);
create table roles(
    id serial primary key,
    role_name varchar(8) not null default 'coder'
);
-- create table user_roles(
--     user_id varchar(16),
--     role_id int,
--     primary key (user_id, role_id),
--     foreign key(user_id) references users(id) on delete cascade,
--     foreign key(role_id) references roles(id) on delete cascade
-- );