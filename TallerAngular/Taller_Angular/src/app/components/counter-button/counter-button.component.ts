import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter-button',
  standalone: false,
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss',
})
export class CounterButtonComponent {
  @Input() text: string = '';
  @Output() salida = new EventEmitter();

  onClick() {
    this.salida.emit();
  }
}