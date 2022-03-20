export interface IOrder {
	_id: string;
	userId: string;
	pairId: string;
	exchangeId: string;
	isCheck: boolean;
	baseId: string;
	orderId: string;
	side: number;
	quantity: string;
	amount: string;
	price: string;
}
