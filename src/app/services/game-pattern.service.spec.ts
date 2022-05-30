import { TestBed } from '@angular/core/testing';

import { GamePatternService } from './game-pattern.service';

describe('GamePatternService', () => {
  let service: GamePatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
