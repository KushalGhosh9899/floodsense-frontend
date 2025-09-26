export interface FloodedAreaEntity {
  region_uuid: string;
  name: string;
  description: string;
  geom: any;
  flooded_at: string;
}

export interface FloodImpactRequest {
  region_id: string;
  water_levels_in_meters: number;
}