import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerDescriptionComponent } from './summoner-description.component';

describe('SummonerDescriptionComponent', () => {
  let component: SummonerDescriptionComponent;
  let fixture: ComponentFixture<SummonerDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonerDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
