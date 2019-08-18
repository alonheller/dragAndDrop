import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  id: string;
  image: any;
  loading = false;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDiagram();
  }

  loadDiagram() {
    this.loading = true;
    this.dataService.getDiagram(this.id).subscribe(res => {
      const reader = new FileReader();

      reader.addEventListener('loadend', (e: any) => {
        this.image = e.srcElement.result;
        this.loading = false;
      });

      reader.readAsText(res);
    }, err => {
      // TODO: Show nice message to the user
      console.log(`%c Error while saving`, 'background: #222; color: #bada55');
      this.loading = false;
    });
  }

}
