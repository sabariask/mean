import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTaskListComponent } from './create-new-task-list.component';

describe('CreateNewTaskListComponent', () => {
  let component: CreateNewTaskListComponent;
  let fixture: ComponentFixture<CreateNewTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
