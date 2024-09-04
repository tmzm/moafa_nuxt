module.exports = {
  apps: [
    {
      exec_mode: 'fork',
      script: 'npx',
      name: 'Dashboard',
      script: '.output/server/index.mjs',
      env: { PORT: 3000 }
    }
  ]
}
