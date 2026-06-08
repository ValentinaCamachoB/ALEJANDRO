import { Component } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  selectedProduct: Product | null = null;

  onSelectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  onFormSubmitted(): void {
    this.selectedProduct = null;
  }
}