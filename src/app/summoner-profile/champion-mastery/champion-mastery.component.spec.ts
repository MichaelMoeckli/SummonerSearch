import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionMasteryComponent } from './champion-mastery.component';

describe('ChampionMasteryComponent', () => {
  let component: ChampionMasteryComponent;
  let fixture: ComponentFixture<ChampionMasteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampionMasteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionMasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
