const SocRange = [
	{
		name: 'LOW_SOC_BREACH',
		range: [0, 20],
	},
	{
		name: 'LOW_SOC_WARNING',
		range: [21, 24],
	},
	{
		name: 'NORMAL',
		range: [25, 75],
	},
	{
		name: 'HIGH_SOC_WARNING',
		range: [76, 80],
	},
	{
		name: 'HIGH_SOC_BREACH',
		range: [81, 100],
	},
];

const ChargeRange = [
	{
		name: 'NORMAL',
		range: [0.4, 0.5],
	},
	{
		name: 'HIGH_WARNING',
		range: [0.6, 0.68],
	},
	{
		name: 'HIGH_BREACH',
		range: [0.7, 0.8],
	},
];

const TemperatureRange = [
	{
		name: 'LOW_BREACH',
		range: [0, 10],
	},
	{
		name: 'LOW__WARNING',
		range: [11, 20],
	},
	{
		name: 'NORMAL',
		range: [21, 30],
	},
	{
		name: 'HIGH_WARNING',
		range: [31, 35],
	},
	{
		name: 'HIGH_BREACH',
		range: [36, 40],
	},
];

const RangeValues = {
	tempMinValue: 0,
	tempMaxValue: 45,
	socMinValue: 20,
	socMaxValue: 80,
	chargeRateMinValue: -Infinity,
	chargeRateMaxValue: 0.8,
	tolerence: 5,
};

module.exports = { SocRange, RangeValues, ChargeRange, TemperatureRange };
