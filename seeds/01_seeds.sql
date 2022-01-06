
INSERT INTO users (name, email, password)
VALUES ('nvwo','nw@wang.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('fuxi','fx@wang.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (name, email, password)
VALUES ('gonggong','gg@wang.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- insert data into properties _________________
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
VALUES ('1','afanggong','message','urlxx','urlss',8888,888,88,88,'china','qin','xian','shanxi','l2x9w7');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
VALUES ('2','summmer palace','message','urlxx','urlss',6666,666,66,66,'china','changanjie','beijing','beijing','u2x9y7');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
VALUES ('3','great wall','message','urlxxss','urlssss',9999,999,99,99,'china','huairou','beijing','beijing','w5t8u9');

-- insert data into reservations _________________
INSERT INTO reservations (start_date, end_date, property_id,guest_id)
VALUES ('2021-10-05','2021-10-15','1','2');

INSERT INTO reservations (start_date, end_date, property_id,guest_id)
VALUES ('2021-10-25','2021-10-27','2','3');

INSERT INTO reservations (start_date, end_date, property_id,guest_id)
VALUES ('2021-11-10','2021-10-19','3','1');


-- insert data into property_reviews _________________
INSERT INTO property_reviews (property_id,guest_id,reservation_id,rating,message)
VALUES ('3','1','2',5,'good');

INSERT INTO property_reviews (property_id,guest_id,reservation_id,rating,message)
VALUES ('1','2','3',3,'good');

INSERT INTO property_reviews (property_id,guest_id,reservation_id,rating,message)
VALUES ('2','1','2',5,'not good');