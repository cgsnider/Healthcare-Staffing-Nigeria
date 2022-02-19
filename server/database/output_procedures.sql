
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
	select J.title, J.salary, J.descript, J.slots, J.shifts, F.facname, F.city, F.country, F.state, F.street, F.email
		from JOBPOSTING as J join FACILITY as F where category = i_category or i_category is null;
else 
    call prof_verified_used (null, @id, @verified);
	select J.title, J.salary, J.descript, J.slots from JOBPOSTING where categroy = i_category or i_category is null;
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
else
select * from FACILITY where email = i_email;
end if;

insert into SYSTEMLOG (uid, act) value 
    (@id, 'get_postings');

end //
DELIMITER ;