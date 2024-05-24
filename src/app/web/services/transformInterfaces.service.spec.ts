/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransformInterfacesService } from './transformInterfaces.service';

describe('Service: TransformInterfaces', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformInterfacesService]
    });
  });

  it('should ...', inject([TransformInterfacesService], (service: TransformInterfacesService) => {
    expect(service).toBeTruthy();
  }));
});
