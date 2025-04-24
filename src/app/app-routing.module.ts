import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminGuard } from './guards/admin.guard';
import { DemandesComponent } from './components/admin/demandes/demandes.component';
import { AdherentPageComponent } from './components/adherent/adherent-page/adherent-page.component';
import { ProfilAdherentComponent } from './components/adherent/profil-adherent/profil-adherent.component';
import { AdherentGuard } from './guards/adherent.guard';
import { NouveautesComponent } from './components/admin/nouveautes/nouveautes.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdherentsComponent } from './components/admin/adherents/adherents.component';
import { DescriptionSmbsaComponent } from './components/admin/gerer_page/description-smbsa/description-smbsa.component';
import { HistoriqueCotisationComponent } from './components/adherent/historique-cotisation/historique-cotisation.component';
import { ParametrageComponentComponent } from './components/admin/parametrage-component/parametrage-component.component';
import { TransfertsComponent } from './components/adherent/transferts/transferts.component';
import { ValidationTransfertsComponentComponent } from './components/admin/validation-transferts-component/validation-transferts-component.component';
import { HistoriqueTransfertsComponent } from './components/adherent/historique-transferts/historique-transferts.component';
import { NouveauteDetailsComponent } from './components/nouveaute-details/nouveaute-details.component';



const routes: Routes = [{ path: '', component:AcceuilComponent },
  { path: 'nouveautes/:id', component:NouveauteDetailsComponent },
  { path: 'header', component:HeaderComponent },
  { path: 'foter', component:FooterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'admin-page', component:AdminPageComponent ,canActivate: [AdminGuard],children: [
      
      { path: 'demandes', component: DemandesComponent },
      { path: 'nouveautes', component: NouveautesComponent },
      { path: 'adherents', component: AdherentsComponent },
      { path: 'description-smbsa', component: DescriptionSmbsaComponent },
      { path: 'parametrage-page', component: ParametrageComponentComponent },
      { path: 'gerer-transferts', component: ValidationTransfertsComponentComponent },
    
    ]},
      


  { path: 'adherent-page', component:AdherentPageComponent ,canActivate: [AdherentGuard],children: [
      
    { path: 'profil-adherent', component: ProfilAdherentComponent },
    { path: 'cotisation-adherent', component:HistoriqueCotisationComponent },
    { path: 'transferts', component: TransfertsComponent },
    { path: 'historique-transferts', component: HistoriqueTransfertsComponent },

  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
