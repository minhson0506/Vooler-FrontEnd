const cityArray = [
  {
    id: 1,
    name: 100,
    unit: 'steps/day',
    image: require('../assets/city/helsinki.jpg'),
    state: false,
  },
  {
    id: 2,
    name: 200,
    unit: 'steps/day',
    image: require('../assets/city/järvi.jpg'),
    state: false,
  },
  {
    id: 3,
    name: 300,
    unit: 'steps/day',
    image: require('../assets/city/porvoo.jpg'),
    state: false,
  },
  {
    id: 4,
    name: 500,
    unit: 'steps/day',
    image: require('../assets/city/rovaniemi.png'),
    state: false,
  },
  {
    id: 5,
    name: 800,
    unit: 'steps/day',
    image: require('../assets/city/suomenlinna.png'),
    state: false,
  },
  {
    id: 6,
    name: 1000,
    unit: 'steps/day',
    image: require('../assets/city/turku.jpg'),
    state: false,
  },
];

const mushroomArray = [
  {
    id: 1,
    name: 2000,
    unit: 'steps/week',
    image: require('../assets/mushroom/bolete.jpeg'),
    state: false,
  },
  {
    id: 2,
    name: 2500,
    unit: 'steps/week',
    image: require('../assets/mushroom/chanterelle.jpeg'),
    state: false,
  },
  {
    id: 3,
    name: 3000,
    unit: 'steps/week',
    image: require('../assets/mushroom/hoof_fungues.webp'),
    state: false,
  },
  {
    id: 4,
    name: 'Rank #6',
    unit: '',
    image: require('../assets/mushroom/porcini.jpeg'),
    state: false,
  },
  {
    id: 5,
    name: 'Rank #5',
    unit: '',
    image: require('../assets/mushroom/suppilo.png'),
    state: false,
  },
  {
    id: 6,
    name: 'Rank #4',
    unit: '',
    image: require('../assets/mushroom/fly_agaric.jpeg'),
    state: false,
  },
];

const saunaArray = [
  {
    id: 1,
    name: 3500,
    unit: 'steps/week',
    image: require('../assets/sauna/wood_sauna.jpg'),
    state: false,
  },
  {
    id: 2,
    name: 4000,
    unit: 'steps/week',
    image: require('../assets/sauna/ice_swimming.jpg'),
    state: false,
  },
  {
    id: 3,
    name: 4500,
    unit: 'steps/week',
    image: require('../assets/sauna/whisk.webp'),
    state: false,
  },
  {
    id: 4,
    name: 'Rank #3',
    unit: '',
    image: require('../assets/sauna/karhu.jpg'),
    state: false,
  },
  {
    id: 5,
    name: 'Rank #2',
    unit: '',
    image: require('../assets/sauna/sausage.jpeg'),
    state: false,
  },
  {
    id: 6,
    name: 'Rank #1',
    unit: '',
    image: require('../assets/sauna/wood.png'),
    state: false,
  },
];

const berryArray = [
  {
    id: 1,
    name: 5000,
    unit: 'steps/week',
    image: require('../assets/berries/blueberry.jpeg'),
    state: false,
  },
  {
    id: 2,
    name: 5500,
    unit: 'steps/week',
    image: require('../assets/berries/blackberry.jpeg'),
    state: false,
  },
  {
    id: 3,
    name: 6000,
    unit: 'steps/week',
    image: require('../assets/berries/strawberry.png'),
    state: false,
  },
  {
    id: 4,
    name: 6500,
    unit: 'steps/week',
    image: require('../assets/berries/cloudberry.png'),
    state: false,
  },
  {
    id: 5,
    name: 7000,
    unit: 'steps/week',
    image: require('../assets/berries/Lingonberry.png'),
    state: false,
  },
  {
    id: 6,
    name: 7500,
    unit: 'steps/week',
    image: require('../assets/berries/raspberry.jpeg'),
    state: false,
  },
];

const pastryArray = [
  {
    id: 1,
    name: 8000,
    unit: 'steps/week',
    image: require('../assets/pastry/joulutorttu.jpeg'),
    state: false,
  },
  {
    id: 2,
    name: 8500,
    unit: 'steps/week',
    image: require('../assets/pastry/laskiaispulla.jpeg'),
    state: false,
  },
  {
    id: 3,
    name: 9000,
    unit: 'steps/week',
    image: require('../assets/pastry/leipajuusto.jpeg'),
    state: false,
  },
  {
    id: 4,
    name: 9500,
    unit: 'steps/week',
    image: require('../assets/pastry/mammi.jpeg'),
    state: false,
  },
  {
    id: 5,
    name: 10000,
    unit: 'steps/week',
    image: require('../assets/pastry/riisipiirakka.jpeg'),
    state: false,
  },
  {
    id: 6,
    name: 15000,
    unit: 'steps/week',
    image: require('../assets/pastry/Runeberg_torte.jpeg'),
    state: false,
  },
];

const levelArray = [
  {
    level: 1,
    name: 'Destination',
    completed: 0,
  },
  {
    level: 2,
    name: 'Mushroom',
    completed: 0,
  },
  {
    level: 3,
    name: 'Sauna',
    completed: 0,
  },
  {
    level: 4,
    name: 'Berries',
    completed: 0,
  },
  {
    level: 5,
    name: 'Pastry',
    completed: 0,
  },
];

const quoteArray = [
  {
    id: 0,
    quote: '"Wrinkles will only go where the smiles have been." - Jimmy Buffet',
  },
  {
    id: 1,
    quote:
      '"Count your age by friends, not years. Count your life by smiles, not tears." - John Lennon',
  },
  {
    id: 2,
    quote:
      '"Growing old is mandatory, but growing up is optional!" - Walt Disney',
  },
  {
    id: 3,
    quote:
      '"Age is something that does not matter unless you are a cheese!" - Billie Burke',
  },
  {id: 4, Quote: '"Ageing is just another word for living." - Cindy Joseph'},
  {
    id: 5,
    quote: '"It is not how old you are. It is how you are old." - Jules Renard',
  },
  {
    id: 6,
    quote:
      '" When we were small children, we all played dress-up and everybody had a good time. So why stop?" - Iris Apfel',
  },
  {
    id: 7,
    quote:
      '"The spirit never ages. It stays forever young." – Lailah Gifty Akita',
  },
  {
    id: 8,
    quote:
      '"One day you will look back and see that all along you were blooming." - Morgan Harper Nichols',
  },
  {
    id: 9,
    quote:
      '"Getting old is like climbing a mountain; you get a little out of breath, but the view is much better!" - Ingrid Bergman',
  },
  {
    id: 10,
    quote: '"It matters not how long we live but how." - Philip James Bailey',
  },
  {
    id: 11,
    quote:
      '"The best tunes are played on the oldest fiddles!" - Ralph Waldo Emerson',
  },
  {
    id: 12,
    quote:
      '"Anyone who keeps the ability to see beauty never grows old." - Franz Kafka',
  },
  {
    id: 13,
    quote:
      '"Age is simply the number of years the world has been enjoying you!" - Unknown',
  },
  {
    id: 14,
    quote: '"It is important to have a twinkle in your wrinkle." - Unknown',
  },
  {
    id: 15,
    quote:
      '"Laughter is timeless. Imagination has no age. And dreams are forever." - Walt Disney',
  },
  {
    id: 16,
    quote:
      '"To keep the heart unwrinkled — that is to triumph over old age." – Thomas Bailey Aldrich',
  },
  {
    id: 17,
    quote:
      '"In the end, it is not the years in your life that count. It is the life in your years." – Abraham Lincoln',
  },
  {
    id: 18,
    quote:
      '"The longer I live, the more beautiful life becomes." – Frank Lloyd Wright',
  },
];

var nameArray = [
  'Dolphin',
  'Bee',
  'Squirrel',
  'Bunny',
  'Fish',
  'Dinosaur',
  'Cat',
  'Chicken',
];

export {
  cityArray,
  mushroomArray,
  saunaArray,
  pastryArray,
  berryArray,
  levelArray,
  quoteArray,
  nameArray,
};
