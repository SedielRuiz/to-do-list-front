import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { HttpClientModule } from '@angular/common/http' // Asegúrate de importar esto
import { UsersService } from '../../../services/users.service'
import { LoginComponent } from './login.component'
import { of, throwError } from 'rxjs'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let mockRouter: jasmine.SpyObj<Router>
  let mockDialog: jasmine.SpyObj<MatDialog>
  let mockUserService: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    // Mock Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate'])

    // Mock MatDialog
    mockDialog = jasmine.createSpyObj('MatDialog', ['open'])

    // Mock UsersService
    mockUserService = jasmine.createSpyObj('UsersService', ['singIn'])

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule, HttpClientModule], // Incluye HttpClientModule aquí
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: UsersService, useValue: mockUserService } // Mockeamos UsersService
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // Otras pruebas aquí
})
