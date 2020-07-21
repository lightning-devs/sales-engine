import axios from 'axios';
import { API_URL } from '../environments/development';

const storesUrl = `${API_URL}/stores`;

export async function getStores() {
    const { data } = await axios.get(storesUrl);
    if (data) return data;
}
