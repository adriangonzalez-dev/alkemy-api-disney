create database disney;

use disney;

create table categories(
	id int not null auto_increment primary key,
	name varchar(50) not null
);

create table participations (
	id int not null auto_increment primary key,
	title varchar(100) not null,
	image varchar(250) not null,
	release_date date not null,
	rating int not null,
	category_id int not null,
	foreign key(category_id) references categories(id)
);

create table protagonists (
	id int not null auto_increment primary key,
	name varchar(100) not null,
	image varchar(250) not null,
	age int,
	weight int,
	history varchar(500) not null
);

create table genres(
	id int not null auto_increment primary key,
	name varchar(50) not null
);

create table protagonist_participation(
	id int not null auto_increment primary key,
	protagonist_id int not null,
	participation_id int not null,
	foreign key(protagonist_id) references protagonists(id),
	foreign key(participation_id) references participations(id)
	
);

create table participation_genre(
	id int not null auto_increment primary key,
	participation_id int not null,
	genre_id int not null,
	foreign key(participation_id) references participations(id),
	foreign key(genre_id) references genres(id)
);

insert into categories(name) values 
('Película'),
('Serie');

insert into genres(name) values
('Animación'),
('Musical'),
('Aventura'),
('Comedia romántica'),
('Comedia'),
('Infantil');

create table users (
	id int not null auto_increment primary key,
	username varchar(100) not null,
	email varchar(250) not null,
	pass varchar(100) not null
);
