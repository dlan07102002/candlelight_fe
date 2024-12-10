class ProductModel {
    private _productId: number;
    private _productName?: string;
    private _description?: string;
    private _detailDescription?: string;
    private _listPrice?: number;
    private _sellPrice?: number;
    private _quantity?: number;
    private _rateAverage?: number;

    constructor(
        productId: number,
        productName: string,
        description?: string,
        detailDescription?: string,
        listPrice?: number,
        sellPrice?: number,
        quantity?: number,
        rateAverage?: number
    ) {
        this._productId = productId;
        this._productName = productName;
        this._description = description;
        this._listPrice = listPrice;
        this._sellPrice = sellPrice;
        this._quantity = quantity;
        this._rateAverage = rateAverage;
        this.detailDescription = detailDescription;
    }

    // Getter and Setter for productId
    public get productId(): number {
        return this._productId;
    }
    public set productId(value: number) {
        this._productId = value;
    }

    // Getter and Setter for productName
    public get productName(): string | undefined {
        return this._productName;
    }
    public set productName(value: string | undefined) {
        this._productName = value;
    }

    // Getter and Setter for description
    public get detailDescription(): string | undefined {
        return this._detailDescription;
    }
    public set detailDescription(value: string | undefined) {
        this._detailDescription = value;
    }

    // Getter and Setter for description
    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }

    // Getter and Setter for listPrice
    public get listPrice(): number | undefined {
        return this._listPrice;
    }
    public set listPrice(value: number | undefined) {
        this._listPrice = value;
    }

    // Getter and Setter for sellPrice
    public get sellPrice(): number | undefined {
        return this._sellPrice;
    }
    public set sellPrice(value: number | undefined) {
        this._sellPrice = value;
    }

    // Getter and Setter for quantity
    public get quantity(): number | undefined {
        return this._quantity;
    }
    public set quantity(value: number | undefined) {
        this._quantity = value;
    }

    // Getter and Setter for rateAverage
    public get rateAverage(): number | undefined {
        return this._rateAverage;
    }
    public set rateAverage(value: number | undefined) {
        this._rateAverage = value;
    }
}

export default ProductModel;
