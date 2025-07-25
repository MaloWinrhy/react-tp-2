export const ENDPOINTS = {
  autoComplete: (q: string, appId: string, appKey: string) =>
    `https://api.edamam.com/auto-complete?app_id=${appId}&app_key=${appKey}&q=${encodeURIComponent(q)}`,
  parserIngr: (ingr: string, appId: string, appKey: string) =>
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(ingr)}&nutrition-type=cooking`,
  parserUpc: (upc: string, appId: string, appKey: string) =>
    `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&upc=${encodeURIComponent(upc)}&nutrition-type=cooking`,
};
