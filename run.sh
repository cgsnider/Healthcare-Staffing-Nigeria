#!/bin/bash

# A script for running the program from the main directory. 
# Also provides non required options for starting up with a blank database, with only sample data

while getopts "cdie" OPTION; do
    case $OPTION in  
        c)
            mysql -uroot -p < $(pwd)/server/database/initializeDB.sql
            mysql -uroot -p < $(pwd)/server/database/input_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/output_procedures.sql
            mysql -uroot -p < $(pwd)/server/database/delete_procedures.sql
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

            echo "Part 1: Defining Node Server"
            read -p '(1/1) Node Server Port: ' node_port
            echo 'Writing data...'
            echo '# Node Start Up #' >> $_env_loc
            echo 'PORT = '${node_port} >> $_env_loc
            echo 'Node Server Defined!'

            echo "Part 2: Definining Connection to Database"
            read -p '(1/4) Host Name: ' host_name
            read -p '(2/4) User Name: ' user_name
            read -p '(3/4) Database Name: ' db_name
            read -p '(4/4) Database Password: ' db_password

            echo 'Writing data...'
            echo '# Database Connection #' >> $_env_loc
            echo 'HOST = "'${host_name}'"' >> $_env_loc
            echo 'DBUSER = "'${user_name}'"' >> $_env_loc
            echo 'PASSWORD = "'${db_password}'"' >> $_env_loc
            echo 'DATABASE = "'${db_name}'"' >> $_env_loc
            echo 'Database Defined!'

            echo "Part 3: Definining Connection to AWS Cognito"
            read -p 'User Pool ID: ' user_pool
            read -p 'Client ID (Node Server): ' client_id_njs
            read -p 'Pool Region: ' pool_region

            echo 'Writing data...'
            echo '# AWS Cognito #' >> $_env_loc
            echo 'USERPOOLID = "'${user_pool}'"' >> $_env_loc
            echo 'CLIENTID = "'${client_id_njs}'"' >> $_env_loc
            echo 'POOLREGION = "'${pool_region}'"' >> $_env_loc
            echo 'Cognito Defined!'

            echo "Part 4: Definining Connection to AWS S3 Bucket"
            read -p 'Bucket Name: ' bucket_name
            read -p 'Bucket Region: ' bucket_region
            read -p 'bucket access key: ' bucket_acc_key
            read -p 'bucket secret key: ' bucket_secret_key

            echo 'Writing data...'
            echo '# AWS S3 Bucket #' >> $_env_loc
            echo 'AWS_BUCKET_NAME = "'${bucket_name}'"' >> $_env_loc
            echo 'AWS_BUCKET_REGION = "'${bucket_region}'"' >> $_env_loc
            echo 'AWS_ACCESS_KEY = "'${bucket_acc_key}'"' >> $_env_loc
            echo 'AWS_SECRET_KEY = "'${bucket_secret_key}'"' >> $_env_loc
            echo 'S3 Defined!'
            ;;

    esac
done

(cd ./server/node; npm run dev)


    
