export interface IUser {
	_id: string;
	password?: string;
	email: string;
	photo: string;
	exchangeConnect?: exchangeConnect[];
	role: string
	active: boolean
}

export interface ILoginIn {
	email: string;
	password: string;
}
interface exchangeConnect {
    name:string,
    key:string
}
