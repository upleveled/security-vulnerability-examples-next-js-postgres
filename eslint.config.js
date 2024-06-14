import upleveled from 'eslint-config-upleveled';

const config = upleveled.filter(({ name }) => {
  // Disable UpLeveled database auth config, since this
  // is an exercise to try to spot security problems
  return name !== 'upleveled:database-auth';
});

export default config;
