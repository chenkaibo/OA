module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'Kuangshi-node',
      script    : './server/bin/www.js',
      watch     : ['./server'],
      env: {
        NODE_PORT: 20000
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
