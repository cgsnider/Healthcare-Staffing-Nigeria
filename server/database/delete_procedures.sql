USE cmg_staffing_nigeria;

DROP PROCEDURE IF EXISTS delete_professional;
DELIMITER //
CREATE PROCEDURE delete_professional (
	IN i_email VARCHAR(255)
) BEGIN 

	SELECT id FROM PROFESSIONAL WHERE Email = i_email INTO @id;

	DELETE FROM PERSON WHERE ID = @id;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_professional');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_facility;
DELIMITER //
CREATE PROCEDURE delete_facility (
	IN i_email VARCHAR(255)
) BEGIN 

	SELECT id FROM FACILITY WHERE Email = i_email INTO @id;

	DELETE FROM PERSON WHERE ID = @id;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_facility');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_education;
DELIMITER //
CREATE PROCEDURE delete_education (
	IN i_email VARCHAR(255),
    IN i_college VARCHAR(255),
	IN i_degree VARCHAR(20),
	IN i_startdate VARCHAR(15),
	IN i_enddate VARCHAR(15)
) BEGIN 

	SELECT id FROM PROFESSIONAL WHERE Email = i_email INTO @id;

	DELETE FROM EDUCATION 
		WHERE PID = @id AND College = i_college AND Degree = i_degree 
			AND StartDate = i_startdate AND EndDate = i_enddate;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_education');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_experience;
DELIMITER //
CREATE PROCEDURE delete_experience (
	IN i_email VARCHAR(255),
    IN i_company VARCHAR(255),
	IN i_title VARCHAR(255),
	IN i_startdate VARCHAR(15),
	IN i_enddate VARCHAR(15)
) BEGIN 

	SELECT id FROM PROFESSIONAL WHERE Email = i_email INTO @id;

	DELETE FROM EXPERIENCE 
		WHERE PID = @id AND Company = i_company AND Title = i_title 
        AND StartDate = i_startdate AND EndDate = i_enddate;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_education');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_document;
DELIMITER //
CREATE PROCEDURE delete_document (
	IN i_email VARCHAR(255),
    IN i_category VARCHAR(255),
    IN i_s3key VARCHAR(255)
) BEGIN 

	SELECT IFNULL((SELECT id FROM PROFESSIONAL WHERE Email = i_email), (SELECT id FROM FACILITY WHERE Email = i_email)) 
        INTO @id;
        
	SELECT S3Key FROM DOCUMENT 
		WHERE 
			OwnerID = @id
            AND (S3Key = i_s3key OR i_s3key is NULL)
            AND (Category = i_category OR i_category is NULL);
            
	UPDATE PROFESSIONAL
		SET
			S3Key = null
		WHERE
			ID = @id;
		
	UPDATE FACILITY
		SET
			S3Key = null
		WHERE
			ID = @id;
    
	DELETE FROM DOCUMENT 
		WHERE OwnerId = @id 
			AND (S3Key = i_s3key OR i_s3key is NULL)
            AND (Category = i_category OR i_category is NULL);

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_document');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_contact;
DELIMITER //
CREATE PROCEDURE delete_contact (
	IN i_email VARCHAR(255)
) BEGIN 

	SELECT id FROM FACILITY WHERE Email = i_email INTO @id;

	DELETE FROM CONTACT 
		WHERE FID = @id;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_contact');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_job_posting;
DELIMITER //
CREATE PROCEDURE delete_job_posting (
	IN i_email VARCHAR(255),
    IN i_title VARCHAR(30)
) BEGIN 

	SELECT id FROM FACILITY WHERE Email = i_email INTO @id;

	DELETE FROM JOBPOSTING
		WHERE FID = @id AND Title = i_title;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_job_posting');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_application;
DELIMITER //
CREATE PROCEDURE delete_application (
	IN i_fac_email VARCHAR(255),
    IN i_prof_email VARCHAR(255),
    IN i_title VARCHAR(30)
) BEGIN 

	SELECT id FROM FACILITY WHERE Email = i_fac_email INTO @fid;
    SELECT id FROM PROFESSIONAL WHERE Email = i_prof_email INTO @pid;

	DELETE FROM APPLICATION
		WHERE FID = @fid AND Title = i_title AND PID = @pid;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_application');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_administrator;
DELIMITER //
CREATE PROCEDURE delete_administrator (
	IN i_email VARCHAR(255)
) BEGIN 

	SELECT id FROM ADMINISTRATOR WHERE Email = i_email INTO @id;

	DELETE FROM PERSON WHERE ID = @id;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'delete_administrator');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_delete_professional;
DELIMITER //
CREATE PROCEDURE admin_delete_professional (
	IN i_admin_email VARCHAR(255),
    IN i_prof_email VARCHAR(255)
) BEGIN 
	
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @aid;
	SELECT id FROM PROFESSIONAL WHERE Email = i_prof_email INTO @pid;

	DELETE FROM PERSON WHERE ID = @pid;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@aid, 'admin_delete_professional');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_delete_facility;
DELIMITER //
CREATE PROCEDURE admin_delete_facility (
	IN i_admin_email VARCHAR(255),
    IN i_fac_email VARCHAR(255)
) BEGIN 

	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @aid;
	SELECT id FROM FACILITY WHERE Email = i_fac_email INTO @fid;

	DELETE FROM PERSON WHERE ID = @fid;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@aid, 'admin_delete_facility');
END //
DELIMITER ;

