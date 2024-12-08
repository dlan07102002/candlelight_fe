class OrderDetailModel {
    private _orderDetailId: number;
    private _productId: number;
    private _quantity: number;
    private _sellPrice: number;
    private _orderId: number;
    private _userId: number;

    constructor(
        productId: number,
        orderId: number,
        userId: number,
        quantity: number,
        sellPrice: number
    ) {
        this._orderDetailId = 0;
        this._productId = productId;
        this._orderId = orderId;
        this._userId = userId;
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

    // Getter and Setter for userId
    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
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
}

export default OrderDetailModel;
