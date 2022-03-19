import axios from "axios";
const qs = require("qs");
const crypto = require("crypto");
const { tokocrypro_url } = require("./globalVariable");
const ExchangeUrl = tokocrypro_url;


export async function TkoAcountBalance(order:any) {
	const to_sign = `recvWindow=60000&timestamp=${Date.now()}`;
	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(
		`${ExchangeUrl}account/spot?${to_sign}&signature=${hmac}`,
		{
			method: "GET",
			headers: {
				"X-MBX-APIKEY": `${order.api.apiKey}`,
				"Content-Type": "application/json",
			},
		}
	);

	if (res.status == 200) {
		if (res.data.code == 0) {
			const datas = res.data.data.accountAssets;
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
	} else return null;
}
export async function TkoCheckOrder(order:any) {
	// require orderId
	const to_sign = `orderId=${
		order.orderId
	}&recvWindow=60000&timestamp=${Date.now()}`;
	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(
		`${ExchangeUrl}orders/detail?${to_sign}&signature=${hmac}`,
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

 export async function TkoCancelOrder(order: any) {
		// require orderId
		const to_sign = `orderId=${
			order.orderId
		}&recvWindow=60000&timestamp=${Date.now()}`;
		const hmac = crypto
			.createHmac("sha256", order.api.secretKey)
			.update(to_sign)
			.digest("hex");
		const res = await axios(
			`${ExchangeUrl}orders/cancel?${to_sign}&signature=${hmac}`,
			{
				method: "POST",
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
export async function TkoAllOrder(order: any) {
	// require symbol:ADA_BIDR type: 1-open, 2-history, -1 -all
	let to_sign = `symbol=${
		order.symbol
	}&type=2&recvWindow=60000&timestamp=${Date.now()}`;
	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}orders?${to_sign}&signature=${hmac}`, {
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
export async function TkoBuyMarket(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: 0,
		type: 2,
		quoteOrderQty: order.quoteOrderQty,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);
	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}orders?${to_sign}&signature=${hmac}`, {
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
export async function TkoBuyLimit(obj: any) {
	const body_req = {
		symbol: obj.symbol,
		side: 0,
		type: 1,
		quantity: obj.quantity,
		price: obj.price,
		recvWindow: 60000,
		timestamp: Date.now(),
	};

	const to_sign = qs.stringify(body_req);
	const hmac = crypto
		.createHmac("sha256", obj.api.secretKey)
		.update(to_sign)
		.digest("hex");

	const res = await axios(`${ExchangeUrl}orders?${to_sign}&signature=${hmac}`, {
		method: "POST",
		headers: {
			"X-MBX-APIKEY": `${obj.api.apiKey}`,
			"Content-Type": "application/json",
		},
	});

	if (res.status == 200) {
		return res.data;
	} else return null;
}
export async function TkoSellLimit(order: any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: 1,
		type: 1,
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
	const res = await axios(`${ExchangeUrl}orders?${to_sign}&signature=${hmac}`, {
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
export async function TkoSellMarket(order:any) {
	// GTC
	const body_req = {
		symbol: order.symbol,
		side: 1,
		type: 2,
		quantity: order.quantity,
		recvWindow: 60000,
		timestamp: Date.now(),
	};
	const to_sign = qs.stringify(body_req);

	const hmac = crypto
		.createHmac("sha256", order.api.secretKey)
		.update(to_sign)
		.digest("hex");
	const res = await axios(`${ExchangeUrl}orders?${to_sign}&signature=${hmac}`, {
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