class ReviewModel {
    private _reviewId: number;
    private _rate?: number;
    private _comment?: string;

    constructor(reviewId: number, rate?: number, comment?: string) {
        this._reviewId = reviewId;
        this._rate = rate;
        this._comment = comment;
    }

    // Getter and Setter for reviewId
    public get reviewId(): number {
        return this._reviewId;
    }
    public set reviewId(value: number) {
        this._reviewId = value;
    }

    // Getter and Setter for rate
    public get rate(): number | undefined {
        return this._rate;
    }
    public set rate(value: number | undefined) {
        this._rate = value;
    }

    // Getter and Setter for rate
    public get comment(): string | undefined {
        return this._comment;
    }
    public set comment(value: string | undefined) {
        this._comment = value;
    }
}

export default ReviewModel;
