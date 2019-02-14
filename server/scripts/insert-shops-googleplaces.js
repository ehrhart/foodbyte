// config should be imported before importing any other file
const config = require('../config/config');
require('../config/mongoose');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Shop = require('../models/shop.model');

if (!process.env.GOOGLE_API_KEY) {
  console.log('Please specify the environment variable GOOGLE_API_KEY');
  return;
}

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise
});

/**
 * Get the value for a given key in address_components
 *
 * @param {Array} components address_components returned from Google maps autocomplete
 * @param type key for desired address component
 * @returns {String} value, if found, for given type (key)
 */
function extractFromAddress(components, type) {
  return components.filter((component) => component.types.indexOf(type) === 0).map((item) => item.long_name).pop() || null;
}

async function fetchPlaces(options) {
  return new Promise((done, fail) => {
    let results = [];

    const opts = options || {};
    googleMapsClient.placesNearby(opts)
    .asPromise()
    .then(response => {
      results = results.concat(response.json.results);

      function getNextPage() {
        return googleMapsClient.placesNearby({
          pagetoken: response.json.next_page_token
        }).asPromise();
      }
      return getNextPage().then(nextResponse => {
        if (nextResponse.json.status !== 'INVALID_REQUEST') {
          results = results.concat(nextResponse.json.results);
          return nextResponse;
        }
        // Wait one second, and try again
        return new Promise(function(resolve) {
          setTimeout(resolve, 1000);
        })
        .then(getNextPage)
        .then(repeatWhileInvalid);
      }, error => {
        console.log('error=',error);
      });
    })
    .then(() => {
      done(results);
    }, fail);
  });
}

async  function fetchPlaceDetails(placeId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = googleMapsClient.place({
        placeid: placeId,
        fields: ['address_component', 'adr_address', 'formatted_address', 'geometry', 'icon', 'id', 'name', 'photo', 'place_id', 'type', 'url', 'formatted_phone_number', 'opening_hours', 'website', 'rating' ]
      })
      .asPromise()
      .then(response => {
        resolve(response.json.result);
      }, reject);
    }, 1000);
  });
}

(async() => {
  // Search for shops using Google Places API
  let places = [];
  try {
    places = await fetchPlaces({
      type: 'supermarket',
      language: 'fr-FR',
      location: [43.3840896, 5.3996588],
      radius: 50000
    });
  } catch (e) {
    console.error(e);
  }

  // Get details of each place
  for (const place of places) {
    try {
      const details = await fetchPlaceDetails(place.place_id);

      const address = {};
      const components = details.address_components || [];
      const streetNumber = extractFromAddress(components, 'street_number');
      const route = extractFromAddress(components, 'route')
      if (streetNumber || route) {
        address.street = '';
        if (streetNumber) {
          address.street += `${streetNumber} `;
        }
        address.street += route;
      }
      const locality = extractFromAddress(components, 'locality');
      if (locality) {
        address.locality = locality;
      }
      const postalCode = extractFromAddress(components, 'postal_code');
      if (postalCode) {
        address.postalCode = postalCode;
      }
      const country = extractFromAddress(components, 'country');
      if (country) {
        address.country = country;
      }

      // Construct temporary shop
      const shop = new Shop({
        name: details.name,
        location: {
          type: 'Point',
          coordinates: [details.geometry.location.lng, details.geometry.location.lat]
        },
        address
      });

      // Upsert the shop into the datbaase
      const shopData = shop.toObject();
      delete shopData._id;
      await Shop.updateOne({
        location: shop.location
      }, shopData, {
        upsert: true
      });
      console.log(`Updated shop "${shop.name}"`);
    } catch (e) {
      console.error(e);
    }
  }
  /*

  // Insert shops
  const shops = [

    new Shop({
      name: 'Casino supermarket and drive',
      location: {
        type: 'Point',
        coordinates: [7.0730066, 43.6178208]
      },
      address: {
        street: 'Avenue Roumanille',
        postalCode: '06410',
        locality: 'Biot',
      }
    }),
    new Shop({
      name: 'Carrefour',
      location: {
        type: 'Point',
        coordinates: [7.0892186, 43.6038184]
      },
      address: {
        street: 'Chemin de Saint-Claude',
        postalCode: '06600',
        locality: 'Antibes',
      }
    }),
    new Shop({
      name: 'E. Leclerc',
      location: {
        type: 'Point',
        coordinates: [7.0404749, 43.5921753]
      },
      address: {
        street: '1750 Chemin de Saint-Bernard',
        postalCode: '06220',
        locality: 'Vallauris'
      }
    })
  ];
  for (const shop of shops) {
    const shopData = shop.toObject();
    delete shopData._id;
    await Shop.updateOne({
      location: shop.location
    }, shopData, {
      upsert: true
    });
  }
  */

  // Do not forget to close the database connection
  mongoose.connection.close();
})();
