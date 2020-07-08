import { HttpCommunicationsService } from './http-communications/http-communications.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [HttpCommunicationsService],
  imports: [HttpClientModule]
})
export class CoreModule { }
