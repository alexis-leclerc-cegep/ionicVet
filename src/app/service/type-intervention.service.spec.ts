import { TestBed } from '@angular/core/testing';

import { TypeInterventionService } from './type-intervention.service';

describe('TypeInterventionService', () => {
  let service: TypeInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeInterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
