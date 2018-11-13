
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', table => {
    table.increments();
    table.timestamps();
    table.string('email');
    table.string('token');
  });

  await knex.schema.createTable('trips', table => {
    table.increments();
    table.timestamps();
    table.integer('launchId');
    table.integer('userId').references('users.id');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('trips');
};
