export type BreedClassification = 
  | 'Recognised Breed'
  | 'Regional Population'
  | 'Landrace'
  | 'Historically Documented Breed'
  | 'Distinct Equine Type'
  | 'Wild Equid';

export type Continent = 
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Asia'
  | 'Africa'
  | 'Oceania';

export type HistoricalPurpose = 
  | 'Riding & War'
  | 'Draft & Agriculture'
  | 'Sport & Dressage'
  | 'Carriage & Driving'
  | 'Working Stock & Ranch'
  | 'Mountain & Pack'
  | 'Pony & Light Riding'
  | 'Wild & Conservation';

export interface BreedProfile {
  id: string;
  name: string;
  alternativeNames: string[];
  classification: BreedClassification;
  originCountry: string;
  originRegion: string;
  continent: Continent;
  coordinates?: { lat: number; lng: number };
  historicalPurpose: HistoricalPurpose;
  heightMinHands: number;
  heightMaxHands: number;
  heightMinCm: number;
  heightMaxCm: number;
  coatColours: string[];
  distinguishingFeatures: string[];
  conformationSummary: {
    headAndNeck: string;
    shouldersAndChest: string;
    backAndCroup: string;
    limbsAndHooves: string;
  };
  movementCharacteristics: string;
  historicalDevelopment: string;
  temperamentAndManagement: string;
  careAndHealthConsiderations: string;
  saddleConnection: {
    backShapeProfile: string;
    witherConsiderations: string;
    shoulderClearance: string;
    fittingGuidance: string;
  };
  conservationStatus?: 'Critical' | 'Endangered' | 'Vulnerable' | 'Stable' | 'Recovering';
  populationEstimate?: string;
  image?: string;
  imageCaption?: string;
  verifiedSources: string[];
  reviewStatus: 'Verified' | 'Documented Academic';
  lastReviewed: string;
  relatedBreedIds: string[];
}

export type AnatomyDepartment = 
  | 'Skeletal System'
  | 'Muscular System'
  | 'Movement & Biomechanics'
  | 'Conformation'
  | 'Horse, Rider & Saddle Interaction';

export interface AnatomyGuide {
  id: string;
  department: AnatomyDepartment;
  title: string;
  subtitle: string;
  order: number;
  readingTimeMinutes: number;
  leadSummary: string;
  primaryStructures: string[];
  functionalRole: string;
  biomechanicalImpact: string;
  relevanceToSaddleAndRider: string;
  clinicalAndCareNotes: string;
  keyTakeaways: string[];
  academicReferences: string[];
  diagramHotspotId?: string;
}

export interface HeritageArticle {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  geographicFocus: string;
  order: number;
  readingTimeMinutes: number;
  summary: string;
  contentSections: {
    heading: string;
    body: string;
  }[];
  archaeologicalAndHistoricalSources: string[];
  relatedBreedIds?: string[];
  featuredImage?: string;
}

export interface HotspotPoint {
  id: string;
  name: string;
  system: 'skeletal' | 'muscular' | 'conformation' | 'saddle' | 'shoulder';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  shortDescription: string;
  detailedFunction: string;
  saddleRelevance: string;
  relatedGuideId?: string;
}
