
use cmg_staffing_nigeria;

drop procedure if exists register_professional;
DELIMITER //
create procedure register_professional (
	in i_fname varchar(55),
    in i_lname varchar(55),
    in i_email varchar(254)
) begin 

insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into PROFESSIONAL(id, email, verified, fname, lname, phoneNumber, MDCN) value 
	(@id, i_email, 0, i_fname, i_lname, null, null);

insert into SYSTEMLOG (uid, act) value 
    (@id, 'register_professional');
end //
DELIMITER ;

drop procedure if exists update_professional_profile;
DELIMITER //
create procedure update_professional_profile (
	in i_email_old varchar(254),
    in i_fname varchar(55),
    in i_lname varchar(55),
    in i_email varchar(254),
    in i_specialization varchar(50),
    in i_phonenumber varchar(20),
    in i_mdcn varchar(30),
	in i_country varchar(50),
	in i_city varchar(50),
    in i_street varchar(50)
) begin 

select ID from PROFESSIONAL where email = i_email_old into @id;

update PROFESSIONAL 
set 
	email = i_email,
    fname = i_fname,
    lname = i_lname,
    phonenumber = i_phonenumber,
    mdcn = i_mdcn,
    country = i_country,
    city = i_city,
    street = i_street,
    specialization = i_specialization
where 
	id = @id;

insert into SYSTEMLOG (uid, act) value 
    (@id, 'update_professional_profile');
    
select 200;
end //
DELIMITER ;

drop procedure if exists update_professional_picture;
DELIMITER //
CREATE PROCEDURE update_professional_picture (
	IN i_email VARCHAR(255),
    IN i_imgAddr VARCHAR(255)
) BEGIN 
    
	SELECT ID FROM PROFESSIONAL WHERE email = i_email INTO @id;
    
    UPDATE PROFESSIONAL 
    SET
		ImageAddr = i_imgAddr
	WHERE 
		id = @id;
	
	INSERT INTO SYSTEMLOG (uid, act) value 
	(@id, 'update_professional_picture');
    
end //
DELIMITER ;

drop procedure if exists prof_verified_pending;
DELIMITER //
create procedure prof_verified_pending (
    in i_email varchar(254)
) begin 

select id from PROFESSIONAL where email = i_email into @id;

update PROFESSIONAL 
set 
	verified = 1
where 
	id = @id;
insert into SYSTEMLOG (uid, act) value 
    (id, 'prof_verify_pending');
end //
DELIMITER ;

drop procedure if exists update_facility_picture;
DELIMITER //
CREATE PROCEDURE update_facility_picture (
	in i_email VARCHAR(255),
    in i_imgAddr VARCHAR(255)
) BEGIN 
    
	SELECT ID FROM FACILITY WHERE email = i_email INTO @id;
    
    UPDATE FACILITY 
    SET
		ImageAddr = i_imgAddr
	WHERE 
		 id = @id;
	
	INSERT INTO SYSTEMLOG (uid, act) value 
	(@id, 'update_facility_picture');
END //
DELIMITER ;

drop procedure if exists register_facility;
DELIMITER //
create procedure register_facility (
	in i_name varchar(55),
    in i_email varchar(254)
) begin 

insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into FACILITY(id, email, verified,facname) value 
	(@id, i_email, 0, i_name);
    
insert into SYSTEMLOG (uid, act) value 
    (@id, 'register_facility');
    
end //
DELIMITER ;

drop procedure if exists create_job_posting;
DELIMITER //
create procedure create_job_posting (
	in i_fac_email varchar(55),
    in i_title varchar(30), 
    in i_salary int,
    in i_descript text,
    in i_slots int,
    in i_category varchar(30),
    in i_shifts varchar(30)
    
) begin 
	
select id from FACILITY where email = i_fac_email into @id;

insert into JOBPOSTING (fid, title, salary, descript, category, slots, shifts) values
	(@id, i_title, i_salary, i_descript, i_category, i_slots, i_shifts);
	
insert into SYSTEMLOG (uid, act) value 
	(@id, 'create_job_posting');
end //
DELIMITER ;

drop procedure if exists admin_create_facility;
DELIMITER //
create procedure admin_create_facility (
	in i_email varchar(255),
    in i_facname varchar(55),
    in i_verified int,
    in i_city varchar(50),
    in i_country varchar(50),
    in i_state varchar(50),
    in i_street varchar(50),
    in i_descript varchar(255)
) begin 
insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into FACILITY(id, email, verified,facname, city, country, state, street, descript) value 
	(@id, i_email, i_verified, i_facname, i_city, i_country, i_state, i_street, i_descript);
    
insert into SYSTEMLOG (uid, act) value 
    (@id, 'admin_create_facility');
end //
DELIMITER ;

drop procedure if exists admin_create_professional;
DELIMITER //
create procedure admin_create_professional (
    in i_fname varchar(55),
    in i_lname varchar(55),
    in i_email varchar(254),
    in i_verified int,
    in i_licenseNumber varchar(50),
    in i_specialization varchar(50),
    in i_phonenumber varchar(20),
    in i_mdcn varchar(30),
	in i_country varchar(50),
	in i_city varchar(50),
    in i_street varchar(50),
    in i_Bio text
) begin 
insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into PROFESSIONAL
	(id, email, verified, fname, lname,licenseNumber, specialization, phoneNumber, MDCN, country, city, street, Bio) 
value 
	(@id, i_email, i_verified, i_fname, i_lname, i_licenseNumber, i_specialization, i_phonenumber, i_mdcn, i_country, i_city, i_street, i_Bio);

insert into SYSTEMLOG (uid, act) value 
    (@id, 'admin_create_professional');
end //
DELIMITER ;


drop procedure if exists add_education;
DELIMITER //
create procedure add_education (
	in i_email varchar(255),
	in i_college varchar(255),
    in i_degree varchar(20),
    in i_endDate varchar(15),
    in i_startDate varchar(15)
) begin 
	
    select id from PROFESSIONAL where email = i_email into @id;
    
    insert into EDUCATION (PID, College, Degree, EndDate, StartDate) value
		(@id, i_college, i_degree, i_endDate, i_startDate);
        
	insert into SYSTEMLOG (uid, act) value 
		(@id, 'add_education');
	

end //
DELIMITER ;

drop procedure if exists create_application;
DELIMITER //
create procedure create_application (

    in i_fac_email varchar(55),
	in i_email varchar(255),
    in i_title varchar(30), 
    in i_coverletter text,
    in i_timecreated datetime
    
) begin 
	

select id, title from JOBPOSTING as J left join FACILITY as F on F.ID = J.FID 
    where F.email = i_fac_email and J.title = i_title into @fid, @title;

select id from PROFESSIONAL where email = i_email into @pid;

insert into APPLICATION (fid, pid, postingtitle, coverletter, timecreated) VALUES
    (@fid, @pid, @title, i_coverletter, i_timecreated);
	
insert into SYSTEMLOG (uid, act) value 
	(@pid, 'create_application');
end //
DELIMITER ;

drop procedure if exists update_facility_profile;
DELIMITER //
create procedure update_facility_profile (
	in i_Email_Old varchar(255),
    in i_City varchar(55),
    in i_Country varchar(55),
    in i_Email varchar(255),
    in i_FacName varchar(255),
    in i_State varchar(255),
	in i_Descript text,
    in i_Street varchar(255),
    in i_Contact_Name varchar(255),
    in i_Contact_PhoneNumber varchar(255)
) begin 

select ID from FACILITY where email = i_Email_Old into @id;

update Facility 
set 
-- 	email = i_Email,
	FacName = i_FacName,
    country = i_country,
    city = i_city,
    street = i_street,
    State = i_State,
    Descript = i_Descript
where 
	id = @id;

IF (select count(*) FROM CONTACT where FID = @id) != 0
THEN
	update Facility
    set 
		CName = i_Contact_Name,
        PhoneNumber = i_Contact_PhoneNumber
	where
		FID = @id;
ELSE
	insert into CONTACT (FID, CName, PhoneNumber)
		value (@id, i_Contact_Name, i_Contact_PhoneNumber);

END IF;

insert into SYSTEMLOG (uid, act) value 
    (@id, 'update_facility_profile');

select 200;
end //
DELIMITER ;

drop procedure if exists professionals_apply_for_verification;
DELIMITER //
create procedure professionals_apply_for_verification (
	in i_email varchar(255)
) begin 
	

	SELECT id, Verified FROM PROFESSIONAL WHERE Email = i_email into @id, @verified;
	
    IF @verified < 1
    THEN
		UPDATE PROFESSIONAL
		SET
			Verified = 1
		WHERE
			ID = @id;
	END IF;
    
	insert into SYSTEMLOG (uid, act) value 
		(@id, 'create_application');
end //
DELIMITER ;

drop procedure if exists facility_apply_for_verification;
DELIMITER //
create procedure facility_apply_for_verification (
	in i_email varchar(255)
) begin 
	
	SET @pending := 1;
    
	SELECT id, Verified FROM FACILITY WHERE Email = i_email into @id, @verified;
	
    IF @verified < @pending
    THEN
		UPDATE FACILITY
		SET
			Verified = @pending
		WHERE
			ID = @id;
		
        SELECT @pending;
	END IF;
    
    
	insert into SYSTEMLOG (uid, act) value 
		(@id, 'create_application');
end //
DELIMITER ;