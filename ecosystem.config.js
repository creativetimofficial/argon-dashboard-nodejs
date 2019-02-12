module.exports = {
  apps: [
    {
      name: 'argon-free-backend',
      script: './bin/www',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      autorestart: true,
      watch: true,
    },
  ],
};
