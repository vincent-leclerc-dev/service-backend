import { hostname } from 'os';

const {
  name,
  version,
  endpoints,
  engines,
} = require('../../../../package.json');

export default () => ({
  db: {
    uri: process.env.SERVICE_MONGO_URI || null,
    autoIndex: true,
    keepAlive: true,
    maxPoolSize: 50,
    retryAttempts: 3,
    retryDelay: 0,
    socketTimeoutMS: 0,
    serverSelectionTimeoutMS: 1500,
    tls: !(process.env.SERVICE_MONGO_TLS_DISABLE === 'true'),
    useNewUrlParser: true,
    wtimeout: 2500,
  },
  server: {
    port: process.env.API_PORT || '2000',
  },
  service: {
    version,
    name: name || 'api-gateway',
    engines: engines || {},
    endpoints: endpoints || {},
    hostname: hostname(),
    startedAt: new Date(),
  },
});
