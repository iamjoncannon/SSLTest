module.exports = {
  apps: [{
    name: 'SSLTest',
    script: './main.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.addy,
      key: process.env.key,
      ref: 'origin/ec2',
      branch: 'ec2',
      repo: 'https://github.com/iamjoncannon/SSLTest',
      path: '/home/ubuntu/SSLTest',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}