import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();
  @Output() select = new EventEmitter<Product>();

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.product.id);
  }

  onSelect(): void {
    this.select.emit(this.product);
  }
}