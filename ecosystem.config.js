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
      ref: 'origin/master',
      repo: 'git@github.com:iamjoncannon/SSLTest.git',
      path: '/home/ubuntu/SSLTest',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}