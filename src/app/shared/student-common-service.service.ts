import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DatePipe } from '@angular/common';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCommonService {

  studentsList;
  private studentListSubject: Subject<any>;
  constructor(private datePipe: DatePipe) {
    this.studentListSubject = new Subject<any>()
  }

  private subjectName = new Subject<any>();

  sendUpdate(data: any) {
    this.subjectName.next(data);
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable();
  }

  StudentForm: FormGroup = new FormGroup({
    key: new FormControl(null),
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
      key: null,
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
    return JSON.parse(localStorage.getItem('students'))
  }

  insertStudent(student) {
    if (localStorage.getItem('students')) {
      this.studentsList = JSON.parse(localStorage.getItem('students'))
    } else {
      this.studentsList = {}
    }

    localStorage.getItem('students');
    let akey = Math.random() * 100000000000000000;
    this.studentsList[akey] =
    {
      key: akey,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      city: student.city,
      gender: student.gender,
      branch: student.branch,
      DOB: student.DOB == "" ? "" : this.datePipe.transform(student.DOB, 'yyyy-MM-dd')
    };
    localStorage.setItem('students', JSON.stringify(this.studentsList))
  }

  updateStudent(student) {
    if (localStorage.getItem('students')) {
      this.studentsList = JSON.parse(localStorage.getItem('students'))
    } else {
      this.studentsList = {}
    }

    this.studentsList[student.key] = {
      key: student.key,
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      city: student.city,
      gender: student.gender,
      branch: student.branch,
      DOB: student.DOB == "" ? "" : this.datePipe.transform(student.DOB, 'yyyy-MM-dd')
    }
    localStorage.setItem('students', JSON.stringify(this.studentsList))
  }

  deleteStudent(key: string) {
    console.log(key)
    if (localStorage.getItem('students')) {
      this.studentsList = JSON.parse(localStorage.getItem('students'))
    } else {
      this.studentsList = {}
    }

    delete this.studentsList[key]
    localStorage.setItem('students', JSON.stringify(this.studentsList))
    this.sendUpdate(JSON.parse(localStorage.getItem('students')))
  }

  populateForm(row) {
    this.StudentForm.setValue(row)
  }
}
