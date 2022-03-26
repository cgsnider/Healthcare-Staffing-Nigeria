
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
		from JOBPOSTING as J join FACILITY as F on F.ID = J.FID where category = i_category or i_category is null;
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


select J.Title, J.Salary, J.Descript, J.Slots, J.Shifts, J.Category, F.FacName, F.City, F.Country, F.State, F.Street, F.Email, A.Progess, A.TimeCreated
	from JOBPOSTING as J join FACILITY as F on F.ID = J.FID
	inner join APPLICATION as A on J.FID = APPLICATION.FID and J.Title = APPLICATION.PostingTitle 
	where APPLICATION.pid = @id;


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