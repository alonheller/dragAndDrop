import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Shapes } from '../../data/schema/shapes.enum';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {

  shapes = Shapes;
  constructor() { }

  ngOnInit() {
  }

}
