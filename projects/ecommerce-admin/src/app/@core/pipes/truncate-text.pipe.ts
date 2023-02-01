import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateText' })
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (!value || !length || value.length <= length) {
      return value;
    }

    const truncatedText = value.substring(0, length) + '...';

    return truncatedText;
  }
}
