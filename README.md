Clothes Store Angular
=======================

[![Build Status](https://travis-ci.org/dwatson62/clothes_store_angular.svg?branch=master)](https://travis-ci.org/dwatson62/clothes_store_angular)  [![Code Climate](https://codeclimate.com/github/dwatson62/clothes_store_angular/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/clothes_store_angular)

![NAME_OF_IMAGE](http://ENTER_URL)

## Synopsis

This website mimics an online clothes store. Its features are:

- Displays specified products with: description, category, current price (and old price if given) and availability.
- Users can add and remove items to the shopping cart and remove them.
- Users can select an available voucher provided certain criteria is met.
- Vouchers that cannot be used are not displayed
- Totals for the order, including any discounts from vouchers, is displayed

## Approach

My first decision was to use Ruby on Rails, as these are technologies I felt more confident using and felt were appropriate for this website. I originally had three models, products, orders and users. Later I removed the user model as it was not required for this version.

Another reason for using Rails was that I felt that Active Record associations and methods would be useful for this website. I had planned a has_and_belongs_to_many association between the products and the order, and Active Record allowed me to easily create a join table between the two models.

The vouchers were an interesting problem to solve. With the types of vouchers given, I saw that not all of them could be used at once, and that only one needed to be available at a time. I did not think it necessary to offer a $10 off discount and a $15 off discount for the same order. Moreover, I did not want to display a voucher that could not be used, as I did not think this would be a good user experience. My solution was to store each voucher as a hash, with the necessary properties. All the vouchers were stored in an array, sorted by the largest discount. Each time the main page was loaded, the program would search through the voucher array, and return the first one that met the correct conditions. This process ensured that only the most appropriate voucher would be available for that order.

## Program Layout

- One view page, where all the features are displayed ```'app/views/order/index.html.erb'```
- Two models: ```'app/models/order.rb'``` and ```'app/models/product.rb'``` the methods pertaining to vouchers are stored inside the former
- The main controller ```'app/controllers/orders_controller.rb'``` handles the routes for the index and update (used for the vouchers)
- Products controller ```'app/controllers/products.rb'``` handles routes for adding and removing products to the order
- Feature tests are in ```'spec/features'```

## To install from the terminal

- ``` git clone https://github.com/dwatson62/clothes_store_angular```
- ``` cd clothes_store_angular ```
- ``` npm start ```(this will install all node modules and bower components, then start the server)
- Visit [http://localhost:3000](http://localhost:3000)

## To run the tests after installation

#### Unit tests

- ``` npm test ```

#### Feature tests

In seperate windows:

- ``` npm start ```
- ``` webdriver-manager update ``` then ``` webdriver-manager start ```
- ``` protractor spec/e2e/conf.js ```

## Technologies Used

- Language: NodeJS
- Libraries: UnderscoreJS, Bootstrap
- Frameworks: Angular, Express
- Testing: Karma, Jasmine, Protractor
