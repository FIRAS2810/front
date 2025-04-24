import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NouveauteService, NouveauteDTO } from '../../services/nouveaute.service';

@Component({
  selector: 'app-nouveaute-details',
  templateUrl: './nouveaute-details.component.html',
  styleUrl: './nouveaute-details.component.css'
})
export class NouveauteDetailsComponent implements OnInit{

  nouveaute: NouveauteDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private nouveauteService: NouveauteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nouveauteService.getNouveauteById(+id).subscribe((data) => {
        this.nouveaute = data;
      });
    }
  }

  isPdf(): boolean {
    return this.nouveaute?.typeFichier === 'PDF';
  }

  scrollToFooter() {
    const footer = document.querySelector('app-footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

}