import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Output() selectProduct = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}

  get products(): Product[] {
    return this.productService.getProducts();
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id);
  }

  onSelect(product: Product): void {
    this.selectProduct.emit(product);
  }
}