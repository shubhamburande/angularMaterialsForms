import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StudentCommonService {

  studentsList: AngularFireList<any>
  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  StudentForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender: new FormControl('1'),
    city: new FormControl(''),
    branch: new FormControl(0),
    DOB: new FormControl('')
  })

  initializeFormGroup() {
    this.StudentForm.setValue({
      $key: null,
      fullName: '',
      email: '',
      phone: '',
      city: '',
      gender: '1',
      branch: 0,
      DOB: '',
    });
  }

  getStudents() {
    this.studentsList = this.firebase.list('students')
    return this.studentsList.snapshotChanges();
  }

  insertStudent(student) {
    this.studentsList.push({
      fullName: student.fullName,
      email: student.email,
      phone: student.mobile,
      city: student.city,
      gender: student.gender,
      branch: student.department,
      DOB: student.DOB == "" ? "" : this.datePipe.transform(student.DOB, 'yyyy-MM-dd')
    });
  }

  updateStudent(student) {
    this.studentsList.update(student.$key,
      {
        fullName: student.fullName,
        email: student.email,
        phone: student.mobile,
        city: student.city,
        gender: student.gender,
        branch: student.department,
        DOB: student.DOB == "" ? "" : this.datePipe.transform(student.DOB, 'yyyy-MM-dd')
      });
  }

  deleteStudent($key: string) {
    this.studentsList.remove($key);
  }
}
