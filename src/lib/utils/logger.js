import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'malewa',
  stream: process.stdout,
  level: 'info'
});

export default logger;