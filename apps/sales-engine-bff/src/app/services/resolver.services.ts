import { Injectable, HttpService } from '@nestjs/common';
import { Driver, Product } from '@lightning/typing';
import interpolate from 'pupa';
import resolvers from '../resolvers/';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResolverService {

    constructor(private httpService: HttpService) {}

    searchByDriver(driver: Driver, keyword: string) {
        const resolver = resolvers[driver.type];
        const resolve = resolver.resolve(driver);
        const { baseUrl, method, headers, body } = driver.search;
        const url = interpolate(baseUrl, { keyword });
        const httpMethod = method.toLocaleLowerCase();
        const params: any = [url];
        if (body) {
            params.push(body);
        }
        if (headers) {
            params.push(headers);
        }
        const response = this.httpService[httpMethod](...params);
        return response.pipe(
          map(resolve),
          tap(() => console.log('funciona esta webada'))
        ).toPromise();
    }
}
