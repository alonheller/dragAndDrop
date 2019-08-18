import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Shapes} from '../../data/schema/shapes.enum';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShapeComponent implements OnInit {
  shapes = Shapes;
  @Input() shape: Shapes;

  constructor() { }

  ngOnInit() {
  }

}
