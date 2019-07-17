const secrets = require('./config/secrets.js');

module.exports = {
  apps : [{
    name: 'unique-inventory-api',
    script: 'app.js',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      PORT: '3000',
      ENV_TAG: 'dev'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: '80',
      ENV_TAG: 'prod'

    }
  }],
  deploy : {
    production : {
      key  : secrets.sshKeyPath,
      user : secrets.deployUser,
      host : secrets.deployUrl,
      ref  : 'origin/master',
      repo : 'git@github.com:peter-traversa/unique-inventory-api.git',
      path : '/var/www/unique-inventory-api',
      'pre-deploy-local' : `scp ./config/secrets.js ${secrets.deployUser}@${secrets.deployUrl}:'/var/www/config-to-move/'`,
      'post-deploy' : 'cp /var/www/config-to-move/secrets.js /var/www/unique-inventory-api/config/secrets.js && npm install && npx pm2 reload ecosystem.config.js --env production'
    }
  }
};
