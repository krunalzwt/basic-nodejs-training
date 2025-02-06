const users = require("../src/models/usersModel");

const seedUsers = async () => {
  const users = [];

  try {
    await users.bulkCreate(users);
    console.log("User seeded successfully!!!");
  } catch (error) {
    console.error(error);
  }
};

seedUsers();
