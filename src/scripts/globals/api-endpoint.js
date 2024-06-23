import CONFIG from './config';

const API_ENDPOINT = {
  LIST_PRODUCTS: `${CONFIG.BASE_URL}/products`,
  SALES: `${CONFIG.BASE_URL}/history`,
};

export default API_ENDPOINT;