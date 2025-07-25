import { ENDPOINTS } from '@/constants/endpoints';

const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID || '';
const APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY || '';

export const fetchAutoComplete = async (query: string) => {
  const url = ENDPOINTS.autoComplete(query, APP_ID, APP_KEY);
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return await res.json();
};

export const fetchFoodDetails = async (param?: string, upc?: string) => {
  let url = '';
  if (upc) {
    url = ENDPOINTS.parserUpc(upc, APP_ID, APP_KEY);
  } else if (param) {
    url = ENDPOINTS.parserIngr(param, APP_ID, APP_KEY);
  }
  if (!url) throw new Error('No param provided');
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return await res.json();
};
