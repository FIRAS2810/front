import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { DemandeAdhesionComponent } from './components/demande-adhesion/demande-adhesion.component';
import { HttpClientModule } from '@angular/common/http';
import { DemandesComponent } from './components/admin/demandes/demandes.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 // Seulement si tu utilises <p-paginator> à part
import { DropdownModule } from 'primeng/dropdown';   // Pour le dropdown de sélection (10, 25...)
import Swal from 'sweetalert2';
import { AdherentPageComponent } from './components/adherent/adherent-page/adherent-page.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'primeng/carousel';
import { ProfilAdherentComponent } from './components/adherent/profil-adherent/profil-adherent.component';
import { NouveautesComponent } from './components/admin/nouveautes/nouveautes.component';
import { EditorModule } from 'primeng/editor';
import { PaginatorModule } from 'primeng/paginator';
import { FooterComponent } from './components/footer/footer.component';
import { AdherentsComponent } from './components/admin/adherents/adherents.component';
import { QuillModule } from 'ngx-quill';
import { DescriptionSmbsaComponent } from './components/admin/gerer_page/description-smbsa/description-smbsa.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HistoriqueCotisationComponent } from './components/adherent/historique-cotisation/historique-cotisation.component';
import { ParametrageComponentComponent } from './components/admin/parametrage-component/parametrage-component.component';
import { TransfertsComponent } from './components/adherent/transferts/transferts.component';
import { ValidationTransfertsComponentComponent } from './components/admin/validation-transferts-component/validation-transferts-component.component';
import { HistoriqueTransfertsComponent } from './components/adherent/historique-transferts/historique-transferts.component';
import { NouveauteDetailsComponent } from './components/nouveaute-details/nouveaute-details.component';
import { DemandeReclamationComponent } from './components/demande-reclamation/demande-reclamation.component';
import { TraiterReclamationsComponent } from './components/admin/traiter-reclamations/traiter-reclamations.component';
import { DemandeDemissionComponent } from './components/adherent/demande-demission/demande-demission.component';
import { AdminDemissionComponent } from './components/admin/admin-demission/admin-demission.component';
import { AdminCompteAttenteComponent } from './components/admin/admin-compte-attente/admin-compte-attente.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { AdminAcceuilComponent } from './components/admin-acceuil/admin-acceuil.component';
import { RenitialiserMdpComponent } from './components/renitialiser-mdp/renitialiser-mdp.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    AdminPageComponent,
    DemandeAdhesionComponent,
    DemandesComponent,
    AdherentPageComponent,
    ProfilAdherentComponent,
    NouveautesComponent,
    FooterComponent,
    AdherentsComponent,
    DescriptionSmbsaComponent,
    HistoriqueCotisationComponent,
    ParametrageComponentComponent,
    TransfertsComponent,
    ValidationTransfertsComponentComponent,
    HistoriqueTransfertsComponent,
    NouveauteDetailsComponent,
    DemandeReclamationComponent,
    TraiterReclamationsComponent,
    DemandeDemissionComponent,
    AdminDemissionComponent,
    AdminCompteAttenteComponent,
    AdminDashboardComponent,
    AdminAcceuilComponent,
    RenitialiserMdpComponent,
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    TagModule,
    BrowserAnimationsModule,
    DropdownModule,
    SplitButtonModule,
    FontAwesomeModule,
    CarouselModule,
    EditorModule,
    PaginatorModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    ChartModule,
    ToastModule,
    
    
  ],
  providers:[MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
