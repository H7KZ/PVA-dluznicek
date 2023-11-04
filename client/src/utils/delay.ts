export default async function delay(ms: number | undefined) {
	new Promise((res) => setTimeout(res, ms));
}
