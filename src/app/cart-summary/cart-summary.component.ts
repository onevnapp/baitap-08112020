import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
  @Input() subTotal: number;
  @Input() tax: number;
  @Input() discount: number;

  @Output() onApplyPromoCode = new EventEmitter();

  promoCode: string;

  applyPromoCode() {
    const code = this.promoCode;

    if (code && code.trim() !== '') {
      this.onApplyPromoCode.emit(code);
    }
  }
}
