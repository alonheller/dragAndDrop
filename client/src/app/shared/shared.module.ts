import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { StageComponent } from './stage/stage.component';
import { ShapeComponent } from './shape/shape.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [HeaderComponent, ToolboxComponent, StageComponent, ShapeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [HeaderComponent, ToolboxComponent, StageComponent, ShapeComponent]
})
export class SharedModule { }
