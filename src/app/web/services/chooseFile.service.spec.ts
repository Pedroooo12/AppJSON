/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChooseFileService } from './chooseFile.service';

describe('Service: ChooseFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChooseFileService]
    });
  });

  it('should ...', inject([ChooseFileService], (service: ChooseFileService) => {
    expect(service).toBeTruthy();
  }));
});
