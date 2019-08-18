import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';

@NgModule({
  declarations: [HeaderComponent, DiagramEditorComponent, ImgViewerComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [HeaderComponent, DiagramEditorComponent, ImgViewerComponent]
})
export class SharedModule { }
