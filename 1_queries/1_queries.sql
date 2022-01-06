-- 1
-- SELECT * 
-- FROM users
-- WHERE email = 'tristanjacobs@gmail.com';

-- 2
-- SELECT avg(end_date - start_date) as average_duration
-- FROM reservations;

-- 3
-- SELECT properties.*, avg(property_reviews.rating) as average_rating
-- FROM properties
-- JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;

-- 4
-- SELECT properties.city, count(reservations.id) as total_reservations
-- FROM properties
-- JOIN reservations ON properties.id = property_id
-- GROUP BY properties.city
-- ORDER BY total_reservations DESC;

-- 5
SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;