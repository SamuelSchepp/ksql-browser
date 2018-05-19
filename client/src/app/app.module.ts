import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TopicsComponent } from './topics/topics/topics.component';
import { PostToTopicComponent } from './topics/post-to-topic/post-to-topic.component';
import { CreateTopicComponent } from './topics/create-topic/create-topic.component';
import { TopicComponent } from './topics/topic/topic.component';
import { StreamsComponent } from './ksql/streams/streams.component';
import { TopicPageComponent } from './topics/topic-page/topic-page.component';
import { KsqlPageComponent } from './ksql/ksql-page/ksql-page.component';
import {RouterModule, Routes} from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { DescribeComponent } from './ksql/describe/describe.component';
import { TablesComponent } from './ksql/tables/tables.component';
import { RunKsqlComponent } from './ksql/run-ksql/run-ksql.component';

const appRoutes: Routes = [
  { path: 'topics-page', component: TopicPageComponent },
  { path: 'ksql-page',   component: KsqlPageComponent },
  { path: '**',     redirectTo: '/topics-page', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    PostToTopicComponent,
    CreateTopicComponent,
    TopicComponent,
    StreamsComponent,
    TopicPageComponent,
    KsqlPageComponent,
    LogoComponent,
    DescribeComponent,
    TablesComponent,
    RunKsqlComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
