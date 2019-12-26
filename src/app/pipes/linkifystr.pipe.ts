import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({name: 'linkifystr'})
export class LinkifyStrPipe implements PipeTransform {
  transform(str: string) {
    return str ? linkifyStr(str, {target: '_system'}) : str;
  }
}
