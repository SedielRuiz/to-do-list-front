import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConsultToDoListComponent } from './consult.component'

describe('ConsultToDoListComponent', () => {
    let component: ConsultToDoListComponent
    let fixture: ComponentFixture<ConsultToDoListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConsultToDoListComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(ConsultToDoListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })



})
