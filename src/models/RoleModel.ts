class RoleModel {
    private _roleId?: number;
    private _roleName?: string;

    constructor(roleId?: number, roleName?: string) {
        this._roleId = roleId;
        this._roleName = roleName;
    }

    // Getter and Setter for roleId
    get roleId(): number | undefined {
        return this._roleId;
    }

    set roleId(roleId: number) {
        this._roleId = roleId;
    }

    // Getter and Setter for roleName
    get roleName(): string | undefined {
        return this._roleName;
    }

    set roleName(roleName: string) {
        this._roleName = roleName;
    }
}

export default RoleModel;
