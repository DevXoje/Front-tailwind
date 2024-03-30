import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
const components = [HeaderComponent, FooterComponent];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...components],
  template: `
    <div class="flex flex-col h-screen">
      <app-header class=""> </app-header>
      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
      <!--       <app-footer class=""></app-footer> -->
    </div>
  `
})
export class AppComponent {}
