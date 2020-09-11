import 'dotenv/config';

const APOLLO_URI = process.env.APOLLO_URI;

export default ({ config }) => ({
  ...config,
  extra: {
    APOLLO_URI
  }
});