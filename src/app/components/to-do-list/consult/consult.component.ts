import { AfterViewInit, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { ToDoListService } from '../../../services/to-do-list.service'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatGridListModule } from '@angular/material/grid-list'
import { Router } from '@angular/router'
import { UsersService } from '../../../services/users.service'

@Component({
    selector: 'app-consult',
    standalone: true,
    imports: [
        CommonModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatCheckboxModule
    ],
    templateUrl: './consult.component.html',
    styleUrl: './consult.component.css'
})
export class ConsultToDoListComponent implements AfterViewInit{
    toDoListService = inject(ToDoListService)
    userService = inject(UsersService)
    dataSource: ToDoList[] = []
    description: string = ''
    filters: Filter[] = [
      {value: '', viewValue: 'All'},
      {value: '0', viewValue: 'Pending'},
      {value: '1', viewValue: 'Finish'},
    ]
    filter: Filter

    constructor(
        private router: Router,
        private dialog: MatDialog
    ){
        this.filter = this.filters[0]
    }

    async ngAfterViewInit() {
        await this.getToDoList()
    }

    async getToDoList(filters: object = {}){
      const response: any = await this.toDoListService.getToDoList(filters).catch((response: any) => {
            if(response.error?.statusCode == 401){
                this.userService.logout()
                this.router.navigate(['/login'])
            }

      })
      this.dataSource = response.data
    }

	async delete(id: number) {
		await this.toDoListService.delete(id).catch((response: any) => {
            this.dialog.open(ErrorDialogComponent, {
                data: {
                    message: response.error?.message,
                    statusCode: response.error?.statusCode
                }
            })
    })
		await this.getToDoList()
	}

	async create() {
        try {
            await this.toDoListService.create({description: this.description})
            await this.getToDoList()

        } catch (response: any) {
            this.dialog.open(ErrorDialogComponent, {
                data: {
                    message: response.error?.message,
                    statusCode: response.error?.statusCode
                }
            })
        }

    }

	async update(toDoList: ToDoList, checked: boolean) {
        try {
            await this.toDoListService.update(toDoList.id, {
                description: toDoList.description,
                finish: checked
            })

        } catch (response: any) {
            this.dialog.open(ErrorDialogComponent, {
                data: {
                    message: response.error?.message,
                    statusCode: response.error?.statusCode
                }
            })
        }

    }

	async onFilterChange(item: Filter) {
		let filter = {}
		if(item.value)
			filter = {finish: item.value == '1' ? true : false}
		await this.getToDoList(filter)
	}
}

export interface ToDoList {
    id: number
    description: string
    finish: boolean
}

export interface Filter {
    value: string
    viewValue: string
}
