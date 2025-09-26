import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { FloodUiModel } from "../../presentation/models/FloodUiModel";
import { GetFloodImpactedRegionsUseCase } from "../usecases/floods/GetAllFloodImpactedRegions";
import { AnalyseFloodImpactUseCase } from "../usecases/floods/AnalyseFloodImpactUseCase";
import { FloodedAreaEntity } from "../../data/entities/FloodAreaEntity";

@Injectable({ providedIn: 'root' })
export class FloodViewModel {
  private floodRegionsSubject = new BehaviorSubject<FloodUiModel[]>([]);
  floodRegions$ = this.floodRegionsSubject.asObservable();
  private _floodRegions = new BehaviorSubject<FloodUiModel[]>([]);
  analyseFloodRegions$ = this._floodRegions.asObservable();

  constructor(private getFloodRegionsUC: GetFloodImpactedRegionsUseCase, private analyseFloodImpactUseCase: AnalyseFloodImpactUseCase) { }

  loadFloodRegions(payload: {
    region_id: string;
    from_in_ddMMyyHHmmss: string;
    to_in_ddMMyyHHmmss: string;
  }) {
    this.getFloodRegionsUC.execute(payload).subscribe(res => {
      if (res?.data?.length > 0) {
        const mapped: FloodUiModel[] = res.data.map((d: any) => ({
          name: d.name,
          description: d.description,
          coordinates: d.geom.coordinates[0] // take first polygon ring
        }));
        this.floodRegionsSubject.next(mapped);
      }
    });
  }

  async loadFloodImpact(params: { region_id: string; water_levels_in_meters: number }) {
    const dtoRegions: FloodedAreaEntity[] = await firstValueFrom(
      this.analyseFloodImpactUseCase.execute(params) // returns Observable<FloodedAreaEntity[]>
    );

    const uiModels: FloodUiModel[] = dtoRegions.map(dto => ({
      id: dto.region_uuid,
      name: dto.name,
      description: dto.description,
      coordinates: dto.geom?.coordinates?.[0] ?? []
    }));

    this._floodRegions.next(uiModels);
  }

}
