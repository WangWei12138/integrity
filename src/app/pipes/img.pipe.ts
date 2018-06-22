import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'img'
})

export class ImgPipe implements PipeTransform {

  transform(value: string): string {
    return value.trim().split(' ').join('-').toLowerCase() + '.svg';
  }

}
