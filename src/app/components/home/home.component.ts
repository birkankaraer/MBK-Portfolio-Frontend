import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/contact.service';
import { contact } from '../../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactData: contact = {
    id: 0,
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  projects: Project[] = [
    {
      title: 'Rent a Car',
      thumbnail: '/assets/img/rentcar.png',
      images: ['/assets/img/home-page.png', '/assets/img/cart-summary.png', '/assets/img/payment.PNG'],
      description: 'Frontend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://github.com/birkankaraer/RentACar-Frontend'
    },
    {
      title: 'Rent a Car',
      thumbnail: '/assets/img/rental.png',
      images: ['/assets/img/rentacarswagger.png'],
      description: 'Backend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://github.com/birkankaraer/RentACar-Backend'
    },
    {
      title: 'StoreApp',
      thumbnail: '/assets/img/storeapp.png',
      images: ['/assets/img/storeapp1.png', '/assets/img/storeapp2.png', '/assets/img/storeapp3.png', '/assets/img/storeapp4.png', '/assets/img/storeapp5.png'],
      description: 'Backend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://github.com/birkankaraer/StoreApp'
    },
    {
      title: 'E-Commerce',
      thumbnail: '/assets/img/ecommerce.png',
      images: ['/assets/img/home-page.png', '/assets/img/cart-summary.png', '/assets/img/payment.PNG'],
      description: 'Backend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://github.com/birkankaraer/E-Commerce-Frontend'
    },
    {
      title: 'BudunAI',
      thumbnail: '/assets/img/budunai.jfif',
      images: ['/assets/img/home-page.png', '/assets/img/cart-summary.png', '/assets/img/payment.PNG'],
      description: 'Backend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://www.budunai.com/'
    },
  ];

  currentIndex = 0;

  constructor(private contactService: ContactService, private router: Router, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentIndex = 0; // Başlangıç indexini 0 olarak ayarlayın
  }

  nextSlide() {
    setTimeout(() => {
      this.currentIndex = (this.currentIndex === this.projects.length - 1) ? 0 : this.currentIndex + 1;
    }, 100); // 100ms gecikme ekleyerek sorunu çözmeye çalışın
  }

  prevSlide() {
    setTimeout(() => {
      this.currentIndex = (this.currentIndex === 0) ? this.projects.length - 1 : this.currentIndex - 1;
    }, 100); // 100ms gecikme ekleyerek sorunu çözmeye çalışın
  }

  getLeftIndex(): number {
    return (this.currentIndex === 0) ? this.projects.length - 1 : this.currentIndex - 1;
  }

  getRightIndex(): number {
    return (this.currentIndex === this.projects.length - 1) ? 0 : this.currentIndex + 1;
  }

  submitForm(contactForm: NgForm) {
    if (contactForm.invalid) {
      this.toastr.error('Lütfen tüm alanları doldurun!', 'Hata', {
        progressBar: true
      });
      return; // Form doğrulaması geçemediyse gönderme
    }
    this.contactService.contact(this.contactData).subscribe(
      response => {
        // Form gönderildikten sonra sayfayı home kısmına yönlendir
        this.router.navigate([""]);
        this.toastr.success('Mesajınız başarıyla gönderildi!', 'Başarılı', {
          progressBar: true
        });
        // Sayfayı yukarı doğru kaydır
        window.scrollTo(0, 0);
        // Formu temizle
        this.clearForm();
      },
      error => {
        console.error("Error submitting form:", error);
        this.toastr.error('Form gönderilirken bir hata oluştu!', 'Hata', {
          progressBar: true
        });
      }
    );
  }

  clearForm() {
    // Form verilerini temizle
    this.contactData = {
      id: 0,
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  openProjectDetail(project: Project): void {
    this.dialog.open(ProjectModalComponent, {
      data: project,
      width: '500px', // Pencerenin genişliği
      height: 'auto' // Pencerenin yüksekliği (otomatik boyutlandırma)
    });
  }
}
