import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatBadgeModule } from "@angular/material/badge";
import { TaskCountBadgeComponent } from "./task-count-badge.component";

describe("TaskCountBadgeComponent", () => {
  let component: TaskCountBadgeComponent;
  let fixture: ComponentFixture<TaskCountBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCountBadgeComponent, MatBadgeModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCountBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should set taskCountDisplay correctly for numbers less than 1000", () => {
    component.taskCount = 500;
    expect(component.taskCountDisplay).toEqual("500");
  });

  it("should set taskCountDisplay correctly for numbers greater than or equal to 1000", () => {
    component.taskCount = 1500;
    expect(component.taskCountDisplay).toEqual("2k");
  });

  it("should clear taskCountDisplay and _taskCount when taskCount is undefined", () => {
    component.taskCount = undefined;
    expect(component.taskCountDisplay).toBeUndefined();
    expect(component["_taskCount"]).toBeUndefined();
  });
});
