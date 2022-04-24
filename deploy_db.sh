read -p 'Choose a password for the database (Remember this!) ' password


_sql_script=./password.sql

if test -f "$_sql_script"; then
    rm $_sql_script
fi
touch $_sql_script
echo $_sql_script

echo "USE mysql;" >> $_sql_script
echo "UPDATE user" >> $_sql_script
echo "SET password = PASSWORD('"${password}"')" >> $_sql_script
echo "WHERE user = 'root' AND host = 'localhost';">> $_sql_script
echo "FLUSH PRIVILEGES;" >> $_sql_script

sudo mysql -uroot -p $password

sudo mysql -uroot -p $password < $(pwd)/server/database/initializeDB.sql
sudo mysql -uroot -p  $password < $(pwd)/server/database/input_procedures.sql
sudo mysql -uroot -p $password < $(pwd)/server/database/output_procedures.sql