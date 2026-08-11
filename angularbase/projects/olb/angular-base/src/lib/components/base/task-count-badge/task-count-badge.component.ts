import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";

@Component({
  selector: "olb-task-count-badge",
  templateUrl: "./task-count-badge.component.html",
  styleUrls: ["./task-count-badge.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatBadgeModule]
})
export class TaskCountBadgeComponent {
  @Input() overlap = false;
  _taskCount: number | undefined;
  taskCountDisplay: string | undefined;

  @Input()
  set taskCount(taskCount: number | undefined) {
    if (taskCount === undefined) {
      delete this._taskCount;
      delete this.taskCountDisplay;
      return;
    }
    this._taskCount = taskCount;
    if (taskCount >= 1000) {
      this.taskCountDisplay = Math.round(taskCount / 1000) + "k";
    } else {
      this.taskCountDisplay = taskCount.toString();
    }
  }
}
