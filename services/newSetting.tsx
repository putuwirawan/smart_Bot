export function NewSetting(pairId: string, userId: string, exchangeId: string) {
	const reSet = {
		userId: userId,
		pairId: pairId,
		exchangeId: exchangeId,
		firstBuy: "30000",
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
	return reSet;
}