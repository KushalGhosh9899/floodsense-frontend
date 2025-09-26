// domain/usecases/AnalyseFloodImpactUseCase.ts
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FloodRepository } from '../../../data/repos/FloodRepository';
import { FloodedAreaEntity, FloodImpactRequest } from '../../../data/entities/FloodAreaEntity';

@Injectable({ providedIn: 'root' })
export class AnalyseFloodImpactUseCase {
    constructor(private repo: FloodRepository) { }

    execute(request: FloodImpactRequest): Observable<FloodedAreaEntity[]> {
        return new Observable(observer => {
            this.repo.analyseFloodImpact(request).subscribe({
                next: (res) => {
                    if (res.success) observer.next(res.data);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }
}
