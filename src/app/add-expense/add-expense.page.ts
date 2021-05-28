import { Component, OnInit, Output } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType, FilesystemDirectory, FilesystemEncoding  } from '@capacitor/core';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonList } from '@ionic/angular';
import { ResolveEnd } from '@angular/router';

let totalExpense = 0;
const { Toast } = Plugins;
const { Filesystem } = Plugins;

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  expense: any = {};
  expList: string[] = [];  
  expListAmount: number[] = []; 
  totalExpense: number;
  public date = new Date();
  public dateTime: number;
  public firstEx = true;
  image: string;

  constructor() {
    this.totalExpense = totalExpense;
    this.dateTime = this.date.getTime(); 
    this.mkdir(); // Tworzy kataog gdzie bedzie lista wydatków
    this.image = '';
  }

  ngOnInit() {

  }

  onImagePicked(imageData: string) {
    this.image = imageData;
    this.writeFile(); // Zapis zdjecia do pliku csv
    
  }

  clearList() {
    
    this.expList = [];
    this.expListAmount = [];
    totalExpense = 0;
    this.totalExpense = totalExpense;

  }
  addLine() {
    // Sprawdzenie czy uzupełniono wszystkie pola

    if (this.expense.Name === undefined || this.expense.Date === undefined ||
      this.expense.Reason === undefined || this.expense.Amount === undefined) {
        this.show('Upewnij się, że uzupełnione zostały wszystkie pola');
      } else {
        // Dodaje wydatek do listy
        this.expense.Reason = this.expense.Reason;
        this.expList.push(this.expense.Reason);

        totalExpense = totalExpense + this.expense.Amount;
        this.totalExpense = totalExpense;
        this.expense.Amount =  this.expense.Amount + 'zł';
        this.expListAmount.push(this.expense.Amount);

        // Zapis do pliku CSV
        // Nazwa, Data, Linie z wydatkami, źródło
        this.writeFile();

        // Wyczyszczenie inputów
        this.expense.Reason = undefined;
        this.expense.Amount = undefined;
      }



  }
  async show(message: string) {
    await Toast.show({
      text: message
    });
  }



    // Write all data to file in CSV format
    async writeFile() {
      let writtenData = this.expense.Name + ',' + this.expense.Date;
      for (let i = 0; i < this.expList.length; i++) {
        writtenData = writtenData + ',' + this.expList[i] + ',' + this.expListAmount[i];
      }
      writtenData = writtenData  + ',' + this.image;
      await Filesystem.writeFile({
        path: 'Expense_App/' + this.dateTime + '.txt',
        data: writtenData,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      this.show('Zapisano');
    }

    async fileDelete() {
      await Filesystem.deleteFile({
        path: 'Expense_App/' + this.dateTime + '.txt',
        directory: FilesystemDirectory.Documents
      });
      this.expense.Name = '';
      this.expense.Date = '';
      this.expense.Reason = '';
      this.expense.Amount = '';
      this.expList = [];
      this.expListAmount = [];
      totalExpense = 0;
      this.totalExpense = totalExpense;
      this.show('Usunięto');
    }

    async mkdir() {
      try {
        let ret = await Filesystem.mkdir({
          path: 'Expense_App',
          directory: FilesystemDirectory.Documents,
          recursive: false //  mkdir -p
        });
      } catch(e) {
        console.error('Nie udało się utworzyć folderu', e);
      }
    }
}


