
# Download Node JS and the related tools
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -

#Installs Node JS
sudo apt-get install -y nodejs

#Installs mySQL for the database
sudo apt install mysql-server

# Checks if the database is running
#Loook for “active (running)”
sudo systemctl status mysql”

#Installs PM2 for the process manager
sudo npm install -g pm2 

#Activates PM2 upon start up
sudo pm2 startup systemd

#Installs nginx for handling http and https requests
sudo apt-get install -y nginx 

#Allows ssh connections through firewall
sudo ufw allow OpenSSH 

#Allows http and https connections though firewall
sudo ufw allow 'Nginx Full' 

#Enables firewall
sudo ufw --force enable 