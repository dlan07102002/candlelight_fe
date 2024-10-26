class ImageModel {
    private _imageId: number;
    private _imageName?: string;
    private _icon?: boolean;
    private _link?: string;
    private _imageData?: string;

    constructor(
        imageId: number,
        imageName?: string,
        icon?: boolean,
        link?: string,
        imageData?: string
    ) {
        this._imageId = imageId;
        this._imageName = imageName;
        this._icon = icon;
        this._link = link;
        this._imageData = imageData;
    }

    // Getter and Setter for imageId
    public get imageId(): number {
        return this._imageId;
    }
    public set imageId(value: number) {
        this._imageId = value;
    }

    // Getter and Setter for imageName
    public get imageName(): string | undefined {
        return this._imageName;
    }
    public set imageName(value: string | undefined) {
        this._imageName = value;
    }

    // Getter and Setter for icon
    public get icon(): boolean | undefined {
        return this._icon;
    }
    public set icon(value: boolean | undefined) {
        this._icon = value;
    }

    // Getter and Setter for link
    public get link(): string | undefined {
        return this._link;
    }
    public set link(value: string | undefined) {
        this._link = value;
    }

    // Getter and Setter for data
    public get imageData(): string | undefined {
        return this._imageData;
    }
    public set imageData(value: string | undefined) {
        this.imageData = value;
    }
}

export default ImageModel;
