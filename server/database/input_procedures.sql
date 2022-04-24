
USE cmg_staffing_nigeria;

DROP PROCEDURE IF EXISTS register_professional;
DELIMITER //
CREATE PROCEDURE register_professional (
	IN i_fname VARCHAR(55),
    IN i_lname VARCHAR(55),
    IN i_email VARCHAR(254)
) BEGIN 

	INSERT INTO PERSON (id) VALUE (null);

	SELECT max(id) FROM PERSON INTO @id;

	INSERT INTO PROFESSIONAL(id, email, verified, fname, lname, phoneNumber, MDCN) VALUE 
		(@id, i_email, 0, i_fname, i_lname, NULL, null);

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'register_professional');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS update_professional_profile;
DELIMITER //
CREATE PROCEDURE update_professional_profile (
	IN i_email_old VARCHAR(254),
    IN i_fname VARCHAR(55),
    IN i_lname VARCHAR(55),
    IN i_email VARCHAR(254),
    IN i_specialization VARCHAR(50),
    IN i_phonenumber VARCHAR(20),
    IN i_mdcn VARCHAR(30),
	IN i_country VARCHAR(50),
	IN i_city VARCHAR(50),
    IN i_street VARCHAR(50),
    IN i_licensenumber VARCHAR(50),
    IN i_bio TEXT
) BEGIN 

	SELECT ID FROM PROFESSIONAL WHERE email = i_email_old INTO @id;

	UPDATE PROFESSIONAL 
	SET 
		Email = i_email,
		FName = i_fname,
		LName = i_lname,
		PhoneNumber = i_phonenumber,
		MDCN = i_mdcn,
		Country = i_country,
		City = i_city,
		Street = i_street,
		Specialization = i_specialization,
		Licensenumber = i_licensenumber,
        Bio = i_bio
	WHERE 
		id = @id;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'update_professional_profile');
		
	SELECT 200;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS update_professional_picture;
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
	
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
	(@id, 'update_professional_picture');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS prof_verified_pending;
DELIMITER //
CREATE PROCEDURE prof_verified_pending (
    IN i_email VARCHAR(254)
) BEGIN 

	SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;

	UPDATE PROFESSIONAL 
	SET 
		verified = 1
	WHERE 
		id = @id;
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(id, 'prof_verify_pending');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS update_facility_picture;
DELIMITER //
CREATE PROCEDURE update_facility_picture (
	IN i_email VARCHAR(255),
    IN i_imgAddr VARCHAR(255)
) BEGIN 
    
	SELECT ID FROM FACILITY WHERE email = i_email INTO @id;
    
    UPDATE FACILITY 
    SET
		ImageAddr = i_imgAddr
	WHERE 
		 id = @id;
	
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
	(@id, 'update_facility_picture');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS register_facility;
DELIMITER //
CREATE PROCEDURE register_facility (
	IN i_name VARCHAR(55),
    IN i_email VARCHAR(254)
) BEGIN 

	INSERT INTO PERSON (id) VALUE (null);

	SELECT max(id) FROM PERSON INTO @id;

	INSERT INTO FACILITY(id, email, verified,facname) VALUE 
		(@id, i_email, 0, i_name);
		
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'register_facility');
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS create_job_posting;
DELIMITER //
CREATE PROCEDURE create_job_posting (
	IN i_fac_email VARCHAR(55),
    IN i_title VARCHAR(30), 
    IN i_salary INT,
    IN i_descript TEXT,
    IN i_slots INT,
    IN i_category VARCHAR(30),
    IN i_shifts VARCHAR(30),
    IN i_visibility INT
    
) BEGIN 
	
	SELECT id FROM FACILITY WHERE email = i_fac_email INTO @id;

	INSERT INTO JOBPOSTING (fid, title, salary, descript, category, slots, shifts, visibility) VALUES
		(@id, i_title, i_salary, i_descript, i_category, i_slots, i_shifts, i_visibility);
		
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'create_job_posting');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_create_facility;
DELIMITER //
CREATE PROCEDURE admin_create_facility (
	IN i_email VARCHAR(255),
    IN i_facname VARCHAR(55),
    IN i_verified INT,
    IN i_city VARCHAR(50),
    IN i_country VARCHAR(50),
    IN i_state VARCHAR(50),
    IN i_street VARCHAR(50),
    IN i_descript VARCHAR(255),
    IN i_image_addr VARCHAR(255)
) BEGIN 
	INSERT INTO PERSON (id) VALUE (null);

	SELECT max(id) FROM PERSON INTO @id;

	INSERT INTO FACILITY(id, email, verified,facname, city, country, STATE, street, descript, ImageAddr) VALUE 
		(@id, i_email, i_verified, i_facname, i_city, i_country, i_state, i_street, i_descript, i_image_addr);
		
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_create_facility');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_create_professional;
DELIMITER //
CREATE PROCEDURE admin_create_professional (
    IN i_fname VARCHAR(55),
    IN i_lname VARCHAR(55),
    IN i_email VARCHAR(254),
    IN i_verified INT,
    IN i_licenseNumber VARCHAR(50),
    IN i_specialization VARCHAR(50),
    IN i_phonenumber VARCHAR(20),
    IN i_mdcn VARCHAR(30),
	IN i_country VARCHAR(50),
	IN i_city VARCHAR(50),
    IN i_street VARCHAR(50),
    IN i_Bio TEXT,
    IN i_imageaddr VARCHAR(255)
) BEGIN 
	INSERT INTO PERSON (id) VALUE (null);

	SELECT max(id) FROM PERSON INTO @id;

	INSERT INTO PROFESSIONAL
		(id, email, verified, fname, lname,licenseNumber, specialization, phoneNumber, MDCN, country, city, street, Bio, ImageAddr) 
	VALUE 
		(@id, i_email, i_verified, i_fname, i_lname, i_licenseNumber, i_specialization, i_phonenumber, i_mdcn, i_country, i_city, i_street, i_Bio, i_imageaddr);

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_create_professional');
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS add_education;
DELIMITER //
CREATE PROCEDURE add_education (
	IN i_email VARCHAR(255),
	IN i_college VARCHAR(255),
    IN i_degree VARCHAR(20),
    IN i_endDate VARCHAR(15),
    IN i_startDate VARCHAR(15)
) BEGIN 
	
    SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;
    
    INSERT INTO EDUCATION (PID, College, DEGREE, EndDate, StartDate) VALUE
		(@id, i_college, i_degree, i_endDate, i_startDate);
        
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'add_education');
	

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS add_experience;
DELIMITER //
CREATE PROCEDURE add_experience (
	IN i_email VARCHAR(255),
	IN i_company_name VARCHAR(255),
    IN i_title VARCHAR(20),
    IN i_endDate VARCHAR(15),
    IN i_startDate VARCHAR(15)
) BEGIN 
	
    SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @id;
    
    INSERT INTO EXPERIENCE (PID, Company, Title, EndDate, StartDate) VALUE
		(@id, i_company_name, i_title, i_endDate, i_startDate);
        
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'add_experience');
	

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS create_application;
DELIMITER //
CREATE PROCEDURE create_application (

    IN i_fac_email VARCHAR(255),
	IN i_email VARCHAR(255),
    IN i_title VARCHAR(30), 
    IN i_coverletter TEXT,
    IN i_timecreated DATETIME
    
) BEGIN 
	

	SELECT id FROM FACILITY WHERE Email = i_fac_email INTO @fid;

	SELECT id FROM PROFESSIONAL WHERE email = i_email INTO @pid;

	INSERT INTO APPLICATION (fid, pid, postingtitle, coverletter, timecreated, progress) VALUES
		(@fid, @pid, i_title, i_coverletter, i_timecreated, 0);
		
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@pid, 'create_application');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS update_facility_profile;
DELIMITER //
CREATE PROCEDURE update_facility_profile (
	IN i_Email_Old VARCHAR(255),
    IN i_City VARCHAR(55),
    IN i_Country VARCHAR(55),
    IN i_Email VARCHAR(255),
    IN i_FacName VARCHAR(255),
    IN i_State VARCHAR(255),
	IN i_Descript TEXT,
    IN i_Street VARCHAR(255),
    IN i_Contact_Name VARCHAR(255),
    IN i_Contact_PhoneNumber VARCHAR(255)
) BEGIN 

	SELECT ID FROM FACILITY WHERE email = i_Email_Old INTO @id;

	UPDATE Facility 
	SET 
	-- 	email = i_Email,
		FacName = i_FacName,
		country = i_country,
		city = i_city,
		street = i_street,
		STATE = i_State,
		Descript = i_Descript
	WHERE 
		id = @id;

	IF (select count(*) FROM CONTACT WHERE FID = @id) != 0
	THEN
		UPDATE CONTACT
		SET 
			CName = i_Contact_Name,
			PhoneNumber = i_Contact_PhoneNumber
		WHERE
			FID = @id;
	ELSE
		INSERT INTO CONTACT (FID, CName, PhoneNumber)
			VALUE (@id, i_Contact_Name, i_Contact_PhoneNumber);

	END IF;

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'update_facility_profile');

	SELECT 200;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS professionals_apply_for_verification;
DELIMITER //
CREATE PROCEDURE professionals_apply_for_verification (
	IN i_email VARCHAR(255)
) BEGIN 
	

	SELECT id, Verified FROM PROFESSIONAL WHERE Email = i_email INTO @id, @verified;
	
    IF @verified < 1
    THEN
		UPDATE PROFESSIONAL
		SET
			Verified = 1
		WHERE
			ID = @id;
	END IF;
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'create_application');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS facility_apply_for_verification;
DELIMITER //
CREATE PROCEDURE facility_apply_for_verification (
	IN i_email VARCHAR(255)
) BEGIN 
	
	SET @pending := 1;
    
	SELECT id, Verified FROM FACILITY WHERE Email = i_email INTO @id, @verified;
	
    IF @verified < @pending
    THEN
		UPDATE FACILITY
		SET
			Verified = @pending
		WHERE
			ID = @id;
		
        SELECT @pending;
	END IF;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'create_application');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_verify_professional;
DELIMITER //
CREATE PROCEDURE admin_verify_professional (
	IN i_admin_email VARCHAR(255),
    IN i_prof_email VARCHAR(255),
    IN i_Message TEXT
) BEGIN 
	
	SET @newStatus := 2;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE PROFESSIONAL
	SET
		Verified = @newStatus,
        AdminMessage = i_Message
	WHERE
		Email = i_prof_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'appprove_verification');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_unverify_professional;
DELIMITER //
CREATE PROCEDURE admin_unverify_professional (
	IN i_admin_email VARCHAR(255),
    IN i_prof_email VARCHAR(255)
) BEGIN 
	
	SET @newStatus := 0;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE PROFESSIONAL
	SET
		Verified = @newStatus,
        AdminMessage = i_Message
	WHERE
		Email = i_prof_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_unverify_professional');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_unverify_facility;
DELIMITER //
CREATE PROCEDURE admin_unverify_facility(
	IN i_admin_email VARCHAR(255),
    IN i_fac_email VARCHAR(255)
) BEGIN 
	
	SET @newStatus := 0;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE FACILITY
	SET
		Verified = @newStatus,
        AdminMessage = i_Message
	WHERE
		Email = i_fac_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_unverify_facility');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_reject_professional;
DELIMITER //
CREATE PROCEDURE admin_reject_professional (
	IN i_admin_email VARCHAR(255),
    IN i_prof_email VARCHAR(255),
    IN i_message TEXT
) BEGIN 
	
	SET @newStatus := 3;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE PROFESSIONAL
	SET
		Verified = @newStatus,
        AdminMessage = i_message
	WHERE
		Email = i_prof_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'reject_verification');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_verify_facility;
DELIMITER //
CREATE PROCEDURE admin_verify_facility (
	IN i_admin_email VARCHAR(255),
    IN i_fac_email VARCHAR(255),
    IN i_message TEXT
) BEGIN 
	
	SET @newStatus := 2;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE FACILITY
	SET
		Verified = @newStatus,
        AdminMessage = i_message
	WHERE
		Email = i_fac_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'appprove_verification');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_reject_facility;
DELIMITER //
CREATE PROCEDURE admin_reject_facility (
	IN i_admin_email VARCHAR(255),
    IN i_fac_email VARCHAR(255),
    IN i_message TEXT
) BEGIN 
	
	SET @newStatus := 3;
    
	SELECT id FROM ADMINISTRATOR WHERE Email = i_admin_email INTO @id;
	
	UPDATE FACILITY
	SET
		Verified = @newStatus,
        AdminMessage = i_message
	WHERE
		Email = i_fac_email;
	
	SELECT @newStatus;
    
    
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'reject_verification');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS admin_create_admin;
DELIMITER //
CREATE PROCEDURE admin_create_admin (
	IN i_email VARCHAR(255)
) BEGIN 
	    
	INSERT INTO PERSON (id) VALUE (null);

	SELECT max(id) FROM PERSON INTO @id;

	INSERT INTO ADMINISTRATOR (id, Email) VALUE (@id, i_email);

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'admin_create_admin');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS hire_applicant;
DELIMITER //
CREATE PROCEDURE hire_applicant (
	IN i_fac_email VARCHAR(255),
    IN i_prof_email VARCHAR(255),
    IN i_title VARCHAR(255)
) BEGIN 
	    
	SELECT id FROM PROFESSIONAL WHERE i_prof_email = Email INTO @pid;
	SELECT id FROM FACILITY WHERE i_fac_email = Email INTO @fid;
	
	UPDATE APPLICATION 
    SET
		Progress = 100
	WHERE 
		FID = @fid 
        AND PID = @pid
        AND PostingTitle = i_title;
        

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@fid, 'hire_applicant');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS add_document_professional;
DELIMITER //
CREATE PROCEDURE add_document_professional (
	IN i_owner_email VARCHAR(255),
    IN i_category VARCHAR(255),
    IN i_S3_key VARCHAR(255),
    IN i_file_name VARCHAR(255)
) BEGIN 
	    
	SELECT id FROM PROFESSIONAL WHERE i_owner_email = Email INTO @pid;
    
    IF UPPER(i_category) = 'RESUME'
		THEN UPDATE PROFESSIONAL 
				SET ResumeExists = TRUE
                WHERE ID = @id;
	END IF;
	
	INSERT INTO Document (OwnerId, Category, S3Key, FileName, TimeCreated)
		VALUE (@pid, UPPER(i_category), i_S3_key, i_file_name, CURDATE());

	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@pid, 'hire_applicant');
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS update_posting;
DELIMITER //
CREATE PROCEDURE update_posting (
	IN i_email VARCHAR(55),
    IN i_old_title VARCHAR(30), 
    IN i_new_title VARCHAR(30),
    IN i_salary INT,
    IN i_descript TEXT,
    IN i_slots INT,
    IN i_category VARCHAR(30),
    IN i_shifts VARCHAR(30),
    IN i_visibility INT
) BEGIN 
	
	SELECT id FROM FACILITY WHERE Email = i_email INTO @id;
	
	UPDATE JOBPOSTING
	SET
		  Title = i_new_title,
		  Category = i_category,
		  Salary = i_salary,
		  Descript = i_descript,
		  Slots = i_slots,
		  Shifts = i_shifts,
          Visibility = i_visibility
	WHERE
		FID = @id AND Title = i_old_title;
	
	INSERT INTO SYSTEMLOG (uid, act) VALUE 
		(@id, 'update_posting');
END //
DELIMITER ;
