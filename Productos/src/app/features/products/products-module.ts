import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [ProductPageComponent],
})
export class ProductsModule {}