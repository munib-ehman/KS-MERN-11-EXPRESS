const {v4:uuidV4} = require("uuid");
const bcrypt  = require("bcryptjs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        for (let index = 0; index < 10; index++)
          queryInterface.bulkInsert('users', [{
          userId:uuidV4(),
          firstName: 'John',
          lastName: 'Doe',
          email: `example${index}@example.com`,
          password: await bcrypt.hash('123456',10),
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
        return true;
    },
    down: async (queryInterface, Sequelize) => {}
    
  };