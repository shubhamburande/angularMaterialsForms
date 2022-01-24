import { Component, OnInit } from '@angular/core';
import { StudentCommonService } from '../shared/student-common-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudentsListComponent } from '../students-list/students-list.component'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(
    public _studentCommonService: StudentCommonService,
    public dialogRef: MatDialogRef<StudentComponent>,
    private router: Router
  ) { }

  branches = [
    { id: 1, value: 'Science' },
    { id: 2, value: 'Commerce' },
    { id: 3, value: 'Arts' }];

  ngOnInit(): void {
    // this._studentCommonService.getStudents()
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
      if (!this._studentCommonService.StudentForm.get('key').value)
        this._studentCommonService.insertStudent(this._studentCommonService.StudentForm.value);
      else
        this._studentCommonService.updateStudent(this._studentCommonService.StudentForm.value);
      this.onClear();
      this.onClose();
      // this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([StudentsListComponent]);
      // });
      // this.notification_studentCommonService.success(':: Submitted successfully');
    }
    this.sendMessage();
  }

  onClose() {
    this._studentCommonService.StudentForm.reset();
    this._studentCommonService.initializeFormGroup();
    this.dialogRef.close();
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this._studentCommonService.sendUpdate(JSON.parse(localStorage.getItem('students')));
  }
}
