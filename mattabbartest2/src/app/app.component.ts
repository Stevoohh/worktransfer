import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mattabbartest2';

  private routerSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Navigation ended:', event.urlAfterRedirects);
        // Weitere Logik hier
        this.router.navigate(['/info/52587233']);
      });
  }

  ngOnDestroy(): void {
    // Vermeidet Speicherlecks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  } 
}
