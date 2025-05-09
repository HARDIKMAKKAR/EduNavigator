import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var google: any;  // Required for Google Charts

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent {
  timetableForm: FormGroup;
  showModal: boolean = false;
  result: any = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.timetableForm = this.fb.group({
      subjects: this.fb.array([]),
      time_slots: this.fb.array([])
    });
  }
  ngOnInit() {
    google.charts.load('current', { packages: ['gantt'] });
  }
  

  

  get subjects() {
    return this.timetableForm.get('subjects') as FormArray;
  }

  get time_slots() {
    return this.timetableForm.get('time_slots') as FormArray;
  }

  addSubject() {
    this.subjects.push(this.fb.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      duration: ['', Validators.required]
    }));
  }

  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }

  addTimeSlot() {
    this.time_slots.push(this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      available: ['', Validators.required]
    }));
  }

  removeTimeSlot(index: number) {
    this.time_slots.removeAt(index);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
timeTable:[];
  submit() {
    this.loading = true;
    this.http.post('http://localhost:4000/generate_timetable', (this.timetableForm.value))
      .subscribe(response => {
        this.result = response;
        
        this.timeTable=this.result.data.timetable;
        console.log(this.timeTable)
        this.loading = false;
        this.closeModal();
        this.drawGanttChart();
        google.charts.setOnLoadCallback(() => this.drawGanttChart());
      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });
  }


drawGanttChart() {
  google.charts.load('current', {'packages':['gantt']});
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    let taskId = 1;

    this.timeTable.forEach((slot: any) => {
      const slotStartTime = this.parseTime(slot.slot.split(' - ')[0]);
      slot.tasks.forEach((task: any) => {
        const [taskName, mins] = task.split(' - ');
        const durationMins = parseInt(mins.trim());
        const taskStart = new Date(slotStartTime);
        const taskEnd = new Date(taskStart.getTime() + durationMins * 60000);
        
        data.addRow([
          'Task' + taskId, 
          taskName, 
          null, 
          taskStart, 
          taskEnd, 
          null, 
          100, 
          null
        ]);

        slotStartTime.setTime(taskEnd.getTime()); // Update for next task
        taskId++;
      });
    });

    const options = {
      height: 400,
      gantt: {
        trackHeight: 30
      }
    };

    const chart = new google.visualization.Gantt(document.getElementById('gantt_chart'));
    chart.draw(data, options);
  });
}

// Helper to parse time string like "6:00 PM" into a Date object
parseTime(timeStr: string): Date {
  const now = new Date();
  const [time, modifier] = timeStr.trim().split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  now.setHours(hours, minutes, 0, 0);
  return new Date(now);
}

}
