import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslatablePaginator extends MatPaginatorIntl {
  constructor() {
    super();

    this.translate();
  }

  private rangeLabel(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return `0 из ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} из ${length}`;
  }

  private translate() {
    this.itemsPerPageLabel = 'Элементов на странице:';
    this.nextPageLabel = 'Следующая страница';
    this.previousPageLabel = 'Предыдущая страница';
    this.getRangeLabel = this.rangeLabel;
  }
}
