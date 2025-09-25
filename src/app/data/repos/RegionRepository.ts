// data/repositories/region.repository.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionEntity } from '../entities/RegionEntity';
import { ENVRIONMENT } from '../../environment';
import { API_URL } from '../../common/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class RegionRepository {
    constructor(private http: HttpClient) { }

    getAllRegions(): Observable<RegionEntity[]> {
        return this.http.get<RegionEntity[]>(ENVRIONMENT.BASE_API_URL + API_URL.GET_ALL_REGIONS);
    }
}
