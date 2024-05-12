import { TestBed } from '@angular/core/testing';
import { RatingService } from './Rating.service';


describe('RateingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
