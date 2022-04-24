mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
mysql -uroot -p < $(pwd)/server/database/output_procedures.sql