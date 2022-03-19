export const binance_url = "https://api.binance.me/api/v3/";
export const tokocrypro_url = "https://www.tokocrypto.com/open/v1/";


export const resetSetting = {
	isCycle: true,
	isOpenMargin: true,	
	startPossition: "",
	closePossition: "",
	lastTradePossition: "",
	callBackBuy: 0.3,
	callBackSell: 0.3,
	candleBody: 0.5,
	takeProfit: 5,
	callLimit: 5,
	indexUp: 0.3,
	indexDown: 2,
	backTradeDrop: 20,
	rsi: 80,
	marginConfig: [
		{ target: 3, value: 1 },
		{ target: 5, value: 1 },
		{ target: 7.5, value: 1 },
		{ target: 5, value: 2 },
		{ target: 5, value: 2 },
	],
	profitDistribution: [3, 5, 5, 5, 5],
	strategy: "Sub-Bin",
	tradeType: "Aggressive",
	timeFrame: "4h",
	movingAverage: { s: 8, m: 20, l: 50 },
};