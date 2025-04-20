import { Component, OnInit } from '@angular/core';
import { DescriptionService } from '../../../../services//description.service';

@Component({
  selector: 'app-description-smbsa',
  templateUrl: './description-smbsa.component.html',
  styleUrls: ['./description-smbsa.component.css']
})
export class DescriptionSmbsaComponent {

  textContent: string = '';

  constructor(private descriptionService: DescriptionService) {}

  // 🔥 La configuration de la barre d’outils
  quillModules = {
    toolbar: [
      [{ 'font': ['kumbh', 'open-sans', 'montserrat'] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      [{ 'color': ['#66BB6A', '#EF5350', '#42A5F5', '#7E57C2', '#FFA726'] }]
    ]
  };

  ngOnInit(): void {
    this.descriptionService.getDescription().subscribe(data => {
      this.textContent = data.contenuHtml || '';
    });
  }

  saveDescription() {
  this.descriptionService.updateDescription(this.textContent).subscribe({
    next: () => {
      alert('✅ Description enregistrée avec succès !');
    },
    error: (err) => {
      console.error('❌ Erreur lors de la sauvegarde :', err);
    }
  });
}

}
