import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImagePredictionComponent } from './single-image-prediction.component';

describe('SingleImagePredictionComponent', () => {
  let component: SingleImagePredictionComponent;
  let fixture: ComponentFixture<SingleImagePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleImagePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImagePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
