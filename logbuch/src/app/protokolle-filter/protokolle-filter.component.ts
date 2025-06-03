import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export enum Status {
  Aktiv = 'Aktiv',
  Inaktiv = 'Inaktiv',
  Fehler = 'Fehler',
  Erfolg = 'Erfolg'
}

@Component({
  selector: 'app-protokolle-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './protokolle-filter.component.html',
  styleUrl: './protokolle-filter.component.scss'
})
export class ProtokolleFilterComponent {
  statusOptions = Object.values(Status);
  
  jobname: string = '';
  prozedur: string = '';
  aufrufer: string = '';
  mandat: string = '';
  ablaufserver: string = '';
  status: Status | null = null;
  gestartet: Date | null = null;
  beendet: Date | null = null;
  aktiv: Date | null = null;
} 