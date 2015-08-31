Clothes Store Angular
=======================

[![Build Status](https://travis-ci.org/dwatson62/clothes_store_angular.svg?branch=master)](https://travis-ci.org/dwatson62/clothes_store_angular)  [![Code Climate](https://codeclimate.com/github/dwatson62/clothes_store_angular/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/clothes_store_angular)

![screenshot](https://github.com/dwatson62/clothes_store_angular/blob/master/public/images/screenshot.png)

## Synopsis

This website mimics an online clothes store. Its features are:

- Displays products filtered by category with: description, current price, old price if given, and availability.
- Users can add and remove items to the shopping cart and remove them.
- Users can select an available voucher provided certain criteria is met.
- Vouchers that cannot be used are not displayed
- Totals for the order, including any discounts from vouchers, is displayed

## Approach

My original decision was to use Ruby on Rails, however considering earlier feedback I chose to remake this as an SPA in Angular, as it will be more suitable, responsive and user friendly. Instead of a database, the products and vouchers are stored in json format and called in.

I built up the project iteratively using TDD. Once I had the features and user stories in place, I refactored and separated concerns as I thought best, which involved refactoring the main controller out into three angular factories to handle the shopping cart, the shop and the vouchers. I also spent more time in creating a user friendly and better styled site using Bootstrap, and I hope this to be a massive improvement.

To assist with the javascript logic, I used an external library (Underscore.js). This gave me access to more terse methods such as filter, each, reduce and many others which helped refactor the code further and made it more readable. It also assisted in the tests where I used _.clone() on the product objects so the originals would not be modified.

My voucher factory works in a similar way to before. As I saw it, not all vouchers could be used at once, and that only one needed to be available at a time. I did not think it necessary to offer a $10 off discount and a $15 off discount for the same order. Moreover, I did not want to display a voucher that could not be used, as I did not think this would be a good user experience. This time my solution was to store each voucher as a an object with the necessary properties, and then these were stored in an array, sorted by the largest discount. Each time a product is added to the cart, the program would search through the voucher array, and return the first one that met the correct conditions. This process ensured that only the most appropriate voucher would be available for that order. Once a product was removed, that vouchers discount is removed (if applied) and the program will return a new appropriate voucher.

I tested the controller and factories using Jasmine and Karma, and the features using Protractor. I had difficulty in testing the voucher factory and so those tests are marked as pending. The errors occur during a _.filter() function provided by Underscore.js, which has inside an includes() function from native javascript. While this function works during development, it throws a TypeError exception when testing on a PhantomJS browser. However, when switching to a Chrome browser these tests pass.

## Program Layout

- One view page, where all the features are displayed ```views/index.ejs```
- One angular controller ```public/javascripts/storeController.js```
- Three Angular factories ```public/javascripts/shopService.js```, ```public/javascripts/cartService.js```, ```public/javascripts/voucherService.js```,
- Unit tests are in ```spec/```
- Feature tests are in ```spec/e2e/```

## To install from the terminal

- ``` git clone https://github.com/dwatson62/clothes_store_angular ```
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
