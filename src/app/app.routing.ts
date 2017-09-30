import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'login/:expired', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent}
]

export const routing = RouterModule.forRoot(appRoutes);
