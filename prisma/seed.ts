import { PrismaClient } from '@prisma/client';
import { furnitures as rawfurnitures } from './seedData/furnitures';
import { instruments as rawInstruments } from './seedData/instruments';
import { clothings as rawClothings } from './seedData/clothings';

const prisma = new PrismaClient();

async function main() {
  console.log('-----------Start seeding-----------');
  await processFurnitures();
  await processInstruments();
  await processClothings();
  console.log('-----------Finish seeding-----------');
}

async function processFurnitures() {
  console.log('-----------processing furnitures-----------');
  const furnitures = [];
  for (const furniture of rawfurnitures) {
    const result = await prisma.furniture.upsert({
      where: {
        name: furniture.name,
      },
      update: furniture,
      create: furniture,
    });
    furnitures.push(result);
  }
  console.table(furnitures);
  console.log('-----------furnitures ended-----------');
}

async function processInstruments() {
  console.log('-----------processing instruments-----------');
  const instruments = [];
  for (const instrument of rawInstruments) {
    const result = await prisma.instrument.upsert({
      where: {
        name: instrument.name,
      },
      update: instrument,
      create: instrument,
    });
    instruments.push(result);
  }
  console.table(instruments);
  console.log('-----------instruments ended-----------');
}

async function processClothings() {
  console.log('-----------processing clothings-----------');
  const clothings = [];
  for (const clothing of rawClothings) {
    const result = await prisma.clothing.upsert({
      where: {
        name: clothing.name,
      },
      update: clothing,
      create: clothing,
    });
    clothings.push(result);
  }
  console.table(clothings);
  console.log('-----------clothings ended-----------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
