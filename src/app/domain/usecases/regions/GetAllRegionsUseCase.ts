// domain/usecases/get-all-regions.usecase.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegionRepository } from '../../../data/repos/RegionRepository';
import { RegionEntity } from '../../../data/entities/RegionEntity';

@Injectable({ providedIn: 'root' })
export class GetAllRegionsUseCase {
    constructor(private regionRepo: RegionRepository) { }

    execute(): Observable<RegionEntity[]> {
        return this.regionRepo.getAllRegions().pipe(
            map((res: any) => res.data)
        );
    }
}
