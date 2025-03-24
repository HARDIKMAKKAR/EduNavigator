import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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
      timeSlots: this.fb.array([])
    });
  }

  get subjects() {
    return this.timetableForm.get('subjects') as FormArray;
  }

  get timeSlots() {
    return this.timetableForm.get('timeSlots') as FormArray;
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
    this.timeSlots.push(this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      available: ['', Validators.required]
    }));
  }

  removeTimeSlot(index: number) {
    this.timeSlots.removeAt(index);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submit() {
    this.loading = true;
    this.http.post('http://127.0.0.1:5000/generate_timetable', this.timetableForm.value)
      .subscribe(response => {
        this.result = response;
        console.log(this.result)
        this.loading = false;
        this.closeModal();
      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });
  }
}
