// src/types/ZoneData.ts
export interface ZoneData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  address?: string; // Adaugă proprietatea address
  radius?: number;
  population: number;
  area: string;
  priceRange: string;
  titleDescription?: string;
  longDescription?: string
}
