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

  sendUpdate(message: any) { //the component that wants to update something, calls this fn
    this.subjectName.next(message); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
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

    // let id: Guid;
    // id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
    localStorage.getItem('students');
    let akey = Math.random() * 100000000000000000;
    // console.log(a)
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
    // this.studentsList.update(student.key,
    //   {
    //     fullName: student.fullName,
    //     email: student.email,
    //     phone: student.phone,
    //     city: student.city,
    //     gender: student.gender,
    //     branch: student.branch,
    //     DOB: student.DOB == "" ? "" : this.datePipe.transform(student.DOB, 'yyyy-MM-dd')
    //   });
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
    // this.studentsList.remove(key);
  }

  populateForm(row) {
    this.StudentForm.setValue(row)
  }
}
