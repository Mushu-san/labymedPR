import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { PokeConsumoService } from '../poke-consumo.service';

@Component({
  selector: 'app-poke-carta',
  standalone: true,
  imports: [MatCardModule,
    MatDialogModule,
    MatDialogActions
  ],
  providers: [PokeConsumoService],
  templateUrl: './poke-carta.component.html',
  styleUrl: './poke-carta.component.scss'
})
export class PokeCartaComponent {
  image: string = '';
  name: string = '';
  abilities: any = [];
  habilidades: any = [];

  constructor(
    public dialogRef: MatDialogRef<PokeCartaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  ngOnInit(): void {
    this.image = this.data?.image;
    this.name = this.data?.name;
    this.abilities = this.data?.abilities.map((object: any) => object.ability.name);
    this.habilidades = this.data?.habilidades;
  }
}
