create table expenses (
	purchase_date date,
	purchase_details varchar(250),
	location varchar(50),
	cost numeric(7,2),
	purchaser varchar(7),
	category varchar(35)
);

-- 2020-07-06: Updated local and Heroku DB with the following
insert into expenses (purchase_date, purchase_details, location, cost, purchaser, category) values ('2019-07-25', 'Ox Creek Campground', 'Montello, WI', '20.00', 'Dusty', 'Rent');
insert into expenses (purchase_date, purchase_details, location, cost, purchaser, category) values ('2019-03-18', 'Red Barn RV Park', 'Benson, AZ', '16.67', 'Dusty', 'Rent');
update expenses set cost = '208.65' where purchase_details = 'The Inn on the Gallatin' and cost = '139.10';
update expenses set 
	purchase_date = '2019-04-08',
	purchase_details = 'AmeriGas Propane',
	location = 'Russellville, AR' 
where purchase_date = '2019-04-09' and location = 'Springdale, AR';

-- 2020-07-21: Updated local and Heroku DB with the following
UPDATE expenses set purchase_details = 'American Distributing - 9.1 gal' where purchase_details = 'American Distributing';
UPDATE expenses set purchase_details = 'Pinnacle Propane - 9.5 gal' where purchase_details = 'Pinnacle Propane';
UPDATE expenses set category = 'Propane' where purchase_date = '2019-10-21' and cost = '32.51';
UPDATE expenses set purchase_details = 'Flying J - 10.32 gal' where purchase_details = 'Flying J' and cost = '32.51' and category = 'Propane'; -- @2.999/gal

-- 2020-07-24: Updated local and Heroku DB with the following. While developing LandingPage data/display, wanted to cleanup data. 
-- Some InitialCosts in DB I considered to be Rig Upgrades and updated DB accordingly. Also decided to better describe Rig category as Rig Upgrades.
update expenses set category = 'Rig' where cost = '105.42' and category = 'InitialCosts';
update expenses set category = 'Rig' where cost = '4244.00' and category = 'InitialCosts';
update expenses set category = 'RigUpgrades' where category = 'Rig';