module.exports = {
  apps: [
    {
      name: 'WebPage Metadata Crawler',
      script: './dist/server.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
