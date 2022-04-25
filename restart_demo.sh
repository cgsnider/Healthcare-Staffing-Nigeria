mysql -uroot -p $password < $(pwd)/server/database/initializeDB.sql
mysql -uroot -p $password < $(pwd)/server/database/input_procedures.sql
mysql -uroot -p $password < $(pwd)/server/database/output_procedures.sql
mysql -uroot -p $password < $(pwd)/server/database/delete_procedures.sql
mysql -uroot -p $password < $(pwd)/server/database/sample_data.sql