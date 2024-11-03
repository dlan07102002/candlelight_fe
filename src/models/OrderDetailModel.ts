class OrderDetail {
    private _orderDetailId: number;
    private _quantity: number;
    private _sellPrice: number;

    constructor(orderDetailId: number, quantity: number, sellPrice: number) {
        this._orderDetailId = orderDetailId;
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

export default OrderDetail;
