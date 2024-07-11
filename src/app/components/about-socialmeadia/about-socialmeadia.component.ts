import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-socialmeadia',
  templateUrl: './about-socialmeadia.component.html',
  styleUrls: ['./about-socialmeadia.component.css']
})
export class AboutSocialmeadiaComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.querySelectorAll(".button-group > div").forEach((element: HTMLElement) => {
      element.addEventListener("click", () => {
        this.elementRef.nativeElement.querySelectorAll('.button-group > div.active').forEach((activeElement: HTMLElement) => {
          if (activeElement !== element) {
            activeElement.classList.remove('active');
          }
        });
        element.classList.toggle("active");
      });
    });
  }

  goToLinkedin(): void {
    window.location.href = 'https://www.linkedin.com'; // LinkedIn URL'sine yönlendirme
  }


}
