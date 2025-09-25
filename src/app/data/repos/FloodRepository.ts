import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "../../common/constants/api.constants";
import { ENVRIONMENT } from "../../environment";

@Injectable({ providedIn: 'root' })
export class FloodRepository {
    constructor(private http: HttpClient) { }

    getFloodImpactedRegions(payload: {
        region_id: string;
        from_in_ddMMyyHHmmss: string;
        to_in_ddMMyyHHmmss: string;
    }): Observable<any> {
        return this.http.post<any>(ENVRIONMENT.BASE_API_URL + API_URL.GET_FLOODED_REGIONS, payload);
    }
}
