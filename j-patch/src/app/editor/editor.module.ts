import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgJsonEditorModule } from 'ang-jsoneditor' 

import { EditorRoutingModule } from './editor-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [ContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditorRoutingModule,
    NgJsonEditorModule
  ]
})
export class EditorModule { }
