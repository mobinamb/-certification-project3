module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!bson)/', // Ignore bson but transform other modules
    ],
  };
  