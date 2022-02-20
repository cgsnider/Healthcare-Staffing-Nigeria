drop database if exists cmg_staffing_nigeria;
create database if not exists cmg_staffing_nigeria;
use cmg_staffing_nigeria;
create table PERSON (
  ID int not null AUTO_INCREMENT,
  primary key(ID)
);
create table PROFESSIONAL (
  ID int not null,
  Email varchar(254) not null unique,
  Verified int not null,
  Image longblob,
  FName varchar(55),
  LName varchar(55),
  College varChar(75),
  PhoneNumber varchar(20),
  LicenseNumber varchar(50),
  Specialization varchar(50),
  MDCN varchar(30),
  City varchar(50),
  Country varchar(50),
  Street varchar(75),
  Bio text,
  primary key(ID),
  foreign key (ID) references PERSON(ID)
);

-- create table EDUCATION (
-- 	College varchar(255),
--     Degree char(1),
--     
-- )

create table COVERLETTER (
  OwnerId int not null,
  Title varchar(200),
  Content text not null,
  TimeCreated datetime not null,
  primary key(OwnerId, TimeCreated),
  foreign key (OwnerId) references PROFESSIONAL(ID)
);
create table DOCUMENTS (
  OwnerId int not null,
  FileName varchar(255) not null,
  Content text not null,
  TimeCreated datetime not null,
  primary key(OwnerId, FileName),
  foreign key (OwnerId) references PROFESSIONAL(ID)
);
create table FACILITY (
  ID int not null,
  Email varchar(254) not null unique,
  Verified int not null,
  Image longblob,
  City varchar(50),
  Country varchar(50),
  State varchar(50),
  Street varchar(75),
  Descript text,
  FacName varchar(255),
  primary key(ID),
  foreign key(ID) references PERSON(ID)
);
create table CONTACT (
  FID int not null,
  FName varchar(55),
  LName varchar(55),
  PhoneNumber varchar(20),
  primary key(FID),
  foreign key(FID) references FACILITY(ID)
);
create table JOBPOSTING (
  FID int not null,
  Title varchar(30) not null,
  Category varchar(30) not null,
  Salary int,
  Descript text,
  Slots int not null,
  Shifts varchar(30),
  primary key (FID, Title),
  foreign key (FID) references FACILITY(ID)
);
create table APPLICAITON (
  FID int not null,
  PID int not null,
  PostingTitle varchar(30),
  CoverLetter text,
  TimeCreated datetime not null,
  primary key (PID, FID),
  foreign key (FID, PostingTitle) references JOBPOSTING(FID, Title),
  foreign key (PID) references PROFESSIONAL(ID)
);
create table MESSAGE (
  FID int not null,
  PID int not null,
  Content text not null,
  TimeCreated datetime not null,
  primary key(PID, FID),
  foreign key (FID) references FACILITY(ID),
  foreign key (PID) references PROFESSIONAL(ID)
);
create table SYSTEMLOG (
  UID int not null,
  Act varchar(255),
  TimeCreated datetime default current_timestamp on update current_timestamp,
  foreign key(UID) references PERSON(ID)
);
create table ADMINISTRATOR (ID int not null, primary key (ID));
create table PRIVLEGES (
  AID int not null,
  privilege varchar(10),
  primary key (privilege, AID),
  foreign key (AID) references ADMINISTRATOR(ID)
);
