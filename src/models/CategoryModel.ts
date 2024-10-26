class CategoryModel {
    private _categoryId: number;
    private _categoryName: string;

    constructor(categoryId: number, categoryName: string) {
        this._categoryId = categoryId;
        this._categoryName = categoryName;
    }

    // Getter and Setter for categoryId
    public get categoryId(): number {
        return this._categoryId;
    }
    public set categoryId(value: number) {
        this._categoryId = value;
    }

    // Getter and Setter for categoryName
    public get categoryName(): string {
        return this._categoryName;
    }
    public set categoryName(value: string) {
        this._categoryName = value;
    }
}

export default CategoryModel;
