// presentation/viewmodels/region.viewmodel.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetAllRegionsUseCase } from '../usecases/regions/GetAllRegionsUseCase';
import { RegionEntity } from '../../data/entities/RegionEntity';
import { RegionUiModel } from '../../presentation/models/RegionUiModel';

@Injectable({ providedIn: 'root' })
export class RegionViewModel {
    private regionsSubject = new BehaviorSubject<RegionUiModel[]>([]);
    regions$: Observable<RegionUiModel[]> = this.regionsSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor(private getAllRegions: GetAllRegionsUseCase) { }

    loadRegions(): void {
        this.loadingSubject.next(true);
        this.getAllRegions.execute()
            .pipe(
                map((entities: RegionEntity[]) =>
                    entities.map(e => this.mapToUiModel(e))
                ),
                tap(() => this.loadingSubject.next(false))
            )
            .subscribe((uiModels) => this.regionsSubject.next(uiModels));
    }

    private mapToUiModel(entity: RegionEntity): RegionUiModel {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            total_sub_regions: entity.sub_regions.length
        };
    }
}
