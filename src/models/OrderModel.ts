class OrderModel {
    private _orderId?: number;
    private _createdAt?: Date;
    private _userId?: number;
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

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public get userId(): number | undefined {
        return this._userId;
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

    // Setters
    public set orderId(value: number | undefined) {
        this._orderId = value;
    }

    public set createdAt(value: Date | undefined) {
        this._createdAt = value;
    }

    public set userId(value: number | undefined) {
        this._userId = value;
    }

    public set orderAddress(value: string | undefined) {
        this._orderAddress = value;
    }

    public set deliveryAddress(value: string | undefined) {
        this._deliveryAddress = value;
    }

    public set paymentCost(value: number | undefined) {
        this._paymentCost = value;
    }

    public set deliveryCost(value: number | undefined) {
        this._deliveryCost = value;
    }

    public set totalPrice(value: number | undefined) {
        this._totalPrice = value;
    }

    public set deliveryStatus(value: string | undefined) {
        this._deliveryStatus = value;
    }

    public set paymentStatus(value: string | undefined) {
        this._paymentStatus = value;
    }
}

export default OrderModel;
