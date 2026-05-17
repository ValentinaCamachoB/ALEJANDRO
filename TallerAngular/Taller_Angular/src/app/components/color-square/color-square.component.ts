import { Component } from '@angular/core';

@Component({
  selector: 'app-color-square',
  standalone: false,
  templateUrl: './color-square.component.html',
  styleUrl: './color-square.component.scss',
})
export class ColorSquareComponent {
  currentColor: string = 'Blanco';
  selectedColor: string = '#ffffff';

  colors = [
    { name: 'Rojo',     value: '#e74c3c' },
    { name: 'Azul',     value: '#3498db' },
    { name: 'Verde',    value: '#2ecc71' },
    { name: 'Amarillo', value: '#f1c40f' },
  ];

  cambiarColor(nombre: string, valor: string) {
    this.currentColor = nombre;
    this.selectedColor = valor;
  }
}