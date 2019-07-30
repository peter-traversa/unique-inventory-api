# unique-inventory-api

npm run dev
npm run start





server setup

To get pm2 ecosystem.config.js to work,
you must be able to clone the target repo from the server.

To do this, create a public ssh key on the server:
ssh-keygen

cd ~/.ssh

cat id_rsa.pub

also on server, npm install pm2 -g

copy the public key to github account with access to repo

----

ubuntu has a trick to get bcrypt to install via npm install:

sudo apt-get install -y build-essential python




then:



 pm2 deploy production setup



