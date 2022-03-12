module.exports = {
  apps: [
    {
      name: 'App',
      script: './dist/server.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
