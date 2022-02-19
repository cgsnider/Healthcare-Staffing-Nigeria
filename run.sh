#!/bin/bash

# A script for running the program from the main directory. 
# Also provides non required options for starting up with a blank database, with only sample data

while getopts "cd" OPTION; do
    case $OPTION in  
        c)
            echo "c"
            mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
            mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/output_procedures.sql
            ;;
        d)
            echo "d"
            mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
            mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/output_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/sample_data.sql
            ;;
    esac
done

(cd ./server/node; npm run dev)


    
