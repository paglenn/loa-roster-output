import { getPrices, postPrices, putPrices } from "../utils/api";
class PricesService {
  static async GetAll(user) {
    const prices = await getPrices(user);
    return prices;
  }

  static async Update(user, updates) {
    const prices = await putPrices(user, updates);
    return prices;
  }

  static async Create(user, updates) {
    const prices = await postPrices(user, updates);
    return prices;
  }
}

export default PricesService;
