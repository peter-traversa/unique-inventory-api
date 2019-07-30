# unique-inventory-api

npm run dev
npm run start

pm2 deploy commands

pm2 deploy production setup
pm2 deploy production update


----

Problems?

----

PM2

The ecosystem.config.js file allows you to deploy to a server.

However, instead of copying local files, the files must be committed and hosted
on github.

In order to get the ecosystem.config.js to work,
you must be able to clone the target repo from the server.
e.g. log in to the server and try to clone the repo.

You may need to create an ssh key on the server and copy the public key to your github account.

To do this, create a public ssh key on the server:

ssh-keygen
cd ~/.ssh
cat id_rsa.pub

copy the public key to github account with access to repo

----
PM2

In order to use pm2 deploy commands, pm2 must be universally installed on the server:

npm install pm2 -g

----
npm install fails on bcrypt

Ubuntu has a trick to get bcrypt to install via npm install:

sudo apt-get install -y build-essential python


