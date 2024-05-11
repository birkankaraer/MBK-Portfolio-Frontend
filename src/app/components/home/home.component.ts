import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HireusService } from '../../services/hireus.service';
import { Hireus } from '../../models/hireus';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hireUsData: Hireus = {
    id: 0,
    name: '',
    email: '',
    work: ''
  };

  @ViewChild('hireUsForm') hireUsForm!: NgForm;

  constructor(private hireusService: HireusService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm(hireUsForm: NgForm) {
    const hireusData: Hireus = {
      id: 0,
      name: this.hireUsData.name,
      email: this.hireUsData.email,
      work: this.getSelectedWorks()
    };

    this.hireusService.hireUs(hireusData).subscribe(
      response => {
        console.log("Form submitted successfully:", response);
        // Form gönderildikten sonra sayfayı home kısmına yönlendir
        this.router.navigate([""]);
        this.toastr.success('İsteğiniz başarıyla gönderildi!', 'Başarılı',{
          progressBar: true
        });
        // Sayfayı yukarı doğru kaydır
        window.scrollTo(0, 0);
        // Formu temizle
        this.clearForm();

        setTimeout(() => {
          window.location.reload();
        },1000);
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
    this.hireUsData = {
      id: 0,
      name: '',
      email: '',
      work: ''
    };
    // Formu sıfırla
    this.hireUsForm.resetForm();
  }

  getSelectedWorks(): string {
    // Checkbox seçimlerini al ve virgülle ayrılmış bir string olarak döndür
    const selectedWorks: string[] = [];

    // Checkbox'ların durumunu kontrol ederek seçilen işleri al
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      selectedWorks.push(checkbox.value);
    });

    // Virgülle ayrılmış dizeyi oluştur
    return selectedWorks.join(',');
  }
}


