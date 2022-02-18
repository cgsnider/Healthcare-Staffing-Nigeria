
use cmg_staffing_nigeria;

call admin_create_facility('NigerianHospital@hosp.org', 'Nigerian Hospital', 2, 'Lagos', 'Nigeria', 'Lagos', '123 Street', 'A Nigerian Hopsital');
call admin_create_facility('MemorialHospital@hosp.org', 'Memorial Hospital', 2, 'Kano', 'Nigeria', 'Kano', '123 Street', 'A Memorial Hopsital');
call admin_create_facility('GeneralHospital@hosp.org', 'Nigerian Hospital', 2, 'Ibadan', 'Nigeria', 'Oyo', '123 Street', 'A General Hopsital');

call create_job_posting('NigerianHospital@hosp.org', 'Head Cardiologist', 30000, 'Head of the cardiology department', 1, 'Cardiology');
call create_job_posting('NigerianHospital@hosp.org', 'General Surgeon', 15000, 'A doctor of surgical procedures', 2, 'Surgery');
call create_job_posting('NigerianHospital@hosp.org', 'Physical Therapist', 20000, 'Help injured or ill people improve movement and manage pain', 3, 'Physical Therapy');

call create_job_posting('MemorialHospital@hosp.org', 'Lead Cardiologist', 40000, 'A doctor of the heart', 1, 'Cardiology');
call create_job_posting('MemorialHospital@hosp.org', 'Oral Surgeon', 10000, 'A doctor of oral surgical procedures', 5, 'Surgery');
call create_job_posting('MemorialHospital@hosp.org', 'Neurologist', 70000, 'Treat conditions of the nerves, spine, and brain', 3, 'Neurology');

call create_job_posting('GeneralHospital@hosp.org', 'Lead Cardiologist', 40000, 'Evaluate, monitor, and supervise patient care before, during, and after surgery, delivering anesthesia, leading the Anesthesia Care Team', 1, 'Anesthesiologist');
call create_job_posting('GeneralHospital@hosp.org', 'Orthopedic surgeons', 70000, 'Specialize in diseases and conditions of the bones, muscles, ligaments, tendons, and joints', 5, 'Surgery');
call create_job_posting('GeneralHospital@hosp.org', 'Head Neorologist', 70000, 'Lead the Neorology Department', 3, 'Neurology');

call admin_create_professional('Charles', 'Snider', 'csnider32@gatech.edu', 'Georgia Institute of Technology', '404-404-4040', '12345', 2)