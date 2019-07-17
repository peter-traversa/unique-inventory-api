const { exec } = require('child_process');
const secrets = require('../config/secrets.js');

exec(`rsync -r --progress ./config/secrets.js ${secrets.deployUser}@${secrets.deployUrl}:/var/www/config-to-move/`, (err, stdout, stderr) => {
  process.stdout.write(stdout);
  process.stdout.write('\n');
  if (err) {
    console.log(stderr);
  }
  process.exit();
});
