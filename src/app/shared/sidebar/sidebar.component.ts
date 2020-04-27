import { Component, OnInit } from '@angular/core';
import { SiderbarService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebar: SiderbarService) { }

  ngOnInit() {
  }

}
