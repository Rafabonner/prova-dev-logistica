import { TestBed } from '@angular/core/testing';

import { ClientesResolver } from './clientes.resolver';

describe('ClientesResolver', () => {
  let resolver: ClientesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClientesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
