import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  @Input() showButtons: boolean;

  @Output() publish = new EventEmitter<null>();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  onPublish() {
   this.publish.emit();
  }
}
