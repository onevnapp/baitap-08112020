import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  @Input() products;

  @Output() RemoveProduct = new EventEmitter();
  @Output() UpdateQuantity = new EventEmitter();

  removeProduct(id: number) {
    if (confirm('Are you sure to delete ?')) {
      this.RemoveProduct.emit(id);
    }
  }

  inputQuantity(id: number, inputElement: HTMLInputElement) {
    const value = inputElement.value;
    // tslint:disable-next-line: radix
    const intValue = parseInt(value);

    if (intValue < 1) {
      inputElement.value = -intValue + '';
    } else if (value.length > 2) {
      inputElement.value = value.slice(0, 2);
    }

    // tslint:disable-next-line: radix
    this.UpdateQuantity.emit({ id, quantity: parseInt(inputElement.value) || '' });
  }
}
