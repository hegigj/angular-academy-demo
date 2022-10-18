import {Component, Inject} from '@angular/core';
import {ChannelService, IFormGroup} from "../channel.service";

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent {
  formGroup: IFormGroup;

  constructor(@Inject('Loly') public channelService: ChannelService) {
    this.formGroup = channelService.formGroup;
  }
}
