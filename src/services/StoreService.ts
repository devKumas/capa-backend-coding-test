import axios from 'axios';
import { NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import jsonStores from '../database/stores.json';
import { BULK_REVERSE_GEOCODING, LOOKUP_A_POSTCODE } from './Urls';

@Service()
export class StoreService {
  readStores() {
    return jsonStores;
  }

  async readStore(storeName: string) {
    const store = jsonStores.filter((v) => v.name === storeName)[0];

    if (!store) if (!store) throw new NotFoundError('There is no matching information.');

    const axiosInfo = await axios.get(`${LOOKUP_A_POSTCODE}${store.postcode}`);
    const { longitude, latitude } = axiosInfo.data.result;

    const axiosStores = await axios.post(`${BULK_REVERSE_GEOCODING}`, {
      geolocations: [
        {
          longitude,
          latitude,
        },
      ],
    });

    const result: [] = axiosStores.data.result[0].result;
    const sotres = result.sort(
      ({ northings: aNorthings }, { northings: bNorthings }) => aNorthings - bNorthings
    );

    return { ...store, longitude, latitude, sotres };
  }
}
