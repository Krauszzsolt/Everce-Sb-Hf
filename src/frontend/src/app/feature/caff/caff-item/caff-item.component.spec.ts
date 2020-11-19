import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaffItemComponent } from './caff-item.component';

describe('CaffItemComponent', () => {
  let component: CaffItemComponent;
  let fixture: ComponentFixture<CaffItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaffItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaffItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
