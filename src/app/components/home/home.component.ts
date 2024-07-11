import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/contact.service';
import { contact } from '../../models/contact';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../models/project';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { Tech } from '../../models/tech';
import { TechService } from '../../services/tech.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contactData: contact = {
    id: 0,
    name: '',
    email: '',
    subject: '',
    message: '',
  };


  techs: Tech[] = [];

  projects: Project[] = [
    {
      title: 'Rent a Car',
      thumbnail: '/assets/img/rentcar.png',
      images: [
        '/assets/img/rentacarhome.png',
        '/assets/img/rentacarcars.png',
        '/assets/img/rentacarfiltercars.png',
        '/assets/img/rentacarsearch.png',
        '/assets/img/rentacarfilter.png',
        '/assets/img/rentacarcontact.png',
        '/assets/img/rentacarlogin.png',
        '/assets/img/rentacarregister.png',
        '/assets/img/rentacarpayment.png',
        '/assets/img/rentacarupdateprofile.png',
        '/assets/img/rentacardashboard.png',
        '/assets/img/rentacarcaradd.png',
        '/assets/img/rentacarcardelete.png',
        '/assets/img/rentacarbrandadd.png',
        '/assets/img/rentacarcoloradd.png',
      ],
      description:
        'Frontend side of a car rental web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/RentACar-Frontend',
    },
    {
      title: 'Rent a Car',
      thumbnail: '/assets/img/rental.png',
      images: [
        '/assets/img/rentacarfolder.gif',
        '/assets/img/rentacarswagger.gif',
        '/assets/img/rentacardb.png',
      ],
      description:
        'Backend side of a car rental web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/RentACar-Backend',
    },
    {
      title: 'StoreApp',
      thumbnail: '/assets/img/storeapp.png',
      images: [
        '/assets/img/storeapphome.png',
        '/assets/img/storeappproducts.png',
        '/assets/img/storeappcategories.png',
        '/assets/img/storeappcontact.png',
        '/assets/img/storeappdashboard.png',
        '/assets/img/storeapppm.png',
        '/assets/img/storeappcm.png',
        '/assets/img/storeapporders.png',
        '/assets/img/storeapprm.png',
        '/assets/img/storeappum.png',
        '/assets/img/storeapplm.png',
        '/assets/img/storeappregisterpage.png',
      ],
      description:
        'Full stack side of a store web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/StoreApp',
    },
    {
      title: 'E-Commerce',
      thumbnail: '/assets/img/ecommerce.png',
      images: [
        '/assets/img/ecommercehome.png',
        '/assets/img/ecomfilter.png',
        '/assets/img/ecomsearch.png',
        '/assets/img/ecomaddedcart.png',
        '/assets/img/ecomlogin.png',
        '/assets/img/ecomproductadd.png',
      ],
      description:
        'Frontend side of a e-commerce web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/E-Commerce-Frontend',
    },
    {
      title: 'E-Commerce',
      thumbnail: '/assets/img/ecom.png',
      images: [
        '/assets/img/ecommercefolder.gif',
        '/assets/img/ecommerceswagger.gif',
        '/assets/img/ecomdb.png',
      ],
      description:
      'Backend side of a e-commerce web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/E-Commerce-Backend',
    },
    {
      title: 'BudunAI',
      thumbnail: '/assets/img/budunai.jfif',
      images: [
        '/assets/img/budunaidev.png',
      ],
      description:
        'We have made improvements to the backend of the Budunai official website. Click here for details.',
      githubLink: 'https://www.budunai.com/',
    },
    {
      title: 'Nevera Portal',
      thumbnail: '/assets/img/neverap.png',
      images: [
        '/assets/img/nphome.png',
        '/assets/img/npadmin.png',
        '/assets/img/npblog.png',
        '/assets/img/npfolder.gif',
        '/assets/img/npdbdiagram.png',
      ],
      description:
        'Web site with admin panel that I developed with asp.net core mvc technology. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/E-Commerce-Backend',
    },
    {
      title: 'Hotel App',
      thumbnail: '/assets/img/hotelapp.png',
      images: [
        '/assets/img/hotelappgithub.png',
        '/assets/img/hotelappswagger.gif',
        '/assets/img/hotelappfolder.gif',
        '/assets/img/hotelappdbdiagram.png',
      ],
      description:
        'Backend side of a hotelapp web solution. Click for project details.',
      githubLink: 'https://github.com/birkankaraer/Dotnet-BootCamp-HotelApp',
    },
  ];

  currentIndex = 0;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private techService: TechService
  ) {}

  ngOnInit(): void {
    this.currentIndex = 0; // Başlangıç indexini 0 olarak ayarlayın
    this.fetchTechDetails([1, 2, 3])
  }


  fetchTechDetails(ids: number[]): void {
    ids.forEach(id => {
      this.techService.getTechById(id).subscribe(
        (tech: Tech) => {
          this.techs.push(tech);
        },
        (error) => {
          console.error('Error fetching tech details:', error);
        }
      );
    });
  }

  nextSlide() {
    setTimeout(() => {
      this.currentIndex =
        this.currentIndex === this.projects.length - 1
          ? 0
          : this.currentIndex + 1;
    }, 100); // 100ms gecikme ekleyerek sorunu çözmeye çalışın
  }

  prevSlide() {
    setTimeout(() => {
      this.currentIndex =
        this.currentIndex === 0
          ? this.projects.length - 1
          : this.currentIndex - 1;
    }, 100); // 100ms gecikme ekleyerek sorunu çözmeye çalışın
  }

  getLeftIndex(): number {
    return this.currentIndex === 0
      ? this.projects.length - 1
      : this.currentIndex - 1;
  }

  getRightIndex(): number {
    return this.currentIndex === this.projects.length - 1
      ? 0
      : this.currentIndex + 1;
  }

  submitForm(contactForm: NgForm) {
    if (contactForm.invalid) {
      this.toastr.error('Lütfen tüm alanları doldurun!', 'Hata', {
        progressBar: true,
      });
      return; // Form doğrulaması geçemediyse gönderme
    }
    this.contactService.contact(this.contactData).subscribe(
      (response) => {
        // Form gönderildikten sonra sayfayı home kısmına yönlendir
        this.router.navigate(['']);
        this.toastr.success('Mesajınız başarıyla gönderildi!', 'Başarılı', {
          progressBar: true,
        });
        // Sayfayı yukarı doğru kaydır
        window.scrollTo(0, 0);
        // Formu temizle
        this.clearForm();
      },
      (error) => {
        console.error('Error submitting form:', error);
        this.toastr.error('Form gönderilirken bir hata oluştu!', 'Hata', {
          progressBar: true,
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
      message: '',
    };
  }

  openProjectDetail(project: Project): void {
    this.dialog.open(ProjectModalComponent, {
      data: project,
      width: '800px', // Pencerenin genişliği
      height: 'auto', // Pencerenin yüksekliği (otomatik boyutlandırma)
    });
  }
}
