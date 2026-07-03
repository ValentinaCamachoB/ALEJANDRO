import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonModule } from './features/pokemon/pokemon.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PokemonModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}