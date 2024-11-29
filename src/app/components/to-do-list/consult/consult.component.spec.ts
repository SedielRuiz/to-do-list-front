import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConsultToDoListComponent } from './consult.component'
import { UsersService } from '../../../services/users.service'
import { ToDoListService } from '../../../services/to-do-list.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'

describe('ConsultToDoListComponent', () => {
    let component: ConsultToDoListComponent
    let fixture: ComponentFixture<ConsultToDoListComponent>
    let toDoListService: jasmine.SpyObj<ToDoListService>
    let userService: jasmine.SpyObj<UsersService>
    let router: any

    beforeEach(async () => {
        const toDoListServiceSpy = jasmine.createSpyObj('ToDoListService', ['getToDoList', 'create', 'update', 'delete'])
        const userServiceSpy = jasmine.createSpyObj('UsersService', ['logout'])
        router = {
          navigate: jasmine.createSpy('navigate')
        }

        await TestBed.configureTestingModule({
            imports: [
              ConsultToDoListComponent,
              HttpClientModule,
              BrowserAnimationsModule
            ],
            providers: [
              { provide: ToDoListService, useValue: toDoListServiceSpy },
              { provide: UsersService, useValue: userServiceSpy },
              { provide: Router, useValue: router }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(ConsultToDoListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
        toDoListService = TestBed.inject(ToDoListService) as jasmine.SpyObj<ToDoListService>
        userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get an empty to-do list', async () => {
      toDoListService.getToDoList.and.returnValue(Promise.resolve({ data: [] }))
      await component.getToDoList()
      expect(component.dataSource).toEqual([])
    })

    it('should get a filtered to-do list', async () => {
      const mockData = [{ id: 1, description: 'Test', finish: false }]
      toDoListService.getToDoList.and.returnValue(Promise.resolve({ data: mockData }))
      await component.getToDoList({ finish: false })
      expect(Array.isArray(component.dataSource)).toBeTrue()
    })

    it('should create a new to do item', async () => {
      const newToDo = { description: 'New Task'}
      toDoListService.create.and.returnValue(Promise.resolve({ data: newToDo }))
      component.description = newToDo.description
      await component.create()
      expect(toDoListService.create).toHaveBeenCalledWith({ description: newToDo.description })
      expect(toDoListService.getToDoList).toHaveBeenCalled()
    })

    it('should update a to do item', async () => {
      const updateToDo = { id: 1, description: 'Test', finish: true }
      toDoListService.update.and.returnValue(Promise.resolve({ data: updateToDo }))
      await component.update(updateToDo, true)
      expect(toDoListService.update).toHaveBeenCalledWith(1, {
        finish: updateToDo.finish,
        description: updateToDo.description,
      })
      expect(toDoListService.getToDoList).toHaveBeenCalled()
    })

})
