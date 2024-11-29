import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LoginComponent } from './login.component'
import { UsersService } from '../../../services/users.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                HttpClientModule,
                BrowserAnimationsModule
            ],
            providers: [UsersService]
        }).compileComponents()

        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        expect(component).toBeTruthy()
    })



})
