import { Component } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {

    model = new go.GraphLinksModel(
        [
            { key: 1, text: "Triangle", color: "lightblue" },
            { key: 2, text: "Circle", color: "orange" },
            { key: 3, text: "Square", color: "lightgreen" }
        ],
        [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 2 }
        ]);

}
