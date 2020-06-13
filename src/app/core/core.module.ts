import { HttpCommunicationsService } from './http-communications/http-communications.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TodosServerService } from './services/todos-server.service';

@NgModule({
  declarations: [],
  providers: [HttpCommunicationsService, TodosServerService],
  imports: [HttpClientModule]
})
export class CoreModule { }
