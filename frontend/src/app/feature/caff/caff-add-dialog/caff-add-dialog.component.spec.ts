import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaffAddDialogComponent } from './caff-add-dialog.component';

describe('CaffAddDialogComponent', () => {
  let component: CaffAddDialogComponent;
  let fixture: ComponentFixture<CaffAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaffAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaffAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
