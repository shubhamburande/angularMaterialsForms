import { Component, OnInit } from '@angular/core';
import { StudentCommonService } from '../shared/student-common-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(public _studentCommonService: StudentCommonService) { }

  branches = [
    { id: 1, value: 'Science' },
    { id: 2, value: 'Commerce' },
    { id: 3, value: 'Arts' }];

  ngOnInit(): void {
    this._studentCommonService.getStudents()
  }

  onClear() {
    this._studentCommonService.StudentForm.reset();
    this._studentCommonService.initializeFormGroup();
  }

  log(number) {
    console.log(number)
  }

  onSubmit() {
    if (this._studentCommonService.StudentForm.valid) {
      this._studentCommonService.insertStudent(this._studentCommonService.StudentForm.value);
      this.onClear();;
      // this.notification_studentCommonService.success(':: Submitted successfully');
    }
  }
}
