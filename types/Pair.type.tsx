export interface IPair {
	_id?: string;
	symbol: string;
	baseAsset: string;
	quoteAsset: string;
	minQty?: string;
	minOrder?: string;
	lastPrice?: string;
	priceChangePercent?: string;
	quoteVolume?: string;
	url?: string;
}
