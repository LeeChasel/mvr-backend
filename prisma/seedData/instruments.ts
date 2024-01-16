import { DefaultObject } from './dataType';

const drum_price = 110;
const keyboard_piano_price = 70;
const guitar_price = 70;

export const instruments: DefaultObject[] = [
  // drums
  {
    name: 'Red_Drum',
    price: drum_price,
    description: 'A nice red drum',
  },
  {
    name: 'Yellow_Drum',
    price: drum_price,
    description: 'A nice yellow drum',
  },
  {
    name: 'Green_Drum',
    price: drum_price,
    description: 'A nice green drum',
  },
  {
    name: 'Blue_Drum',
    price: drum_price,
    description: 'A nice blue drum',
  },
  {
    name: 'Black_Drum',
    price: drum_price,
    description: 'A nice black drum',
  },
  {
    name: 'Brown_Drum',
    price: drum_price,
    description: 'A nice brown drum',
  },

  // keyboard_pianos
  {
    name: 'Blue_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice blue keyboard piano',
  },
  {
    name: 'Pink_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice pink keyboard piano',
  },
  {
    name: 'Yellow_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice yellow keyboard piano',
  },
  {
    name: 'Red_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice red keyboard piano',
  },
  {
    name: 'White_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice white keyboard piano',
  },
  {
    name: 'Black_Keyboard_Piano',
    price: keyboard_piano_price,
    description: 'A nice black keyboard piano',
  },

  // guitars
  {
    name: 'Yellow_Guitar',
    price: guitar_price,
    description: 'A nice yellow guitar',
  },
  {
    name: 'White_Guitar',
    price: guitar_price,
    description: 'A nice white guitar',
  },
  {
    name: 'Black_Guitar',
    price: guitar_price,
    description: 'A nice black guitar',
  },
  {
    name: 'Pink_Guitar',
    price: guitar_price,
    description: 'A nice pink guitar',
  },
  {
    name: 'Brown_Guitar',
    price: guitar_price,
    description: 'A nice brown guitar',
  },
  {
    name: 'Blue_Guitar',
    price: guitar_price,
    description: 'A nice blue guitar',
  },
];
