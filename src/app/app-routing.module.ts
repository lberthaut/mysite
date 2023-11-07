import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { PokepageComponent } from './pages/pokepage/pokepage.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'realisations', component: RealisationsComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'poke', component: PokepageComponent },
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
