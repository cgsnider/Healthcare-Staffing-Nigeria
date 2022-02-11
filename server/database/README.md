How to initialize the local database:

1. download MySQL:
   If you have homebrew enter "brew install mysql" into the command line

   Otherwise go to https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing and download mysql

2. Start the mySQL server
   If installed on homebrew run "brew services start mysql"
   Otherwise follow guide in install link

3. Now run the sql file.
   On MacOS or Linux run: "mysql -uroot -p < $(pwd)/server/database/InitializeDB.sql" from the main directory
   When a password is requested you can just hit enter.
   On Windows run "mysql -uroot -p < %cd%/server/database/InitializeDB.sql" (I assume %cd% is the same as $(pwd), I'm using mac and homebrew)

Congratulations! The DB server should now be installed.

I recommend getting the mysql plugin by cweijan on VSCode (its probably the second one) that way you can see the contents of the database.
If you click on the databse option that apears and just hit the connect button on the main interface, it should just connect to all the mysql databases on your computer.
