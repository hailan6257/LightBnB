const { Pool } = require('pg');

const pool = new Pool({
  user: 'hailanwang',
  password: '',
  host: 'localhost',
  port: '5431',
  database: 'lightbnb'
});

// const getAllProperties = (options, limit = 10) => {
//   return pool
//     .query(`SELECT * FROM properties LIMIT $1`, [limit])
//     // .then((result) => result.rows)
//     .then((result) => console.log(result.rows))
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// getAllProperties();

// const getUserWithEmail = (email = 'tristanjacobs@gmail.com') => {
//   return pool
//     .query(`SELECT * FROM users WHERE email = $1`, [email])
//     // .then((result) => result.rows)
//     .then((result) => {
//       console.log(result.rows);
//       return result.rows[0];
//     })
//     .catch((err) => console.log(err.message));
// };
// getUserWithEmail();
const getAllProperties = (obj,limit = 10) => {
  console.log(obj);
  if (obj === {} || obj === undefined) {
    return pool
      .query(`SELECT * FROM properties LIMIT $1`, [limit])
      .then((result) => result.rows)
      .catch((err) => {
        console.log(err.message);
      });
  }
  return pool
    .query(`SELECT properties.* 
    FROM properties 
    JOIN property_reviews ON property_id = properties.id
    WHERE city like $1
    AND cost_per_night >= $2
    AND cost_per_night <= $3
    AND rating >= $4
    LIMIT $5`, [obj.city,obj.minimum_price_per_night,obj.maximum_price_per_night,obj.minimum_rating,limit])
  // .then((result) => result.rows)
    .then((result) => console.log(result.rows))
    .catch((err) => {
      console.log(err.message);
    });
};

getAllProperties();