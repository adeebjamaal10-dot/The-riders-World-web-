import { BreedProfile } from '../types/index.ts';
import { europeanBreeds } from './breeds/europe.ts';
import { europeanExtraBreeds } from './breeds/europe_extra.ts';
import { europeanBatch3Breeds } from './breeds/europe_batch3.ts';
import { americanBreeds } from './breeds/americas.ts';
import { asianBreeds } from './breeds/asia.ts';
import { africaOceaniaBreeds } from './breeds/africa_oceania.ts';
import { extendedBreedsList } from './breedsExtended.ts';
import { globalBatchBreeds } from './breeds_batch_global.ts';
import { masterExpansionBreeds } from './breeds_master_expansion.ts';
import { milestone200Breeds } from './breeds_batch_milestone200.ts';
import { pinnacleBreeds } from './breeds_batch_pinnacle.ts';

// Master aggregation of all verified, distinct documented horse breeds and populations
const rawBreeds: BreedProfile[] = [
  ...europeanBreeds,
  ...europeanExtraBreeds,
  ...europeanBatch3Breeds,
  ...americanBreeds,
  ...asianBreeds,
  ...africaOceaniaBreeds,
  ...extendedBreedsList,
  ...globalBatchBreeds,
  ...masterExpansionBreeds,
  ...milestone200Breeds,
  ...pinnacleBreeds
];

// Deduplicate by ID just in case to ensure 100% unique primary keys
const uniqueMap = new Map<string, BreedProfile>();
for (const b of rawBreeds) {
  if (!uniqueMap.has(b.id)) {
    uniqueMap.set(b.id, b);
  }
}

export const allBreeds: BreedProfile[] = Array.from(uniqueMap.values());
export const TOTAL_BREEDS_COUNT = allBreeds.length;
