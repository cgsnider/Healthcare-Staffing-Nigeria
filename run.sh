#!/bin/bash

# A script for running the program from the main directory. 
# Also provides non required options for starting up with a blank database, with only sample data

while getopts "cdie" OPTION; do
    case $OPTION in  
        c)
            mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
            mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/output_procedures.sql
            ;;
        d)
            mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
            mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/output_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/delete_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/sample_data.sql
            ;;
        i)
            (cd ./client; npm install)
            (cd ./server/node; npm install)
            ;;

        e)
            echo "Initialize Environment"
            echo "Bucket Access:"
            _env_loc=server/node/.env
            if test -f "$_env_loc"; then
                rm $_env_loc
            fi
            echo $_env_loc
            read -p 'Bucket Name: ' bucket_name
            read -p 'Bucket Region: ' bucket_region
            read -p 'bucket access key: ' bucket_acc_key
            read -p 'bucket secret key: ' bucket_secret_key
            echo 'AWS_BUCKET_NAME="'${bucket_name}'"' >> $_env_loc
            echo 'AWS_BUCKET_REGION="'${bucket_region}'"' >> $_env_loc
            echo 'AWS_ACCESS_KEY="'${bucket_acc_key}'"' >> $_env_loc
            echo 'AWS_SECRET_KEY="'${bucket_secret_key}'"' >> $_env_loc
            ;;

    esac
done

(cd ./server/node; npm run dev)


    
