import API_ENDPOINT from '../globals/api-endpoint';

class TheFarmDbSource {
  static async listProducts() {
    const response = await fetch(API_ENDPOINT.LIST_PRODUCTS);
    const products = await response.json();
    return products;
  }

  static async listHistory() {
    const response = await fetch(API_ENDPOINT.SALES);
    const products = await response.json();
    return products;
  }
}

export default TheFarmDbSource;