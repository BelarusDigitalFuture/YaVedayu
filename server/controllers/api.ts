import Fuse from 'fuse.js';
import streets from '../db/streets';
import { getImage } from 'yandex-pictures';

export async function getTestData(req, res) {
  res.status(200).json({
    success: true,
  });
}

export async function search(req, res) {
  console.log(req.query.search);
  const {
    limit = 1,
    query: search,
  } = req.query;

  const fuse = new Fuse(streets, {
    includeScore: true,
    threshold: 0.3,
    keys: ['type', 'name'],
  });

  const result = fuse.search(req.query.search);
  console.log(result);
  if (result.length) {
    const { type, name } = result[0].item;

    const images = await getImage({
      text: `минск красивое фото ${type} ${name}`,
      isize: 'wallpaper',
      family: 2,
      count: 3
    }, (a, b) => {console.log(a, b)});

    getImage({
      text: "JSusDev",
      count: 2
    }).then(console.log)

    console.log(images);
  }

  await res
    .status(200)
    .json(result.splice(0, Math.max(1, limit)));
}

export async function getStats(req, res) {
  const streetWithContent = streets.filter(street => street.content);

  await res
    .status(200)
    .json({
      street_count: streets.length,
      street_without_content: streets.length - streetWithContent.length,
      street_with_content: streetWithContent.length,
    })
}