import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Incident } from '../models/incident.model';
import { IncidentSerevice } from '../_services/incident.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  displayedColumns = [
    'requestCode',
    'name',
    'type',
    'description',
    'status',
    'updatedAt',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  incident: Incident = {
    type: '',
    description: '',
    assignedTo: '63124fb3d8ab9ee8ebf70c27',
  };
  submitted = false;

  constructor(
    private userService: UserService,
    private incidentSerevice: IncidentSerevice
  ) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      },
      error: (err) => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      },
    });
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  saveIncident(): void {
    const data = {
      type: this.incident.type,
      description: this.incident.description,
      assignedTo: this.incident.assignedTo,
    };

    this.incidentSerevice.create(data).subscribe({
      next: (res) => {
        console.log(res.data);
        this.submitted = true;
        window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }

  newIncident(): void {
    this.submitted = false;
    this.incident = {
      type: '',
      description: '',
      assignedTo: '63124fb3d8ab9ee8ebf70c27',
    };
  }
}
