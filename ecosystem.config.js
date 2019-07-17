const secrets = require('./config/secrets.js');

console.log('hello from ecosystem');
console.log(secrets);

module.exports = {
  apps : [{
    name: 'unique-inventory-api',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    // instances: 1,
    autorestart: true,
    watch: true,
    // max_memory_restart: '1G',
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
      // key  : '~/.ssh/digital_ocean_key_pair_name',
      user : 'root',
      host : '162.243.32.121',
      ref  : 'origin/master',
      repo : 'git@github.com:peter-traversa/unique-inventory-api.git',
      path : '/var/www/unique-inventory-api',
      'post-deploy' : 'npm install && npx pm2 reload ecosystem.config.js --env production'
    }
  }
};
