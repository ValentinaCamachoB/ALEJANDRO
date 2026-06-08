import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnChanges {
  @Input() selectedProduct: Product | null = null;
  @Output() formSubmitted = new EventEmitter<void>();

  nombre: string = '';
  precio: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.nombre = this.selectedProduct.nombre;
      this.precio = this.selectedProduct.precio;
    }
  }

  get isValid(): boolean {
    return (
      this.nombre.trim() !== '' &&
      this.precio !== null &&
      this.precio > 0
    );
  }

  get isEditing(): boolean {
    return this.selectedProduct !== null;
  }

  onSubmit(): void {
    if (!this.isValid) return;

    if (this.isEditing && this.selectedProduct) {
      this.productService.updateProduct(
        this.selectedProduct.id,
        this.nombre.trim(),
        this.precio!
      );
    } else {
      this.productService.createProduct(this.nombre.trim(), this.precio!);
    }

    this.nombre = '';
    this.precio = null;
    this.formSubmitted.emit();
  }
}