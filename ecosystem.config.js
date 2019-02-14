module.exports = {
  apps: [
    {
      name: 'argon-free-backend',
      script: './bin/www',
      node_args: ['--inspect=0.0.0.0:9229'],
    },
  ],
};
