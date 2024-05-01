function healthCheckHandler(req, res) {
    res.status(200).json({ status: 'ok from express' });
    console.log('Health check request received');
  }
  
  module.exports = { healthCheckHandler };
  