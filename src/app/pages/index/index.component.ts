import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {}

  buttonClicked(event: MouseEvent): void {
    this.backendService.buttonClicked();
  }
}
