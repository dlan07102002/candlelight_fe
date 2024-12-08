class OrderModel {
    private _orderId?: number;
    private _createdAt: Date;
    private _orderAddress?: string;
    private _deliveryAddress?: string;
    private _paymentCost?: number;
    private _deliveryCost?: number;
    private _totalPrice?: number;
    private _deliveryStatus?: string;
    private _paymentStatus?: string;

    constructor(
        orderId?: number,
        orderAddress?: string,
        deliveryAddress?: string,
        paymentCost?: number,
        deliveryCost?: number,
        totalPrice?: number
    ) {
        this._orderId = orderId;
        this._createdAt = new Date(Date.now());
        this._orderAddress = orderAddress;
        this._deliveryAddress = deliveryAddress;
        this._paymentCost = paymentCost;
        this._deliveryCost = deliveryCost;
        this._totalPrice = totalPrice;
        this._deliveryStatus = "Pending";
        this._paymentStatus = "Pending";
    }

    // Getters
    public get orderId(): number | undefined {
        return this._orderId;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get orderAddress(): string | undefined {
        return this._orderAddress;
    }

    public get deliveryAddress(): string | undefined {
        return this._deliveryAddress;
    }

    public get paymentCost(): number | undefined {
        return this._paymentCost;
    }

    public get deliveryCost(): number | undefined {
        return this._deliveryCost;
    }

    public get totalPrice(): number | undefined {
        return this._totalPrice;
    }

    public get deliveryStatus(): string | undefined {
        return this._deliveryStatus;
    }

    public get paymentStatus(): string | undefined {
        return this._paymentStatus;
    }
}

export default OrderModel;
