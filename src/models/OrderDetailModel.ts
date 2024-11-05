class OrderDetailModel {
    private _orderDetailId: number;
    private _productId: number;
    private _quantity: number;
    private _sellPrice: number;
    private _orderId: number;

    constructor(
        orderDetailId: number,
        productId: number,
        quantity: number,
        sellPrice: number,
        orderId: number
    ) {
        this._orderDetailId = orderDetailId;
        this._productId = productId;
        this._orderId = orderId;

        this._quantity = quantity;
        this._sellPrice = sellPrice;
    }

    // Getter and Setter for orderDetailId
    get orderDetailId(): number {
        return this._orderDetailId;
    }

    set orderDetailId(value: number) {
        this._orderDetailId = value;
    }

    // Getter and Setter for productId
    get productId(): number {
        return this._productId;
    }

    set productId(value: number) {
        this._productId = value;
    }

    // Getter and Setter for orderId
    get orderId(): number {
        return this._orderId;
    }

    set orderId(value: number) {
        this._orderId = value;
    }

    // Getter and Setter for quantity
    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        if (value < 0) {
            throw new Error("Quantity cannot be negative");
        }
        this._quantity = value;
    }

    // Getter and Setter for sellPrice
    get sellPrice(): number {
        return this._sellPrice;
    }

    set sellPrice(value: number) {
        if (value < 0) {
            throw new Error("Sell price cannot be negative");
        }
        this._sellPrice = value;
    }

    // Method to calculate the total price
    getTotalPrice(): number {
        return this._quantity * this._sellPrice;
    }

    // Method to display order detail information
    displayOrderDetail(): string {
        return `Order Detail ID: ${this._orderDetailId}, Quantity: ${
            this._quantity
        }, Sell Price: ${
            this._sellPrice
        }, Total Price: ${this.getTotalPrice()}`;
    }
}

export default OrderDetailModel;
