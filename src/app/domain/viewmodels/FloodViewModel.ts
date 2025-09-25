import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FloodUiModel } from "../../presentation/models/FloodUiModel";
import { GetFloodImpactedRegionsUseCase } from "../usecases/floods/GetAllFloodImpactedRegions";

@Injectable({ providedIn: 'root' })
export class FloodViewModel {
  private floodRegionsSubject = new BehaviorSubject<FloodUiModel[]>([]);
  floodRegions$ = this.floodRegionsSubject.asObservable();

  constructor(private getFloodRegionsUC: GetFloodImpactedRegionsUseCase) {}

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
}
