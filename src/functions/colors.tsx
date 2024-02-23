// "oklch(num1 num2 num3)" -> [num1, num2, num3]
export function splitOklchString(oklch: string): [number, number, number] {
	const [num1, num2, num3] = oklch
		.replace("oklch(", "") // Remove oklch(
		.replace(")", "") // Remove )
		.split(" ") // Split by space
		.map((num) => parseFloat(num)); // Convert to number

	return [num1, num2, num3];
}
