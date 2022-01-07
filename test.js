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

const getUserWithEmail = (email = 'tristanjacobs@gmail.com') => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    // .then((result) => result.rows)
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    })
    .catch((err) => console.log(err.message));
};
getUserWithEmail();