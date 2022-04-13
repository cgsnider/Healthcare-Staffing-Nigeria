
USE cmg_staffing_nigeria;

CALL admin_create_facility('NigerianHospital@hosp.org', 'Nigerian Hospital', 2, 'Lagos', 'Nigeria', 'Lagos', '123 Street', 'A Nigerian Hopsital');
CALL admin_create_facility('MemorialHospital@hosp.org', 'Memorial Hospital', 2, 'Kano', 'Nigeria', 'Kano', '123 Street', 'A Memorial Hopsital');
CALL admin_create_facility('GeneralHospital@hosp.org', 'Nigerian Hospital', 2, 'Ibadan', 'Nigeria', 'Oyo', '123 Street', 'A General Hopsital');

CALL create_job_posting('NigerianHospital@hosp.org', 'Cardiologist', 30000, 'Head of the cardiology department', 1, 'Cardiology', '9 Hr', 1);
CALL create_job_posting('NigerianHospital@hosp.org', 'Gen Surgeon', 15000, 'A doctor of surgical procedures', 2, 'Surgery', '4 Hr', 1);
CALL create_job_posting('NigerianHospital@hosp.org', 'Phy. Therapist', 20000, 'Help injured or ill people improve movement and manage pain', 3, 'Physical Therapy', '8 Hr', 1);

CALL create_job_posting('MemorialHospital@hosp.org', 'Cardiologist', 40000, 'A doctor of the heart', 1, 'Cardiology', '6 Hr', 1);
CALL create_job_posting('MemorialHospital@hosp.org', 'Oral Surgeon', 10000, 'A doctor of oral surgical procedures', 5, 'Surgery', '4 Hr', 1);
CALL create_job_posting('MemorialHospital@hosp.org', 'Neurologist', 70000, 'Treat conditions of the nerves, spine, and brain', 3, 'Neurology', '3 Hr', 1);

CALL create_job_posting('GeneralHospital@hosp.org', 'Anesthesiologist', 40000, 'Evaluate, monitor, and supervise patient care before, during, and after surgery, delivering anesthesia, leading the Anesthesia Care Team', 1, 'Anesthesiology', '4 Hr', 1);
CALL create_job_posting('GeneralHospital@hosp.org', 'Ortho. Surgeons', 70000, 'Specialize in diseases and conditions of the bones, muscles, ligaments, tendons, and joints', 5, 'Surgery', '7 Hr', 1);
CALL create_job_posting('GeneralHospital@hosp.org', 'Head Neurologist', 70000, 'Lead the Neurology Department', 3, 'Neurology', '6 Hr', 1);

CALL admin_create_professional('Charles', 'Snider', 'csnider32@gatech.edu', 2, 'AQ21-ASD-23', 'Student', '404-404-4040', '123456', 'United States', 'Atlanta', 'North Ave NW', 'This is an example Bio!', '0510f172d37d7463103e924583924d02');
CALL create_application('NigerianHospital@hosp.org', 'csnider32@gatech.edu', 'Cardiologist', 'COVER LETTER', NOW());
-- CALL create_application('NigerianHospital@hosp.org', 'cgsnider@gatech.edu', 'Cardiology', 'COVER LETTER', NOW());

-- CALL admin_create_professional('Conor', 'Snows', 'cgsnider@outlook.com', 1, 'BQ32-QWE-54', 'Surgeon', '123-123-1234', '789123', 'United States', 'New York', 'First Street', 'General Surgeon for 3+ years at Memorial Hospital.');
-- CALL admin_create_professional('Charles', 'Snider', 'charles-snider@outlook.com', 1, 'AQ21-ASD-23', 'Student', '404-404-4040', '123456', 'United States', 'Atlanta', 'North Ave NW', 'This is an example Bio!');


-- CALL create_application('NigerianHospital@hosp.org', 'csnider32@gatech.edu', 'Cardiologist', 'Sample Coverletter', '2022-03-01 09:05:00');