
USE cmg_staffing_nigeria;

DROP PROCEDURE IF EXISTS get_postings; 
DELIMITER //
CREATE PROCEDURE get_postings (
	IN i_email varchar(255),
    IN i_category varchar(30)
) BEGIN

SELECT verified, id FROM PROFESSIONAL WHERE email = i_email INTO @verified, @id;

IF @verified = 2
THEN 
	SELECT J.Title, J.Salary, J.Descript, J.Slots, J.Shifts, J.Category, F.FacName, F.City, F.Country, F.State, F.Street, F.Email, F.ImageAddr
		FROM JOBPOSTING AS J JOIN FACILITY AS F JOIN Application AS A ON F.ID = J.FID AND NOT (A.PostingTitle = J.Title AND J.FID = A.FID AND A.PID = @id)
        WHERE category = i_category OR i_category IS NULL;
ELSE 
	SELECT DISTINCT Title, Salary, Category, Descript, Slots FROM JOBPOSTING WHERE Category = i_category OR i_category IS NULL;
END IF;


INSERT INTO SYSTEMLOG (uid, act) VALUE 
    (@id, 'get_postings');

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_professional_profile; 
DELIMITER //
CREATE PROCEDURE get_professional_profile (
	IN i_email varchar(255)
) BEGIN


IF (select count(*) FROM PROFESSIONAL WHERE email = i_email) != 0
THEN
SELECT * FROM PROFESSIONAL WHERE email = i_email;
SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;
ELSE
SELECT * FROM FACILITY WHERE email = i_email;
SELECT id FROM FACILITY WHERE email = i_email INTO @id;
END IF;

INSERT INTO SYSTEMLOG (uid, act) VALUE 
    (@id, 'get_profile');

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_id; 
DELIMITER //
CREATE PROCEDURE get_id (
	IN i_email varchar(255),
    OUT id INT
) BEGIN

	
	IF (select count(*) FROM PROFESSIONAL WHERE email = i_email) != 0
	THEN
		SELECT ID FROM PROFESSIONAL WHERE email = i_email;
	ELSE
		SELECT id FROM FACILITY WHERE email = i_email INTO id;
	END IF;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_professional_picture; 
DELIMITER //
CREATE PROCEDURE get_professional_picture (
	IN i_email varchar(255)
) BEGIN

	SELECT ImageAddr FROM PROFESSIONAL WHERE email = i_email;

END //
DELIMITER ;


DROP PROCEDURE IF EXISTS get_facility_picture; 
DELIMITER //
CREATE PROCEDURE get_facility_picture (
	IN i_email varchar(255)
) BEGIN

	SELECT ImageAddr FROM FACILITY WHERE email = i_email;

END //
DELIMITER ;


DROP PROCEDURE IF EXISTS get_posting_categories; 
DELIMITER //
CREATE PROCEDURE get_posting_categories (
) BEGIN

    SELECT DISTINCT Category FROM JOBPOSTING; 
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_education; 
DELIMITER //
CREATE PROCEDURE get_education (
	IN i_email varchar(255)
) BEGIN
	
    SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;
    
    SELECT DISTINCT * FROM EDUCATION WHERE PID = @id; 
    
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_education');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_experience; 
DELIMITER //
CREATE PROCEDURE get_experience (
	IN i_email varchar(255)
) BEGIN
	
    SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;
    
    SELECT DISTINCT * FROM EXPERIENCE WHERE PID = @id; 
    
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_education');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS user_exists; 
DELIMITER //
CREATE PROCEDURE user_exists (
	IN i_email varchar(255)
) BEGIN

	IF (select count(*) FROM PROFESSIONAL WHERE email = i_email) != 0
		THEN SELECT 1 AS Exist_Status;
	ELSEIF (select count(*) FROM FACILITY WHERE email = i_email) != 0
		THEN SELECT 2 AS Exist_Status;
	ELSEIF (select count(*) FROM ADMINISTRATOR WHERE email = i_email) != 0
		THEN SELECT 3 AS Exist_Status;
	ELSE
		SELECT -1 AS Exist_Status;
	END IF;

END //
DELIMITER ;



DROP PROCEDURE IF EXISTS get_professional_applications; 
DELIMITER //
CREATE PROCEDURE get_professional_applications (
	IN i_email varchar(255)
) BEGIN


SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;


SELECT J.Title, J.Salary, J.Descript, J.Slots, J.Shifts, J.Category, F.FacName, F.City, F.Country, F.State, F.Street, F.Email, A.Progress, A.TimeCreated
	FROM JOBPOSTING AS J JOIN FACILITY AS F ON F.ID = J.FID
	INNER JOIN APPLICATION AS A ON J.FID = A.FID AND J.Title = A.PostingTitle 
	WHERE A.PID = @id;


INSERT INTO SYSTEMLOG (uid, act) VALUE 
    (@id, 'get_applications');

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_view_hirings; 
DELIMITER //
CREATE PROCEDURE admin_view_hirings (
	IN i_email varchar(255)
) BEGIN

SET @hired_progress = 100;

SELECT id FROM ADMINISTRATOR WHERE email = i_email INTO @id;


SELECT J.Title, J.Category, 
	F.FacName, F.Email as FacEmail, 
	A.TimeCreated,
    P.Email as ProfEmail, P.FName, P.LName
		FROM JOBPOSTING AS J JOIN FACILITY AS F ON F.ID = J.FID 
		INNER JOIN APPLICATION AS A ON J.FID = A.FID AND J.Title = A.PostingTitle 
		JOIN PROFESSIONAL AS P ON P.ID = A.PID
		WHERE A.Progress = @hired_progress;


INSERT INTO SYSTEMLOG (uid, act) VALUE 
    (@id, 'get_applications');

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_facility_profile; 
DELIMITER //
CREATE PROCEDURE get_facility_profile (
	IN i_email varchar(255)
) BEGIN
	
	SELECT F.Email, F.Verified, F.ImageAddr, F.City, F.Country, F.State, F.Street, F.Descript, F.FacName, F.AdminMessage,
		C.CName, C.PhoneNumber
			FROM FACILITY AS F LEFT JOIN CONTACT AS C ON C.FID = F.ID WHERE email = i_email;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_professionals_pending; 
DELIMITER //
CREATE PROCEDURE get_professionals_pending(
	IN i_email varchar(255)
) BEGIN
	
    SET @pending := 1;
    
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT * FROM PROFESSIONAL WHERE Verified = @pending;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_professionals_pending');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_facility_pending; 
DELIMITER //
CREATE PROCEDURE get_facility_pending(
	IN i_email varchar(255)
) BEGIN
	
    SET @pending := 1;
    
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT F.*, C.PhoneNumber FROM FACILITY AS F JOIN CONTACT AS C ON C.FID = F.ID WHERE Verified = @pending;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_facility_pending');
    
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS get_document_professional; 
DELIMITER //
CREATE PROCEDURE get_document_professional(
	IN i_email varchar(255),
    IN i_cat varchar(255),
    IN i_S3Key varchar(255)
) BEGIN
	
    SELECT id FROM PROFESSIONAL WHERE Email = i_email INTO @id; 
    IF (i_S3Key IS null)
		THEN SELECT FileName, S3Key, Category, TimeCreated FROM DOCUMENT WHERE OwnerId = @id AND Category = UPPER(i_cat);
	ELSE 
		SELECT FileName, S3Key, Category, TimeCreated FROM DOCUMENT WHERE OwnerId = @id AND Category = UPPER(i_cat) AND S3Key = i_S3Key ;
    END IF;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_document');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_applicants; 
DELIMITER //
CREATE PROCEDURE get_applicants(
	IN i_email varchar(255),
    IN i_posting_title varchar(255)
) BEGIN
	
    SELECT id FROM FACILITY WHERE Email = i_email INTO @id; 
    
	SELECT P.Email, P.ImageAddr, P.FName, P.LName, P.PhoneNumber, P.LicenseNumber, P.Specialization, P.MDCN, P.City, P.Country, P.Street, P.Bio, 
		A.Progress, A.CoverLetter
			FROM APPLICATION AS A JOIN Professional AS P ON A.PID = P.ID WHERE A.FID = @id AND A.PostingTitle = i_posting_title;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_applications');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_verification_pending_professional; 
DELIMITER //
CREATE PROCEDURE admin_verification_pending_professional(
	IN i_email varchar(255)  
) BEGIN
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT * FROM PROFESSIONAL WHERE Verified = 1;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_verification_pending_professional');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_verification_pending_facility; 
DELIMITER //
CREATE PROCEDURE admin_verification_pending_facility(
	IN i_email varchar(255)  
) BEGIN
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT F.*, C.PhoneNumber, C.CName FROM FACILITY as F LEFT JOIN CONTACT AS C ON C.FID = F.ID WHERE Verified = 1;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_verification_pending_professional');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_bulk_professionals; 
DELIMITER //
CREATE PROCEDURE admin_bulk_professionals(
	IN i_email varchar(255)  
) BEGIN
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT * FROM PROFESSIONAL;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_bulk_professionals');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_bulk_facilities; 
DELIMITER //
CREATE PROCEDURE admin_bulk_facilities(
	IN i_email varchar(255)  
) BEGIN
	
    SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id; 
    
	SELECT F.*, C.PhoneNumber FROM FACILITY as F JOIN CONTACT AS C ON C.FID = F.ID;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_bulk_facilities');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_fac_job_postings; 
DELIMITER //
CREATE PROCEDURE get_fac_job_postings(
	IN i_email varchar(255)  
) BEGIN
	
    SELECT id FROM FACILITY WHERE Email = i_email INTO @id; 
    
	SELECT Title, Category, Salary, Descript, Slots, Shifts FROM JOBPOSTING WHERE FID = @id;
    
    INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'get_fac_job_postings');
    
END //
DELIMITER ;



