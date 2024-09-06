import { getPrices, postPrices, putPrices } from "../utils/api";
class PricesService {
  async GetAll(user) {
    const prices = await getPrices(user);
    return prices;
  }

  async Update(user, updates) {
    // validate prices
    let allValid = true;
    Object.keys(updates).forEach((key) => {
      if (isNaN(updates[key]) && updates[key] > 0) allValid = false;
    });
    if (allValid) {
      const prices = await putPrices(user, updates);
      return prices;
    }

    return;
  }

  async Create(user, updates) {
    const prices = await postPrices(user, updates);
    return prices;
  }
}

export default PricesService;
