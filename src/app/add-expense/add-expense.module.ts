import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpensePageRoutingModule } from './add-expense-routing.module';

import { AddExpensePage } from './add-expense.page';


import { ImagePickerComponent } from '../add-expense/image-picker/image-picker.component';
import { ExpenseListComponent } from '../add-expense/expense-list/expense-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExpensePageRoutingModule
  ],
  declarations: [AddExpensePage, ImagePickerComponent, ExpenseListComponent]
})
export class AddExpensePageModule {}
