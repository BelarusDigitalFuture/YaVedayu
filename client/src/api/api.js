import { baseRequest } from './baseRequest';

export function getAddressContent(address) {
  return baseRequest(`/api/v1/search?search=${address}`);
}