import Fuse from 'fuse.js';
import streets from '../db/streets';
import { getImage } from 'yandex-pictures';

export async function getTestData(req, res) {
  res.status(200).json({
    success: true,
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
    return [...acc, ...fuse.search(search)]
  }, []).sort((left, right) => left.score - right.score);

  if (result.length) {
    const { type, name } = result[0].item;

    // const images = await getImage({
    //   text: `минск красивое фото ${type} ${name}`,
    //   isize: 'wallpaper',
    //   family: 2,
    //   count: 3
    // }, (a, b) => {console.log(a, b)});
    //
    // getImage({
    //   text: "JSusDev",
    //   count: 2
    // }).then(console.log)
    //
    // console.log(images);
  }

  await res
    .status(200)
    .json(
      result
        .map(item => item.item)
        .splice(0, Math.max(1, limit))
    );
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