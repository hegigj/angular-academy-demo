import { Component } from '@angular/core';
import {ChannelService, IFormGroup} from "../channel.service";

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.scss']
})
export class FormTwoComponent {
  formGroup: IFormGroup;

  constructor(private channelService: ChannelService) {
    this.formGroup = channelService.formGroup;
  }
}
