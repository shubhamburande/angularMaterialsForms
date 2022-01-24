import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentCommonService } from '../shared/student-common-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { StudentComponent } from '../student/student.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  listData: MatTableDataSource<any>
  studentsObject: any;
  private subscriptionName: Subscription;
  messageReceived: any;

  constructor(
    private _studentCommonService: StudentCommonService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'city', 'branch', 'actions'];

  ngOnInit(): void {
    this.putDataInListData()
    this.subscriptionName = this._studentCommonService.getUpdate().subscribe
      (message => { //message contains the data sent from service
        this.studentsObject = message;
        let array = [];
        for (var i in this.studentsObject)
          array.push(this.studentsObject[i]);

        console.log(array)

        this.listData = new MatTableDataSource(array)
        console.log(this.listData)
      });
  }

  putDataInListData() {
    this.studentsObject = this._studentCommonService.getStudents();
    let array = [];
    for (var i in this.studentsObject)
      array.push(this.studentsObject[i]);

    console.log(array)

    this.listData = new MatTableDataSource(array)
    console.log(this.listData)
  }

  onCreate() {
    this._studentCommonService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(StudentComponent, dialogConfig);
    this.ngOnInit()
  }

  onEdit(row) {
    this._studentCommonService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(StudentComponent, dialogConfig);
  }

  onDelete(row) {
    this._studentCommonService.deleteStudent(row.key);
  }


}
