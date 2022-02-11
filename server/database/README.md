How to initialize the local database:

1. download MySQL:
   If you have homebrew enter "brew install mysql" into the command line
   Otherwise go to https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing and download mysql

2. Now run the sql file.
   On MacOS or Linux run: "mysql -uroot -p '' < "$(pwd)"/server/database" from the main, enter password if required (The password may be just be blank so just hit enter)
   On Windows: replace the pwd
