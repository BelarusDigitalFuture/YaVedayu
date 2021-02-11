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

export async function search(req, res) {
  const {
    limit = 1,
    search,
  } = req.query;

  const normalizedArray = search.replace('\\\n', '\n').split('\\n').filter(t => t.length > 5);

  const fuse = new Fuse(streets, {
    includeScore: true,
    // threshold: 0.5,
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
          .map(item => ({
            ...item.item,
            id: item.i,
          }))
          .splice(0, Math.max(1, limit)),
      );
  } else {
    res.status(200).json({});
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
    .json({
      ...street,
      id: street.i,
      images,
    });
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