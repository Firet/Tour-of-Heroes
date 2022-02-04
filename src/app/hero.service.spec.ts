import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MessageService } from './message.service';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let Hero = {};

  beforeEach(() => {
    const heroStub = { id: {} };
    const messageServiceStub = { add: arg => ({}) };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: Hero, useValue: heroStub },
        { provide: MessageService, useValue: messageServiceStub }
      ]
    });
    service = TestBed.get(HeroService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('addHero', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const heroStub = TestBed.get(Hero);
      service.addHero(heroStub).subscribe(res => {
        expect(res).toEqual(heroStub);
      });
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('POST');
      req.flush(heroStub);
      httpTestingController.verify();
    });
  });

  describe('updateHero', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const heroStub = TestBed.get(Hero);
      service.updateHero(heroStub).subscribe(res => {
        expect(res).toEqual(heroStub);
      });
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('PUT');
      req.flush(heroStub);
      httpTestingController.verify();
    });
  });
  
  describe('getHeroes', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      service.getHeroes().subscribe(res => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('api/heroes');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});