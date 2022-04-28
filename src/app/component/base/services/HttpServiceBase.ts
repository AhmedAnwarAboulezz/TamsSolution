import { Observable } from 'rxjs';

export abstract class HttpServiceBaseService {
  protected abstract get baseUrl(): string;
  constructor() { }
}
