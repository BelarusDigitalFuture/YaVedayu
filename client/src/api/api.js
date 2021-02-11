import { baseRequest } from './baseRequest';

export function getAddressContent(address, limit = 1) {
  return baseRequest(`/api/v1/search?search=${address}&limit=${limit}`);
}

export function getAddressContentById(streetId) {
  return baseRequest(`/api/v1/street/${streetId}`);
}
