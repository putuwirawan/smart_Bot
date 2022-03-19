import axios from "axios";
const qs = require("qs");
const crypto = require("crypto");

const ExchangeUrl = "https://api.binance.me/api/v3/";

export async function AcountBalance(order: any) {
	const to_sign = `recvWindow=60000&timestamp=${Date.now()}`;

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");

	const res = await axios(
		`${ExchangeUrl}account?${to_sign}&signature=${hmac}`,
		{
			method: "GET",
			headers: {
				"X-MBX-APIKEY": `${order.api.apiKey}`,
				"Content-Type": "application/json",
			},
		}
	);
	if (res.status == 200) {
		const datas = res.data.balances;
		let baseAsset = 0;
		let quoteAsset_USDT = 0;
		let quoteAsset_BIDR = 0;
		for (const dt of datas) {
			if (dt.asset == order.baseAsset) baseAsset = +dt.free;
			if (dt.asset == "USDT") quoteAsset_USDT = +dt.free;
			if (dt.asset == "BIDR") quoteAsset_BIDR = +dt.free;
		}
		return {
			baseAsset: baseAsset,
			USDT: quoteAsset_USDT,
			BIDR: quoteAsset_BIDR,
		};
	} else return null;
}
export async function CheckOrder(order: any) {
	const to_sign = `symbol=${order.symbol}&orderId=${
		order.orderId
	}&recvWindow=60000&timestamp=${Date.now()}`;

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");

	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "GET",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});

	if (res.status == 200) {
		return res.data;
	} else return null;
}
//
export async function CancelOrder(order: any) {
	const to_sign = `symbol=${order.symbol}&orderId=${
		order.orderId
	}&recvWindow=60000&timestamp=${Date.now()}`;

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");

	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "DELETE",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function AllOrder(order: any) {
	let to_sign = `symbol=${
		order.symbol
	}&recvWindow=60000&timestamp=${Date.now()}`;
	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(
		`${ExchangeUrl}allOrders?${to_sign}&signature=${hmac}`,
		{
			method: "GET",
			headers: {
				"X-MBX-APIKEY": `${order.api.apiKey}`,
				"Content-Type": "application/json",
			},
		}
	);
	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function BuyMarket(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: "BUY",
		type: "MARKET",
		quoteOrderQty: order.quoteOrderQty,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "POST",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function BuyLimit(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: "BUY",
		type: "LIMIT",
		timeInForce: "GTC",
		price: order.price,
		quantity: order.quantity,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "POST",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function SellLimit(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: "SELL",
		type: "LIMIT",
		timeInForce: "GTC",
		price: order.price,
		quantity: order.quantity,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "POST",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function SellMarket(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: "SELL",
		type: "MARKET",
		quantity: order.quantity,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}order?${to_sign}&signature=${hmac}`, {
		method: "POST",
		headers: {
			"X-MBX-APIKEY": `${order.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status == 200) {
		return res.data;
	} else return null;
}
