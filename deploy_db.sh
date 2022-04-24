sudo mysql -uroot -p $password < $(pwd)/server/database/initializeDB.sql
sudo mysql -uroot -p $password < $(pwd)/server/database/input_procedures.sql
sudo mysql -uroot -p $password < $(pwd)/server/database/output_procedures.sql
sudo mysql -uroot -p $password < $(pwd)/server/database/delete_procedures.sql