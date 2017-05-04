import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: TimelineComponent, canActivate: [AuthGuard] },
]

export const routing = RouterModule.forRoot(appRoutes);
