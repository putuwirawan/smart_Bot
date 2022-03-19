import axios from "axios";

const ExchangeUrl = "https://api.binance.me/api/v3/";

export async function ServerTime() {
	const res = await axios(`${ExchangeUrl}time`, { method: "GET" });
	return res.data;
}
export async function PairInfo(symbol: string) {
	// pair===ADAUSDT
	const res = await axios(`${ExchangeUrl}exchangeInfo?symbol=${symbol}`, {
		method: "GET",
	});
	if (res.status == 200) {
		let info = {
			symbol: "",
			baseAsset: "",
			quoteAsset: "",
			minOrder: 0,
			minQty: 0,
		};

		const _infos = res.data.symbols[0];
		info.baseAsset = _infos.baseAsset;
		info.symbol = _infos.symbol;
		info.quoteAsset = _infos.quoteAsset;
		const filters = _infos.filters;
		for (const filter of filters) {
			if (filter.filterType == "LOT_SIZE") {
				if (filter.minQty >= `1.00`) {
					info.minQty = Math.floor(Math.log10(filter.minQty));
				} else {
					info.minQty = -Math.floor(Math.log10(filter.minQty));
				}
			}
			if (filter.filterType == "MIN_NOTIONAL") {
				info.minOrder = filter.minNotional
					? filter.minNotional
					: filter.notional;
			}
		}
		return info;
	}
	return null;
}
export async function orderBook(symbol: string, limit: number) {
	const res = await axios(
		`${ExchangeUrl}depth?symbol=${symbol}&limit=${limit}`,
		{ method: "GET" }
	);
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function avgPrice(symbol: string) {
	const res = await axios(`${ExchangeUrl}avgPrice?symbol=${symbol}`, {
		method: "GET",
	});
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function Price(symbol: string) {
	const res = await axios(`${ExchangeUrl}ticker/price?symbol=${symbol}`, {
		method: "GET",
	});
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function tickerPrice24(symbol: string) {
	const res = await axios(`${ExchangeUrl}ticker/24hr?symbol=${symbol}`, {
		method: "GET",
	});
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function orderBookticker(symbol: string) {
	const res = await axios(`${ExchangeUrl}ticker/bookTicker?symbol=${symbol}`, {
		method: "GET",
	});
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function klines(symbol: string, interval: string, limit: number) {
	const res = await axios(
		`${ExchangeUrl}klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
		{ method: "GET" }
	);
	if (res.status == 200) {
		return res.data;
	}
	return null;
}
export async function trenInfo(symbol: string, interval: string, ma: any) {
	const _maS = ma.s;
	const _maM = ma.m;
	const _maL = ma.l;

	let maS = 0;
	let maM = 0;
	let maL = 0;
	let trend = "side";	
	let upMoves = 0;
	let downMoves = 0;

	const res = await klines(symbol, interval, _maL);
	if (res) {
		const dataL = res;
		const dataS = res.slice(Math.max(res.length - _maS, 0));
		const dataM = res.slice(Math.max(res.length - _maM, 0));

		dataL.forEach((element: any, i: number) => {
			maL += +element[4];
		});
		dataS.forEach((element: any, i: number) => {
			maS += +element[4];
		});

		dataM.forEach((element: any, i: number) => {
			maM += +element[4];
			if (+element[1] < +element[4]) {
				upMoves += 1;
			}
			if (+element[1] > +element[4]) {
				downMoves += 1;
			}
		});

		const avgU = upMoves / _maM;
		const avgD = downMoves / _maM;
		const RS = avgU / avgD;
		const RSI = 100 - 100 / (1 + RS);

		const ma_short = maS / _maS;
		const ma_medium = maM / _maM;
		const ma_long = maL / _maL;

		if (ma_short < ma_medium && ma_medium < ma_long) trend = "bear";
		if (ma_short > ma_medium && ma_medium > ma_long) trend = "bull";
		if (ma_short > ma_medium && ma_medium < ma_long) trend = "shortbull";

		const price = +res[res.length - 1][4];
		const price_o = +res[res.length - 1][1];
		const price_top = +res[res.length - 1][2];
		const low = +res[res.length - 1][3];

		const dropPrice = ((price_top - price) / price_top) * 100;
		const recoverPrice = ((price - low) / low) * 100;
		const body = ((price - price_o) / price_o) * 100;

		const info = {
			long: ma_long,
			medium: ma_medium,
			sort: ma_short,
			rsi: RSI,
			trend: trend,
			dropPrice: dropPrice,
			recoverPrice: recoverPrice,
			body: body,
			price: price,
		};

		return info;
	}
	return null;
}

