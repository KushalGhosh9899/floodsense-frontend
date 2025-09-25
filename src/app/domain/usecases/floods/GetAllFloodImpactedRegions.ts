import { Injectable } from "@angular/core";
import { FloodRepository } from "../../../data/repos/FloodRepository";

@Injectable({ providedIn: 'root' })
export class GetFloodImpactedRegionsUseCase {
    constructor(private repo: FloodRepository) { }

    execute(payload: {
        region_id: string;
        from_in_ddMMyyHHmmss: string;
        to_in_ddMMyyHHmmss: string;
    }) {
        return this.repo.getFloodImpactedRegions(payload);
    }
}
