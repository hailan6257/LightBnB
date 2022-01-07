const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'hailanwang',
  password: '',
  host: 'localhost',
  port: '5431',
  database: 'lightbnb'
});

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  //console.log(email);
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => result.rows[0])//test with password:password
    .catch((err) => console.log(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => result.rows[0])//test with password:password
    .catch((err) => console.log(err.message));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  (user) => {
  return pool
    .query(`INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *`, [user.name,user.email,user.password])
    .then((result) => result.rows[0])//test with password:wang, w@w.com, password
    .catch((err) => console.log(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guestId, limit = 10) {
  return pool
    .query(`SELECT * FROM reservations WHERE guest_id =$1 AND start_date > (SELECT CURRENT_DATE) LIMIT $2`, [guestId,limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // 1
  const queryParams = [];//储存参数例如$1
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;//储存sql语句

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);//like '%%' = no where clause
    queryString += `AND city LIKE $${queryParams.indexOf(`%${options.city}%`) + 1} `;
  }
  //4
  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);//like '%%' = no where clause
    queryString += `AND owner_id = $${queryParams.indexOf(`%${options.owner_id}%`) + 1} `;
  }
  //5
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.indexOf(options.minimum_price_per_night * 100) + 1} `;
  }
  //6
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.indexOf(options.maximum_price_per_night * 100) + 1} `;
  }
  //7
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `AND rating >= $${queryParams.indexOf(options.minimum_rating) + 1} `;
  }

  // 8
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.indexOf(limit) + 1};
  `;

  // 9
  // console.log(queryString, queryParams);

  // 10
  return pool.query(queryString, queryParams).then((res) => res.rows);
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
