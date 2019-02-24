# foodByte
foodByte is a [MEAN](https://github.com/linnovate/mean) stack based web application that enables the user to search for food related products, share their recipes, and compare prices. It relies on the data from [OpenFoodFacts](https://openfoodfacts.org/).

A live demo is available at: http://foodbyte-app.herokuapp.com/. It uses Heroku and mLab MongoDB.

# Features
This application implements the following features:

**User features**
* create a new account and sign in using his email and password.
* display user statistics on his profile.

**Recipe features**
* create a new recipe.
* edit an existing recipe. 
* search recipes by keywords with autocomplete.
* sort recipes by name, modification date or creation date.
* comment recipes.
* display global nutritional score of the recipe and the nutritional score of the products that make up the recipe.

**Product features**
* search product by keywords, store or nutritional value with autocomplete.
* sort product by name or by price.
* edit product: adding price, store and entry date.
* display product details, with a computed nutritional score based on the features (ingredients and nutriments) of the product.

**Store features**
* list of stores with address and geolocation (displayed on a map)
# Technology
foodByte uses a number of open source projects to work properly:

## Client side
The web application is powered by [Angular](https://angular.io/) using the popular library [Angular Material](https://material.angular.io/) for the User Interface.

List of the main technologies used on the front-end:
* [Angular 7](https://angular.io/) - TypeScript based front-end web framework
* [Angular Material](https://material.angular.io/) - Material Design components for Angular
* [Angular Flex Layout](https://github.com/angular/flex-layout) - provide component layout features
## Server side
The server is based on Node.js. It relies on MongoDB for the database, and uses Mocha for testing.

List of the main technologies used on the back-end:
* [Node.js](http://nodejs.org/) - evented I/O for the back-end
* [Express](http://expressjs.com/) - fast Node.js network app framework
* [Mocha](https://mochajs.org/) - feature rich Node.js test framework
* [Mongoose](https://mongoosejs.com/) - elegant MongoDB object modeling for Node.js

# Installation

## Environment Setup
1. [Install Node.js](https://nodejs.org/en/download/package-manager/). The minimum version that will work is 8.0, but the latest version is recommended.
2. [Install MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) and make sure that the MongoDB server is started.

## Project Setup
1. Clone this repository by doing `git clone https://github.com/ehrhart/foodbyte`.
2. In the cloned *foodbyte* folder, run `npm install` to install the dependencies from package.json.
3. Copy the `.env.example` file into a new file named `.env`, and change the variables according to your build environment.
4. Run `npm start`. This builds the front-end based on the package.json scripts section.

## Schema Setup
Run `node server/scripts/initialize-database.js` to create the DB, tables, and indexes.
The script is split into multiple parts that :
- parses the OpenFoodFacts dataset and inserts products.
- calculates the score of each product.
- inserts the missing images by using OpenFoodFacts REST API.
- queries Google Places API for shops in the Côte d'Azur area, and inserts them in the database.
- inserts test data (for testing purpose).

# Building from Docker
A docker image is also provided, to mitigate the hassle of building from the sources, as well as having a MongoDB server running.

The image is split into two containers :
- a container for the web application,
- a container for the MongoDB server.

By default, the application container will expose the port 4040.

All you have to do is to run:
```
docker-compose up -d
```

# Running tests
We use Mocha for our back-end tests. The list of tests can be found in `server/tests/`.
```
npm test
```

# Authors
* [Haroun Amri](https://github.com/haroun3amri) - front-end
* [Aymen Baya](https://github.com/ba007552) - back-end
* [Thibault Ehrhart](https://github.com/ehrhart) - back-end
* [Hajer Ferjani](https://github.com/f-hajer) - front-end

