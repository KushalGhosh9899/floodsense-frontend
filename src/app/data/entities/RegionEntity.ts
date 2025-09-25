export interface RegionEntity {
    id: string;
    name: string;
    description: string;
    sub_regions: SubRegionEntity[]
}
export interface SubRegionEntity {
    id: string;
    name: string;
    description: string;
}