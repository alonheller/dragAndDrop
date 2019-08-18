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
            { key: 1, category: "circle" },
            { key: 2, category: "square" },
            { key: 3, category: "triangle" },
        ],
        [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 2 }
        ]);

}
