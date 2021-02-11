import { baseRequest } from './baseRequest';

export function getAddressContent(address, limit = 1) {
  return baseRequest(`/api/v1/search?search=${address}&limit=${limit}`);
}
