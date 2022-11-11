import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: any[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.list = this.route.snapshot.data['items'];
  }

}
