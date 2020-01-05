import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerRankComponent } from './summoner-rank.component';

describe('SummonerRankComponent', () => {
  let component: SummonerRankComponent;
  let fixture: ComponentFixture<SummonerRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonerRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonerRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
