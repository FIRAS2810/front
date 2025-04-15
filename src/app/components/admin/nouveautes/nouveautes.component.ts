import { Component } from '@angular/core';
import { NouveauteDTO, NouveauteService } from '../../../services/nouveaute.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveautes',
  templateUrl: './nouveautes.component.html',
  styleUrl: './nouveautes.component.css'
})
export class NouveautesComponent {


  nouveautes: NouveauteDTO[] = [];
  showModal = false;
  selectedFile: any = null;

  isEdit = false;

//pagination
currentPage: number = 0;
itemsPerPage: number = 3;

  formData: any = {
    description: ''
  };

  constructor(private nouveauteService: NouveauteService) {}

  ngOnInit() {
    this.loadNouveautes();
  }

  loadNouveautes() {
    this.nouveauteService.getAllNouveautes().subscribe(data => {
      this.nouveautes = data;
    });
  }

  openAddModal() {
    this.showModal = true;
    this.formData = { description: '' };
    this.selectedFile = null;
  }

  openEditModal(nouveaute: any) {
    this.isEdit = true;
    this.formData = { ...nouveaute };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    const formDataSend = new FormData();
    formDataSend.append('titre', this.formData.titre);
    formDataSend.append('description', this.formData.description);
    if (this.selectedFile) {
      formDataSend.append('fichier', this.selectedFile);
    }
  
    if (this.isEdit) {
      this.nouveauteService.updateNouveaute(this.formData.id, formDataSend).subscribe({
        next: () => {
          this.loadNouveautes();
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Nouveauté modifiée avec succès!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.nouveauteService.addNouveaute(formDataSend).subscribe({
        next: (response) => {
          this.loadNouveautes();
          this.closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Nouveauté ajoutée avec succès!',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
  

  deleteNouveaute(nouveaute: any) {
    Swal.fire({
      title: 'Es-tu sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.nouveauteService.deleteNouveaute(nouveaute.id).subscribe({
          next: () => {
            this.loadNouveautes();
            Swal.fire(
              'Supprimée !',
              'La nouveauté a été supprimée.',
              'success'
            );
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }
  

  

onPageChange(event: any) {
  this.currentPage = event.page;
  this.itemsPerPage = event.rows;
}



  
  
}
