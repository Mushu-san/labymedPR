import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PokeConsumoService } from './poke-consumo.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PokeCartaComponent } from './poke-carta/poke-carta.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemones',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  providers: [PokeConsumoService],
  templateUrl: './pokemones.component.html',
  styleUrl: './pokemones.component.scss',
})
export class PokemonesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['no', 'name'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokeConsumoService: PokeConsumoService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pokeConsumoService.getPokemones().subscribe((data: any) => {
      const mapper = data.results.map((pokemon: any, index: number) => {
        return {
          no: index + 1,
          name: pokemon.name,
          url: pokemon.url,
        };
      });

      this.dataSource.data = mapper;
    });
  }

  seePokemon(pokemonUrl: any) {
    this.pokeConsumoService.getPokemon(pokemonUrl).subscribe(async (data: any) => {
      const ultima: any[] = []
      const habilidades = await data.abilities.map(async (ab: any) => {
      const prueba = await lastValueFrom(
          this.pokeConsumoService.getTranslation(ab.ability.name)
        ).then().then();
        ultima.push(prueba.names[5].name);
        return prueba.names[5].name;
      });

      console.log(ultima);
      if(ultima)
      this.dialog.open(PokeCartaComponent, {
        data: {
          name: data.name,
          image: data.sprites.front_default,
          abilities: data.abilities,
          habilidades: ultima,
        },
      });
    });
  }
}
