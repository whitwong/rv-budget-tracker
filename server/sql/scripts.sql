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