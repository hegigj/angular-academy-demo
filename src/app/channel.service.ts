import { Injectable } from '@angular/core';

export interface IFormGroup {
  name: string;
}

@Injectable()
export class ChannelService {
  formGroup: IFormGroup;

  constructor() {
    this.formGroup = {
      name: ''
    };
  }
}
