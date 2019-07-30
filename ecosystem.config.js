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
      key  : '~/.ssh/digital_ocean_key_pair_name',
      user : 'root',
      host : '162.243.32.121',
      ref  : 'origin/master',
      repo : 'git@github.com:peter-traversa/unique-inventory-api.git',
      path : '/var/www/unique-inventory-api',
      'pre-setup': 'nvm use 12.6.0',
      'pre-deploy-local': `npm run copy-secrets-to-server`,
      'post-deploy': 'rsync -r /var/www/config-to-move/secrets.js /var/www/unique-inventory-api/source/config/secrets.js && npm install && npx pm2 reload ecosystem.config.js --env production'
    }
  }
};
