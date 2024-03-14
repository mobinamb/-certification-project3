module.exports = {
  
  setupFilesAfterEnv: ['@babel/register'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!bson/)', '/node_modules/'],

};


