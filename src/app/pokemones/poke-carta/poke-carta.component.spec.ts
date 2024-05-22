import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCartaComponent } from './poke-carta.component';

describe('PokeCartaComponent', () => {
  let component: PokeCartaComponent;
  let fixture: ComponentFixture<PokeCartaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeCartaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeCartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
