class UserModel {
    private _userId?: number;
    private _username?: string;
    private _email?: string;
    private _phoneNumber?: string;
    private _firstName?: string;
    private _lastName?: string;
    private _password?: string;
    private _gender?: string;
    private _isActivate?: boolean;
    private _orderAddress?: string;
    private _deliveryAddress?: string;

    constructor(
        username?: string,
        email?: string,
        password?: string,
        phoneNumber?: string,
        firstName?: string,
        lastName?: string,
        gender?: string,
        isActivate?: boolean,
        orderAddress?: string,
        deliveryAddress?: string
    ) {
        this._username = username;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._password = password;
        this._gender = gender;
        this._isActivate = isActivate;
        this._orderAddress = orderAddress;
        this._deliveryAddress = deliveryAddress;
    }

    public get userId(): number | undefined {
        return this._userId;
    }
    public set userId(userId: number | undefined) {
        this._userId = userId;
    }
    public get username(): string | undefined {
        return this._username;
    }
    public set username(username: string) {
        this._username = username;
    }

    public get email(): string | undefined {
        return this._email;
    }
    public set email(email: string) {
        this._email = email;
    }

    public get phoneNumber(): string | undefined {
        return this._phoneNumber;
    }
    public set phoneNumber(phoneNumber: string | undefined) {
        this._phoneNumber = phoneNumber;
    }

    public get firstName(): string | undefined {
        return this._firstName;
    }
    public set firstName(firstName: string | undefined) {
        this._firstName = firstName;
    }

    public get lastName(): string | undefined {
        return this._lastName;
    }
    public set lastName(lastName: string | undefined) {
        this._lastName = lastName;
    }

    public get password(): string | undefined {
        return this._password;
    }
    public set password(password: string) {
        this._password = password;
    }

    public get gender(): string | undefined {
        return this._gender;
    }
    public set gender(gender: string | undefined) {
        this._gender = gender;
    }

    public get orderAddress(): string | undefined {
        return this._orderAddress;
    }
    public set orderAddress(orderAddress: string | undefined) {
        this._orderAddress = orderAddress;
    }

    public get deliveryAddress(): string | undefined {
        return this._deliveryAddress;
    }
    public set deliveryAddress(deliveryAddress: string | undefined) {
        this._deliveryAddress = deliveryAddress;
    }

    public get isActivate(): boolean | undefined {
        return this._isActivate;
    }
    public set isActivate(isActivate: boolean | undefined) {
        this.isActivate = isActivate;
    }
}

export default UserModel;
