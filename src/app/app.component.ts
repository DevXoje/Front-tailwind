import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/partials/header/header.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
const components = [HeaderComponent, FooterComponent];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Front-tailwind';
}
