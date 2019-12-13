import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { PostArticleComponent } from './post-article/post-article.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {path: 'article/:id', component: ArticleComponent},
  {path: 'articles', component: ArticleListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'post', component: PostArticleComponent},
  {path: 'me', component: MeComponent},
  {path: 'search/:keywords', component: SearchComponent},
  {path: '', redirectTo: '/articles', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
