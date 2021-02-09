import Fuse from 'fuse.js';
import streets from '../db/streets';

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