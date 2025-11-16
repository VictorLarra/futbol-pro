import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEquipoComponent } from './crear.component';

describe('CrearComponent', () => {
  let component: CrearEquipoComponent;
  let fixture: ComponentFixture<CrearEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
