import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    
    private validMethods: Array<string>

    constructor() {
        this.validMethods = new Array('POST', 'PATCH');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercept');
        let headersReq = req.headers;
        headersReq.set('Access-Control-Allow-Origin', '*');
        let httpReq;
        if (this.validMethods.find(method => method === req.method) !== undefined) {
            httpReq = req.clone({ headers: headersReq.set('Content-Type', 'application/json')});
        } else {
            httpReq = req.clone({ headers: headersReq});
        }
        return next.handle(httpReq);

    }
}
