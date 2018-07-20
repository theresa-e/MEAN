import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShintoService {
  numbers: number[]; // store coins
  transactions: any; // will store all transactions
  constructor() { }

  
  shareNumbers(): number[] {
    return this.numbers;
  }

  // All components will be able to use this.
  addToNumbers(num): void {
    console.log('Adding this num to numbers array: ', num);
    this.numbers.push(num);
  }
}
