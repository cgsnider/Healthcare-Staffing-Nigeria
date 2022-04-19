DROP DATABASE IF EXISTS cmg_staffing_nigeria;
CREATE DATABASE IF NOT EXISTS cmg_staffing_nigeria;
USE cmg_staffing_nigeria;
CREATE TABLE PERSON (
  ID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(ID)
);
CREATE TABLE PROFESSIONAL (
  ID INT NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Verified INT NOT NULL,
  ImageAddr VARCHAR(255),
  FName VARCHAR(55),
  LName VARCHAR(55),
  PhoneNumber VARCHAR(20),
  LicenseNumber VARCHAR(50),
  Specialization VARCHAR(50),
  MDCN VARCHAR(30),
  City VARCHAR(50),
  Country VARCHAR(50),
  Street VARCHAR(75),
  Bio TEXT,
  AdminMessage TEXT,
  ResumeExists BOOL DEFAULT FALSE,
  PRIMARY KEY(ID),
  FOREIGN KEY (ID) 
	REFERENCES PERSON(ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE EDUCATION (
  PID INT NOT NULL,
  College VARCHAR(255),
  Degree VARCHAR(20),
  StartDate VARCHAR(15),
  EndDate VARCHAR(15),
  PRIMARY KEY(PID, College, Degree, StartDate, EndDate),
  FOREIGN KEY(PID) 
	REFERENCES PROFESSIONAL(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE EXPERIENCE (
  PID INT NOT NULL,
  Company VARCHAR(255),
  Title VARCHAR(20),
  StartDate VARCHAR(15),
  EndDate VARCHAR(15),
  PRIMARY KEY(PID, Company, Title, StartDate, EndDate),
  FOREIGN KEY(PID) 
	REFERENCES PROFESSIONAL(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- Never Used?
-- CREATE TABLE COVERLETTER (
--   OwnerId INT NOT NULL,
--   Title VARCHAR(200),
--   Content TEXT NOT NULL,
--  TimeCreated DATETIME NOT NULL,
--   PRIMARY KEY(OwnerId,TimeCreated),
--   FOREIGN KEY (OwnerId) 
-- 	REFERENCES PROFESSIONAL(ID)
-- 	ON DELETE CASCADE
--     ON UPDATE CASCADE
-- );
CREATE TABLE DOCUMENT (
  OwnerId INT NOT NULL,
  FileName VARCHAR(255) NOT NULL,
  S3KEY VARCHAR(255) NOT NULL,
  Category VARCHAR(255) NOT NULL,
  TimeCreated DATETIME NOT NULL,
  PRIMARY KEY(OwnerId, S3KEY),
  FOREIGN KEY (OwnerId) 
	REFERENCES PROFESSIONAL(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE FACILITY (
  ID INT NOT NULL,
  Email VARCHAR(254) NOT NULL UNIQUE,
  Verified INT NOT NULL,
  ImageAddr VARCHAR(255),
  City VARCHAR(50),
  Country VARCHAR(50),
  STATE VARCHAR(50),
  Street VARCHAR(75),
  Descript TEXT,
  FacName VARCHAR(255),
  AdminMessage TEXT,
  PRIMARY KEY(ID),
  FOREIGN KEY(ID) 
	REFERENCES PERSON(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE CONTACT (
  FID INT NOT NULL,
  CName VARCHAR(255),
  PhoneNumber VARCHAR(20),
  PRIMARY KEY(FID),
  FOREIGN KEY(FID) 
	REFERENCES FACILITY(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE JOBPOSTING (
  FID INT NOT NULL,
  Title VARCHAR(30) NOT NULL,
  Category VARCHAR(30) NOT NULL,
  Salary INT,
  Descript TEXT,
  Slots INT NOT NULL,
  Shifts VARCHAR(30),
  Visibility INT,
  PRIMARY KEY (FID, Title),
  FOREIGN KEY (FID) 
	REFERENCES FACILITY(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE APPLICATION (
  FID INT NOT NULL,
  PID INT NOT NULL,
  PostingTitle VARCHAR(30) NOT NULL,
  CoverLetter TEXT,
  TimeCreated DATETIME NOT NULL,
  Progress INT,
  PRIMARY KEY (PID, FID, PostingTitle),
  FOREIGN KEY (FID, PostingTitle) 
	REFERENCES JOBPOSTING(FID, Title)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PID) 
	REFERENCES PROFESSIONAL(ID)
	ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE MESSAGE (
  FID INT NOT NULL,
  PID INT NOT NULL,
  Content TEXT NOT NULL,
  TimeCreated DATETIME NOT NULL,
  PRIMARY KEY(PID, FID),
  FOREIGN KEY (FID) 
	REFERENCES FACILITY(ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PID) 
	REFERENCES PROFESSIONAL(ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE SYSTEMLOG (
	Counter INT NOT NULL AUTO_INCREMENT,
	UID INT NOT NULL,
	Act VARCHAR(255),
	TimeCreated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(Counter, UID, Act, TimeCreated)
);
CREATE TABLE ADMINISTRATOR (
	ID INT NOT NULL, 
	Email VARCHAR(255),
	PRIMARY KEY (ID)
);
-- Never Used
-- CREATE TABLE PRIVLEGES (
--   AID INT NOT NULL,
--   privilege VARCHAR(10),
--   PRIMARY KEY (privilege, AID),
--   FOREIGN KEY (AID) 
-- 	REFERENCES ADMINISTRATOR(ID)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE
-- );
