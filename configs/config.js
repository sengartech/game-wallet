// configuring common data points.
module.exports = {
  appName: 'game-wallet',
  appVersion: '1.0.0',
  port: 3000,
  mongodb: {
    uri: 'mongodb://localhost:27017/gamedb'
  },
  mongOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}
