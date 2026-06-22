import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionReviewComponent } from './question-review.component';

describe('QuestionReviewComponent', () => {
  let component: QuestionReviewComponent;
  let fixture: ComponentFixture<QuestionReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
