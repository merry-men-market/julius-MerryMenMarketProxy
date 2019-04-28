
function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const id = Math.floor(Math.random() * 10000000);
  userContext.vars.id = id;

  return done();
}

module.exports = {
  generateRandomData,
};
