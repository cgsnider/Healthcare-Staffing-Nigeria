
use cmg_staffing_nigeria;

drop procedure if exists get_postings; 
DELIMITER //
create procedure get_postings (
	in i_email varchar(255),
    in i_category varchar(30)
) begin

select verified from PROFESSIONALS where email = i_email into @verified;

if @verified = 2
then 
	select J.title, J.salary, J.descript, J.slots, F.facname, F.city, F.country, F.state, F.street, F.email from JOBPOSTING as J join FACILITY as F where category = i_category;
else 
	select J.title, J.salary, J.descript, J.slots from JOBPOSTING where categroy = i_category;
end if;

end //
DELIMITER ;