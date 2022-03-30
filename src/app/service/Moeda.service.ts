import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MoedaModel } from "../models/moeda";

@Injectable()
export class MoedaService{
    moedaApiUrl = "http://localhost:8080/v1/moeda";
    constructor(private http: HttpClient){}

    getMoedas(): Observable<MoedaModel[]>{
        return this.http.get<MoedaModel[]>(this.moedaApiUrl);
    }

    createMoedas(moeda: MoedaModel): Observable<MoedaModel>{
        return this.http.post<MoedaModel>(this.moedaApiUrl, moeda);
    }

    editMoedas(moeda:MoedaModel): Observable<MoedaModel> {
       return this.http.put<MoedaModel>(this.moedaApiUrl, moeda);
    }

    deleteMoeda(id: Number): Observable<any>{
        return this.http.delete<any>(`${this.moedaApiUrl}/${id}`)
    }

}