import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShintoService {
  numbers: number[]; // store coins
  transactions: any; // will store all transactions, generate specific ID

  constructor() { }

  
  shareNumbers(): number[] {
    return this.numbers;
  }

  // All components will use to add to number array
  addToNumbers(num): void {
    console.log('Adding this num to numbers array: ', num);
    this.numbers.push(num);
  }

  // Function to generate random 
}
