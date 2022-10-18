import {Component, Input} from '@angular/core';
import {ChannelService} from "../channel.service";

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent {
  @Input()
  label!: string;

  constructor() { }
}
