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

const routes: Routes = [{ path: '', component:AcceuilComponent },
  { path: 'header', component:HeaderComponent },
  { path: 'foter', component:FooterComponent },
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'admin-page', component:AdminPageComponent ,canActivate: [AdminGuard],children: [
      
      { path: 'demandes', component: DemandesComponent },
      { path: 'nouveautes', component: NouveautesComponent },
    
    
    ]},
      


  { path: 'adherent-page', component:AdherentPageComponent ,canActivate: [AdherentGuard],children: [
      
    { path: 'profil-adherent', component: ProfilAdherentComponent }]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
