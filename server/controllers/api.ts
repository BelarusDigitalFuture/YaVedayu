import Fuse from 'fuse.js';
import streets from '../db/streets';
import gis from 'g-i-s';

export async function getTestData(req, res) {
  res.status(200).json({
    success: true,
  });
}

async function findImages(street) {
  return new Promise((resolve) => {
    gis(`минск красивое фото ${street.type} ${street.name}`, (error, images = []) => {
      resolve(images.splice(0, 3));
    });
  });
}

function prepareStreetResponse(street) {
  return {
    ...street,
    id: street.i,
    content: street.content ? street.content : `https://ru.wikipedia.org/w/index.php?search=${street.name}`,
    wiki_link: `https://ru.wikipedia.org/w/index.php?search=${street.name}`,
  }
}

export async function search(req, res) {
  const {
    limit = 1,
    search,
  } = req.query;

  let normalizedArray = search.replace('\\\n', '\n').split('\\n');
  normalizedArray = Array.isArray(normalizedArray) ? normalizedArray : [normalizedArray];
  normalizedArray = normalizedArray.filter(t => t.length > 4);
  normalizedArray = normalizedArray.map(item => {
    return item.replace(/([^а-яё0-9\s])*/gi, '');
  });

  const fuse = new Fuse(streets, {
    includeScore: true,
    threshold: 0.8,
    distance: 300,
    ignoreLocation: true,
    keys: ['type', 'name'],
  });

  const result = normalizedArray.reduce((acc, item) => {
    return [...acc, ...fuse.search(search)];
  }, []).sort((left, right) => left.score - right.score);

  if (result.length) {
    const { type, name } = result[0].item;

    result[0].item.images = await findImages(result[0].item);

    await res
      .status(200)
      .json(
        result
          .map(item => prepareStreetResponse(item.item))
          .splice(0, Math.max(1, limit)),
      );
  } else {
    res.status(200).json([]);
  }
}

export async function getStreet(req, res) {
  const id = req.params.id;

  const street = streets.find(street => {
    return street.i == id;
  });

  const images = await findImages(street);

  await res
    .status(200)
    .json(prepareStreetResponse({ ...street, images }));
}

export async function getStats(req, res) {
  const streetWithContent = streets.filter(street => street.content);

  await res
    .status(200)
    .json({
      street_count: streets.length,
      street_without_content: streets.length - streetWithContent.length,
      street_with_content: streetWithContent.length,
    });
}