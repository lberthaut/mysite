import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'realisations', component: AccueilComponent },
  { path: 'scholar', component: AccueilComponent },
  { path: 'professional', component: AccueilComponent },
  { path: 'aboutme', component: AccueilComponent },
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
