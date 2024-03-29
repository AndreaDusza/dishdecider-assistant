import { AssistantError } from './utils/assistant-error';

export enum FoodService {
  teletal = 'teletal',
  pizzaforte = 'pizzaforte',
  wolt = 'wolt',
  ordit = 'ordit',
  foodora = 'foodora',
  interfood = 'interfood',
  pizzamonkey = 'pizzamonkey',
  egeszsegkonyha = 'egeszsegkonyha'
}

export function isCurrentSiteSupported(): boolean {
  return getCurrentSiteOrUndefined() !== undefined;
}

export function getCurrentSite(): FoodService{
  const result = getCurrentSiteOrUndefined();
  if (result === undefined){
    throw new AssistantError(`Assistant error: Unknown URL '${location.hostname}'`);
  } else {
    return result;
  }
}

export function getCurrentSiteOrUndefined(): FoodService | undefined {
  const hostname = location.hostname;
  switch (hostname) {
    case 'www.teletal.hu': return FoodService.teletal;
    case 'teletal.hu': return FoodService.teletal;
    case 'pizzaforte.hu': return FoodService.pizzaforte;
    case 'wolt.com': return FoodService.wolt;
    case 'app.ordit.hu': return FoodService.ordit;
    case 'www.foodora.hu': return FoodService.foodora;
    case 'www.interfood.hu': return FoodService.interfood;
    case 'pest.pizzamonkey.hu': 
    case 'buda.pizzamonkey.hu': 
    case 'pecs.pizzamonkey.hu':
    case 'szeged.pizzamonkey.hu': return FoodService.pizzamonkey; 
    case 'egeszsegkonyha.hu': return FoodService.egeszsegkonyha; 
    default: return undefined;
  }
}
