import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProtocolo } from 'app/shared/model/protocolo.model';

type EntityResponseType = HttpResponse<IProtocolo>;
type EntityArrayResponseType = HttpResponse<IProtocolo[]>;

@Injectable({ providedIn: 'root' })
export class ProtocoloService {
    public resourceUrl = SERVER_API_URL + 'api/protocolos';

    constructor(private http: HttpClient) {}

    create(protocolo: IProtocolo): Observable<EntityResponseType> {
        return this.http.post<IProtocolo>(this.resourceUrl, protocolo, { observe: 'response' });
    }

    update(protocolo: IProtocolo): Observable<EntityResponseType> {
        return this.http.put<IProtocolo>(this.resourceUrl, protocolo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProtocolo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProtocolo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
