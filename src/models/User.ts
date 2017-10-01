import Base from "./Base";

export interface IUser {
    id?: number,
    login: string,
    password: string
}

export class OUser extends Base implements IUser {
    id: number;
    login: string;
    password: string;

    constructor(data: IUser){
        super(data, ['login', 'password']);
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
    }
}