create table users(
    id serial primary key,
    password varchar(255) not null
);
create table roles(
    id serial primary key,
    role_name varchar(8) not null
);
create table user_roles(
    user_id int,
    role_id int,
    primary key (user_id, role_id),
    foreign key(user_id) references users(id) on delete cascade,
    foreign key(role_id) references roles(id) on delete cascade
);