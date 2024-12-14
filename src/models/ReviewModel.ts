class ReviewModel {
    private _reviewId?: number;
    private _rate?: number;
    private _comment?: string;
    private _username?: string;
    private _userId?: number;
    private _productId?: number;

    constructor(
        reviewId?: number,
        username?: string,
        rate?: number,
        comment?: string,
        userId?: number,
        productId?: number
    ) {
        this._reviewId = reviewId;
        this._username = username;
        this._rate = rate;
        this._comment = comment;
        this._userId = userId;
        this._productId = productId;
    }

    // Getter and Setter for reviewId
    public get reviewId(): number | undefined {
        return this._reviewId;
    }
    public set reviewId(value: number | undefined) {
        this._reviewId = value;
    }

    // Getter and Setter for username
    public get username(): string | undefined {
        return this._username;
    }
    public set username(value: string | undefined) {
        this._username = value;
    }

    // Getter and Setter for rate
    public get rate(): number | undefined {
        return this._rate;
    }
    public set rate(value: number | undefined) {
        this._rate = value;
    }

    // Getter and Setter for comment
    public get comment(): string | undefined {
        return this._comment;
    }
    public set comment(value: string | undefined) {
        this._comment = value;
    }

    // Getter and Setter for userId
    public get userId(): number | undefined {
        return this._userId;
    }
    public set userId(value: number | undefined) {
        this._userId = value;
    }

    // Getter and Setter for productId
    public get productId(): number | undefined {
        return this._productId;
    }
    public set productId(value: number | undefined) {
        this._productId = value;
    }
}

export default ReviewModel;
