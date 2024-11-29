import { HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token')
    if(token) {
        const cloned = req.clone({
            setHeaders: {
                authorization: `Bearer ${ token }`
            },
        })
        return next(cloned)
    }

    return next(req).pipe(
        catchError(error => {
            console.log("dsfsd ", error)
            if (error.status === 401)
                window.location.href = '/login'

            return throwError(() => error)
        })
    )
}
