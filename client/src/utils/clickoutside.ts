/* eslint-disable @typescript-eslint/no-explicit-any */
export default function clickOutside(node: any, onEventFunction: () => void) {
	const handleClick = (event: { composedPath: () => any }) => {
		const path = event.composedPath();

		if (!path.includes(node)) {
			onEventFunction();
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
