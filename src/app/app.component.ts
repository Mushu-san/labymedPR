import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { PokeConsumoService } from './pokemones/poke-consumo.service';
import { MatDialog } from '@angular/material/dialog';
import { PokeCartaComponent } from './pokemones/poke-carta/poke-carta.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  providers: [PokeConsumoService],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeproject';

  name: FormControl = new FormControl('');

  constructor(private pokeConsumoService: PokeConsumoService, private dialog: MatDialog) { }
  
  search() {
    this.pokeConsumoService.getPokemonByName(this.name.value).subscribe((data: any) => {
      console.log(data);
      this.dialog.open(PokeCartaComponent, {
        data: {
          name: data.name,
          image: data.sprites.front_default,
          abilities: data.abilities,
        },
      });
    }, (error) => 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pokemon no encontrado',
      })
    );
  }
  
}
