import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatDividerModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, 
        MatCardModule, 
        MatDialogModule, 
        MatInputModule, 
        MatTableModule,
        MatToolbarModule, 
        MatMenuModule, 
        MatIconModule, 
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDividerModule],
    exports: [MatButtonModule, 
        MatCardModule, 
        MatDialogModule, 
        MatInputModule, 
        MatTableModule,
        MatToolbarModule, 
        MatMenuModule, 
        MatIconModule, 
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDividerModule]
})
export class MaterialModule { }