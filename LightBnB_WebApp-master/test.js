const { Pool } = require('pg');

const pool = new Pool({
  user: 'hailanwang',
  password: '',
  host: 'localhost',
  port: '5431',
  database: 'lightbnb'
});

const getAllProperties = (obj,limit = 10) => {
  // console.log(obj);
  if (!obj.city && !obj.minimum_price_per_night && !obj.maximum_price_per_night && !obj.minimum_rating && !obj.owner_id) {
    const text = `SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $1`;
    return pool
      .query(text, [limit])
      .then((result) => result.rows)
      .catch((err) => {
        console.log(err.message);
      });
  }
  obj.city = obj.city === '' ? '%' : obj.city;
  obj.minimum_price_per_night = obj.minimum_price_per_night === '' ? 0 : obj.minimum_price_per_night * 100;
  obj.maximum_price_per_night = obj.maximum_price_per_night === '' ? 999999999 : obj.maximum_price_per_night * 100;
  obj.minimum_rating = obj.minimum_rating === '' ? 0 : obj.minimum_rating;
  
  return pool
    .query(`SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON property_id = properties.id
    WHERE city like $1
    AND cost_per_night >= $2
    AND cost_per_night <= $3
    AND rating >= $4
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $5`, [obj.city,obj.minimum_price_per_night,obj.maximum_price_per_night,obj.minimum_rating,limit])
    .then((result) => result.rows)
    // .then((result) => console.log(result.rows))
    .catch((err) => {
      console.log(err.message);
    });
};

getAllProperties();