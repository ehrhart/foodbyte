// config should be imported before importing any other file
const config = require('../config/config');
require('../config/mongoose');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Recipe = require('../models/recipe.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Shop = require('../models/shop.model');
const Price = require('../models/price.model');

const nlpHelper = require('../helpers/nlp.helper');

(async() => {
  // Insert a user
  await User.updateOne({
    email: 'demo@foodbyte.io'
  }, {
    fullname: 'John Doe',
    email: 'demo@foodbyte.io',
    hashedPassword: bcrypt.hashSync('demo', 10)
  }, {
    upsert: true
  });
  const user = await User.findOne({ email: 'demo@foodbyte.io' });

  // Insert some recipes
  const recipesData = [
    {
      name: 'Blanquette de veau facile',
      text: `Etape 1
Faire revenir la viande dans un peu de beurre doux jusqu'à ce que les morceaux soient un peu dorés.

Etape 2
Saupoudrer de 2 cuillères de farine. Bien remuer.

Etape 3
Ajouter 2 ou 3 verres d'eau, les cubes de bouillon, le vin et remuer. Ajouter de l'eau si nécessaire pour couvrir.

Etape 4
Couper les carottes en rondelles et émincer les oignons puis les incorporer à la viande, ainsi que les champignons.

Etape 5
Laisser mijoter à feu très doux environ 1h30 à 2h00 en remuant.

Etape 6
Si nécessaire, ajouter de l'eau de temps en temps.

Etape 7
Dans un bol, bien mélanger la crème fraîche, le jaune d’oeuf et le jus de citron. Ajouter ce mélange au dernier moment, bien remuer et servir tout de suite.
`,
    },
    {
      name: 'Filet mignon en croûte',
      text: `Etape 1
Peler et émincer les oignons.

Etape 2
Les faire revenir dans une sauteuse avec 20 g de beurre pendant 3 minutes environ. Les retirer de la sauteuse et les réserver.

Etape 3
Dans la même sauteuse, faire revenir les filets mignons de chaque côté.

Etape 4
Laisser cuire 10 minutes à feu doux.

Etape 5
Réincorporer les oignons. Poursuivre la cuisson pendant 5 minutes. Saler, poivrer. Réserver.

Etape 6
Dérouler les pâtes feuilletées.

Etape 7
Déposer sur chaque pâte deux tranches de jambon et 100 g de gruyère. Saler et poivrer.

Etape 8
Y déposer un filet sur chaque pâte garnie et napper de sauce aux oignons.

Etape 9
Replier la pâte autour de la viande et souder les bords à l'aide du jaune d'oeuf préalablement battu et d'un pinceau alimentaire.

Etape 10
Enfourner pour 45 minutes de cuisson à 200°C (thermostat 6-7).
`,
    },
    {
      name: 'Lasagnes à la bolognaise',
      text: `Etape 1
Faire revenir gousses hachées d'ail et les oignons émincés dans un peu d'huile d'olive.

Etape 2
Ajouter la carotte et la branche de céleri hachée puis la viande et faire revenir le tout.

Etape 3
Au bout de quelques minutes, ajouter le vin rouge. Laisser cuire jusqu'à évaporation.

Etape 4
Ajouter la purée de tomates, l'eau et les herbes.
Saler, poivrer, puis laisser mijoter à feu doux 45 minutes.

Etape 5
Préparer la béchamel : faire fondre le beurre.

Etape 6
Hors du feu, ajouter la farine d'un coup.

Etape 7
Remettre sur le feu et remuer avec un fouet jusqu'à l'obtention d'un mélange bien lisse.

Etape 8
Ajouter le lait peu à peu.

Etape 9
Remuer sans cesse, jusqu'à ce que le mélange s'épaississe.

Etape 10
Ensuite, parfumer avec la muscade, saler, poivrer. Laisser cuire environ 5 minutes, à feu très doux, en remuant. Réserver.

Etape 11
Préchauffer le four à 200°C (thermostat 6-7).
Huiler le plat à lasagnes. Poser une fine couche de béchamel puis des feuilles de lasagnes, de la bolognaise, de la béchamel et du parmesan.
Répéter l'opération 3 fois de suite.

Etape 12
Sur la dernière couche de lasagnes, ne mettre que de la béchamel et recouvrir de fromage râpé. Parsemer quelques noisettes de beurre.

Etape 13
Enfourner pour environ 25 minutes de cuisson.

Etape 14
Déguster
`,
    },
    {
      name: 'Tiramisu (recette originale)',
      text: `Etape 1
Séparer les blancs des jaunes d'oeufs.

Etape 2
Mélanger les jaunes avec le sucre roux et le sucre vanillé.

Etape 3
Ajouter le mascarpone au fouet.

Etape 4
Monter les blancs en neige et les incorporer délicatement à la spatule au mélange précédent. Réserver.

Etape 5
Mouiller les biscuits dans le café rapidement avant d'en tapisser le fond du plat.

Etape 6
Recouvrir d'une couche de crème au mascarpone puis répéter l'opération en alternant couche de biscuits et couche de crème en terminant par cette dernière.

Etape 7
Saupoudrer de cacao.

Etape 8
Mettre au réfrigérateur 4 heures minimum puis déguster frais.

Note de l'auteur

Il existe de nombreuses recettes de tiramisu. Celle-ci est la recette originale (ou en tous les cas, l'une des recettes pouvant prétendre l'être!). NB: il y a bien de l'alcool dans le tiramisu mais il s'agit de Marsala sec (ni aux oeufs, ni à l'amande) mélangé au café très fort.
`
    }
  ];

  // Load the lexicon
  await nlpHelper.load();

  for (const recipeData of recipesData) {
    // Set the owner of the recipe to our new user
    const recipe = new Recipe(recipeData);
    recipe.user = user._id;

    // Parse recipe text and get products
    recipe.products = (await nlpHelper.getProductsFromRecipeText(recipeData.text)).map(product => {
      return product._id;
    });

    const recipeObject = recipe.toObject();
    delete recipeObject._id;

    await Recipe.updateOne({
      name: recipe.name,
      user: recipe.user
    }, recipeObject, {
      upsert: true
    });
  }

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

  // Insert prices
  const product = await Product.findOne({ off_id: '07500521' });
  const shop = await Shop.findOne();
  if (product && shop) {
    const price = new Price({
      shopId: shop._id,
      shopName: shop.name,
      date: new Date(new Date(2017, 0, 1).getTime() + Math.random() * (new Date(2018, 0, 1).getTime() - new Date(2017, 0, 1).getTime())),
      price: (1 + Math.random() * 10).toFixed(2)
    });
    await price.save();

    product.prices.push(price._id);
    await product.save();
  }

  // Do not forget to close the database connection
  mongoose.connection.close();
})();
