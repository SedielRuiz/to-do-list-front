import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenuComponent } from './menu.component'
import { UsersService } from '../../services/users.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('MenuComponent', () => {
  let component: MenuComponent
  let fixture: ComponentFixture<MenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuComponent,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        UsersService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // Proporciona un mock para los parámetros de la ruta
            snapshot: {
              paramMap: {
                get: () => null // Proporciona un mock para el método get de paramMap
              }
            }
          }
        }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
