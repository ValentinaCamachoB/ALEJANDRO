import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private nextId: number = 1;

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(nombre: string, precio: number): void {
    this.products.push({
      id: this.nextId++,
      nombre,
      precio,
    });
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }

  updateProduct(id: number, nombre: string, precio: number): void {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.nombre = nombre;
      product.precio = precio;
    }
  }
}