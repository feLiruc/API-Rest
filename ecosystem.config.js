module.exports = {
  apps : [{
    name   : "FV",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
    watch: true,
    env: {
      SERVER_PORT: 5000,
      DB_URL: "mongodb://localhost/FV",
      NODE_ENV: "development"
    },
    env_production: {
      SERVER_PORT: 5001,
      DB_URL: 'mongodb://localhost/FV',
      NODE_ENV: "production"
    }
  }]
}
