import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TopicsComponent } from './topics/topics.component';
import { PostToTopicComponent } from './post-to-topic/post-to-topic.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicComponent } from './topic/topic.component';


@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    PostToTopicComponent,
    CreateTopicComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
