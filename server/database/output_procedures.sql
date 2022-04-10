
use cmg_staffing_nigeria;

drop procedure if exists get_postings; 
DELIMITER //
create procedure get_postings (
	in i_email varchar(255),
    in i_category varchar(30)
) begin

select verified, id from PROFESSIONAL where email = i_email into @verified, @id;

if @verified = 2
then 
	select J.Title, J.Salary, J.Descript, J.Slots, J.Shifts, J.Category, F.FacName, F.City, F.Country, F.State, F.Street, F.Email
		from JOBPOSTING as J join FACILITY as F join Application as A on F.ID = J.FID and not (A.PostingTitle = J.Title and J.FID = A.FID and A.PID = @id)
        where category = i_category or i_category is null;
else 
	select distinct Title, Salary, Category, Descript, Slots from JOBPOSTING where Category = i_category or i_category is null;
end if;


insert into SYSTEMLOG (uid, act) value 
    (@id, 'get_postings');

end //
DELIMITER ;

drop procedure if exists get_professional_profile; 
DELIMITER //
create procedure get_professional_profile (
	in i_email varchar(255)
) begin


if (select count(*) FROM PROFESSIONAL where email = i_email) != 0
then
select * from PROFESSIONAL where email = i_email;
select id from PROFESSIONAL where email = i_email into @id;
else
select * from FACILITY where email = i_email;
select id from FACILITY where email = i_email into @id;
end if;

insert into SYSTEMLOG (uid, act) value 
    (@id, 'get_profile');

end //
DELIMITER ;

drop procedure if exists get_id; 
DELIMITER //
create procedure get_id (
	in i_email varchar(255),
    out id int
) begin

	
	if (select count(*) FROM PROFESSIONAL where email = i_email) != 0
	then
		select ID from PROFESSIONAL where email = i_email;
	else
		select id from FACILITY where email = i_email into id;
	end if;

end //
DELIMITER ;

drop procedure if exists get_professional_picture; 
DELIMITER //
create procedure get_professional_picture (
	in i_email varchar(255)
) begin

	select ImageAddr from PROFESSIONAL where email = i_email;

end //
DELIMITER ;


drop procedure if exists get_facility_picture; 
DELIMITER //
create procedure get_facility_picture (
	in i_email varchar(255)
) begin

	select ImageAddr from FACILITY where email = i_email;

end //
DELIMITER ;


drop procedure if exists get_posting_categories; 
DELIMITER //
create procedure get_posting_categories (
) begin

    select distinct Category from JOBPOSTING; 
    
end //
DELIMITER ;

drop procedure if exists get_education; 
DELIMITER //
create procedure get_education (
	in i_email varchar(255)
) begin
	
    select id from PROFESSIONAL where email = i_email into @id;
    
    select distinct * from EDUCATION where PID = @id; 
    
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_education');
    
end //
DELIMITER ;

drop procedure if exists user_exists; 
DELIMITER //
create procedure user_exists (
	in i_email varchar(255)
) begin

	if (select count(*) FROM PROFESSIONAL where email = i_email) != 0
		then select 1 as Status;
	elseif (select count(*) FROM FACILITY where email = i_email) != 0
		then select 2 as Status;
	else 
		select -1 as Status;
	end if;

end //
DELIMITER ;



drop procedure if exists get_professional_applications; 
DELIMITER //
create procedure get_professional_applications (
	in i_email varchar(255)
) begin


select id from PROFESSIONAL where email = i_email into @id;


select J.Title, J.Salary, J.Descript, J.Slots, J.Shifts, J.Category, F.FacName, F.City, F.Country, F.State, F.Street, F.Email, A.Progress, A.TimeCreated
	from JOBPOSTING as J join FACILITY as F on F.ID = J.FID
	inner join APPLICATION as A on J.FID = A.FID and J.Title = A.PostingTitle 
	where A.PID = @id;


insert into SYSTEMLOG (uid, act) value 
    (@id, 'get_applications');

end //
DELIMITER ;

drop procedure if exists get_facility_profile; 
DELIMITER //
create procedure get_facility_profile (
	in i_email varchar(255)
) begin
	
	select F.Email, F.Verified, F.ImageAddr, F.City, F.Country, F.State, F.Street, F.Descript, F.FacName, C.CName, C.PhoneNumber
		from FACILITY as F left join CONTACT as C on C.FID = F.ID where email = i_email;

end //
DELIMITER ;

drop procedure if exists get_professionals_pending; 
DELIMITER //
create procedure get_professionals_pending(
	in i_email varchar(255)
) begin
	
    SET @pending := 1;
    
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	select * from PROFESSIONAL where Verified = @pending;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_professionals_pending');
    
end //
DELIMITER ;

drop procedure if exists get_facility_pending; 
DELIMITER //
create procedure get_facility_pending(
	in i_email varchar(255)
) begin
	
    SET @pending := 1;
    
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	select * from FACILITY where Verified = @pending;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_facility_pending');
    
end //
DELIMITER ;


drop procedure if exists get_document_professional; 
DELIMITER //
create procedure get_document_professional(
	in i_email varchar(255),
    in i_cat varchar(255),
    in i_S3Key varchar(255)
) begin
	
    SELECT id FROM PROFESSIONAL WHERE Email = i_email into @id; 
    IF (i_S3Key is null)
		then select FileName, S3Key, Category, TimeCreated from DOCUMENT where OwnerId = @id and Category = UPPER(i_cat);
	ELSE 
		select FileName, S3Key, Category, TimeCreated from DOCUMENT where OwnerId = @id and Category = UPPER(i_cat) and S3Key = i_S3Key ;
    END IF;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_document');
    
end //
DELIMITER ;

drop procedure if exists get_applicants; 
DELIMITER //
create procedure get_applicants(
	in i_email varchar(255),
    in i_posting_title varchar(255)
) begin
	
    SELECT id FROM FACILITY WHERE Email = i_email into @id; 
    
	SELECT P.Email, P.ImageAddr, P.FName, P.LName, P.PhoneNumber, P.LicenseNumber, P.Specialization, P.MDCN, P.City, P.Country, P.Street, P.Bio 
    from APPLICATION as A join Professional as P on A.PID = P.ID where A.FID = @id and A.PostingTitle = i_posting_title;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_applications');
    
end //
DELIMITER ;

drop procedure if exists admin_verification_pending_professional; 
DELIMITER //
create procedure admin_verification_pending_professional(
	in i_email varchar(255)  
) begin
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	SELECT * from PROFESSIONAL where Verified = 1;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'admin_verification_pending_professional');
    
end //
DELIMITER ;

drop procedure if exists admin_verification_pending_facility; 
DELIMITER //
create procedure admin_verification_pending_facility(
	in i_email varchar(255)  
) begin
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	SELECT * from FACILITY where Verified = 1;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'admin_verification_pending_professional');
    
end //
DELIMITER ;

drop procedure if exists admin_bulk_professionals; 
DELIMITER //
create procedure admin_bulk_professionals(
	in i_email varchar(255)  
) begin
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	SELECT * from PROFESSIONAL;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'admin_bulk_professionals');
    
end //
DELIMITER ;

drop procedure if exists admin_bulk_facilities; 
DELIMITER //
create procedure admin_bulk_facilities(
	in i_email varchar(255)  
) begin
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email into @id; 
    
	SELECT * from FACILITY;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'admin_bulk_facilities');
    
end //
DELIMITER ;

drop procedure if exists get_fac_job_postings; 
DELIMITER //
create procedure get_fac_job_postings(
	in i_email varchar(255)  
) begin
	
    SELECT id FROM FACILITY WHERE Email = i_email into @id; 
    
	SELECT * from JOBPOSTING where FID = @id;
    
    insert into SYSTEMLOG (uid, act) value 
		(@id, 'get_fac_job_postings');
    
end //
DELIMITER ;


