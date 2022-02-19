
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
		from JOBPOSTING as J join FACILITY as F where category = i_category or i_category is null;
else 
    call prof_verified_used (null, @id, @verified);
	select distinct J.title, J.salary, J.Category, J.descript, J.slots from JOBPOSTING where categroy = i_category or i_category is null;
end if;


insert into SYSTEMLOG (uid, act) value 
    (@id, 'get_postings');

end //
DELIMITER ;

drop procedure if exists get_profile; 
DELIMITER //
create procedure get_profile (
	in i_email varchar(255)
) begin

call verified_used (i_email, null, null);

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

drop procedure if exists get_posting_categories; 
DELIMITER //
create procedure get_posting_categories (
) begin

    select distinct Category from JOBPOSTING; 
    
end //
DELIMITER ;

