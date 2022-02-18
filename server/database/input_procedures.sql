
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

insert into PROFESSIONAL(id, email, verified, fname, lname, college, phoneNumber, MDCN) value 
	(@id, i_email, -1, i_fname, i_lname, null, null, null);

insert into SYSTEMLOG (uid, act) value 
    (id, 'register_professional');
end //
DELIMITER ;

drop procedure if exists update_professional_profile;
DELIMITER //
create procedure update_professional_profile (
	in i_email_old varchar(254),
    in i_fname varchar(55),
    in i_lname varchar(55),
    in i_email varchar(254),
    in i_college varchar(75),
    in i_phonenumber varchar(20),
    in i_mdcn varchar(30)
) begin 

select id from professional where email = i_email_old into @id;

update PROFESSIONAL 
set 
	email = i_email,
    fname = i_fname,
    lname = i_lname,
    college = i_college,
    phonenumber = i_phonenumber,
    mdcn = i_mdcn,
    verified = 0
where 
	id = @id;

insert into SYSTEMLOG (uid, act) value 
    (id, 'update_professional_profile');
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

drop procedure if exists register_facility;
DELIMITER //
create procedure register_facility (
	in i_name varchar(55),
    in i_email varchar(254)
) begin 

insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into FACILITY(id, email, verified,facname) value 
	(@id, i_email, -1, i_name);
    
insert into SYSTEMLOG (uid, act) value 
    (@id, 'register_facility');
    
end //
DELIMITER ;

drop procedure if exists create_job_posting;
DELIMITER //
create procedure create_job_posting (
	in i_fac_email varchar(55),
    in title varchar(30), 
    in salary int,
    in descript text,
    in slots int
) begin 
	
select id from FACILTIY where email = i_fac_email into @id;

insert into JOBPOSTING (fid, title, salary, descript, slots) values
	(@id, title, salary, descript, slots);
	
insert into SYSTEMLOG (uid, act) value 
	(@id, 'create_job_posting');
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
    in i_category varchar(30)
) begin 
	
select id from FACILITY where email = i_fac_email into @id;

insert into JOBPOSTING (fid, title, salary, descript, slots, category) values
	(@id, i_title, i_salary, i_descript, i_slots, i_category);
	
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
    in i_college varchar(75),
    in i_phonenumber varchar(20),
    in i_mdcn varchar(30),
    in i_verified int
    
) begin 
insert into PERSON (id) value (null);

select max(id) from PERSON into @id;

insert into PROFESSIONAL(id, email, verified, fname, lname, college, phoneNumber, MDCN) value 
	(@id, i_email, i_verified, i_fname, i_lname, i_college, i_phonenumber, i_mdcn);
    
insert into SYSTEMLOG (uid, act) value 
    (@id, 'admin_create_professional');
end //
DELIMITER ;
