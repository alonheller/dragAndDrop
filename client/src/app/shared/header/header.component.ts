import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  title = 'bla';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  onSave() {
    const data = {
      id: 'fromClient',
      data: {x: 'x', y: 'y'}
    };

    this.dataService.saveDiagram(data).subscribe(res => {
      console.log(`%c SAVED on server`, 'background: #222; color: #bada55');
    }, err => {
      console.log(`%c Error while saving`, 'background: #222; color: #bada55');
    });
  }

  onTestGet() {
    const diagramId = '34db2010-bf9c-11e9-8d70-df71c4751a30';
    this.dataService.getDiagram(diagramId).subscribe(res => {
      console.log(`%c get Diagram from server: ${res}`, 'background: #222; color: #bada55');
    }, err => {
      console.log(`%c Error while getting diagram`, 'background: #222; color: #bada55');
    });
  }
}
