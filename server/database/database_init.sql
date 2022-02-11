
drop database if exists cmg_staffing_nigeria;
create database if not exists cmg_staffing_nigeria;
use cmg_staffing_nigeria;

create table PROFESSIONAL (
	IdNumber int not null,
    Email varchar(254) not null,
    Verified int not null,
    Image longblob,
    FName varchar(55),
    LName varchar(55),
    College varChar(75),
    PhoneNumber varchar(20),
    MDCN varchar(30),
    primary key(IdNumber)
);

create table COVERLETTER (
	OwnerId int not null,
    Title varchar(200),
    Content text not null,
    TimeCreated datetime not null,
    primary key(OwnerId),
    foreign key (OwnerId) references PROFESSIONAL(IdNumber)
);

create table DOCUMENTS (
	OwnerId int not null,
    FileName varchar(255) not null,
    Content text not null,
    TimeCreated datetime not null,
    primary key(OwnerId),
    foreign key (OwnerId) references PROFESSIONAL(IdNumber)
);
