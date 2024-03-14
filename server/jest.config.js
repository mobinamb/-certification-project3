module.exports = {
  transformIgnorePatterns: [
    '/node_modules/(?!(bson)/)'
  ],
  setupFilesAfterEnv: ['@babel/register'],
};


