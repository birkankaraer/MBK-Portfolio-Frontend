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

  project: Project[] = [
    {
      title: 'Rent a Car',
      image: '/assets/img/home-page.png',
      description: 'Frontend side of a car rental web solution. Click here to go to the repo.',
      githubLink: 'https://github.com/birkankaraer/RentACar-Frontend'
    },
    // diğer projeler
  ];

  constructor(private contactService: ContactService, private router: Router, private toastr: ToastrService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  submitForm(contactForm: NgForm) {
    if (contactForm.invalid) {
      this.toastr.error('Lütfen tüm alanları doldurun!', 'Hata',{
        progressBar: true
      });
      return; // Form doğrulaması geçemediyse gönderme
    }
    this.contactService.contact(this.contactData).subscribe(
      response => {
        // Form gönderildikten sonra sayfayı home kısmına yönlendir
        this.router.navigate([""]);
        this.toastr.success('Mesajınız başarıyla gönderildi!', 'Başarılı',{
          progressBar: true
        });
        // Sayfayı yukarı doğru kaydır
        window.scrollTo(0, 0);
        // Formu temizle
        this.clearForm();
      },
      error => {
        console.error("Error submitting form:", error);
        this.toastr.error('Form gönderilirken bir hata oluştu!', 'Hata',{
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

  openProjectDetail(project: any): void {
    this.dialog.open(ProjectModalComponent, {
      data: project
    });
  }
}
