const { faker } = require('@faker-js/faker');

function generateUsers() {
  const users = [];

  const usersLength = 100;
  for (let i = 0; i < usersLength; i++) {
    const user = {
      id: `${i + 1}`,
      username: faker.internet.userName(),
      fullname: faker.person.fullName(),
      created_at: faker.date.past({ years: 3 }),
    };
    users.push(user);
  }

  return users;
}

module.exports = {
  generateUsers,
};
