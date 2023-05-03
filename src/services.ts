import { AssistantError } from './utils/assistant-error';

export enum FoodService {
  teletal = 'teletal',
  pizzaforte = 'pizzaforte',
  wolt = 'wolt',
  ordit = 'ordit',
  foodora = 'foodora',
  interfood = 'interfood',
}

export function getCurrentSite(): FoodService {
  const hostname = location.hostname;
  switch (hostname) {
    case 'www.teletal.hu': return FoodService.teletal;
    case 'teletal.hu': return FoodService.teletal;
    case 'pizzaforte.hu': return FoodService.pizzaforte;
    case 'wolt.com': return FoodService.wolt;
    case 'app.ordit.hu': return FoodService.ordit;
    case 'www.foodora.hu': return FoodService.foodora;
    case 'www.interfood.hu': return FoodService.interfood;
  }
  throw new AssistantError(`Assistant error: Unknown URL '${hostname}'`);
}
