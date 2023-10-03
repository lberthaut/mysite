import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { ScholarComponent } from './pages/scholar/scholar.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'realisations', component: RealisationsComponent },
  { path: 'scholar', component: ScholarComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'aboutme', component: AboutmeComponent },
  // { path: 'settings', component: SettingsPageComponent },
  // {
  //   path: 'faq',
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'faq',
  //       pathMatch: 'full',
  //     },
  //     { path: 'faq', component: FaqPageComponent },
  //     { path: ':id', component: FaqQuestionPageComponent },
  //   ],
  // },
  // {
  //   path: 'issues',
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'theme',
  //       pathMatch: 'full',
  //     },
  //     { path: 'theme', component: IssuesPageComponent },
  //     { path: 'theme/:theme', component: IssuesThemesPageComponent },
  //     {
  //       path: 'theme/:theme/question/:questionId',
  //       component: QuestionsPageComponent,
  //     },
  //     {
  //       path: 'theme/:theme/question/:questionId/:subQuestionId',
  //       component: QuestionsPageComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
