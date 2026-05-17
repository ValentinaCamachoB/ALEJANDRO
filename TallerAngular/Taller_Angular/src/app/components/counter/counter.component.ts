import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  counter = 0;

  decrementar() {
    this.counter--;
  }

  incrementar() {
    this.counter++;
  }

  resetear() {
    this.counter = 0;
  }
}