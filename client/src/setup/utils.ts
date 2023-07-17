export const debounce = <T extends (...args: any[]) => any>(
	func: T
): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null;

	return function debouncedFn(this: any, ...args: Parameters<T>) {
		const context = this;

		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			timer = null;
			func.apply(context, args);
		}, 500);
	};
};

export const formatDate = (date: Date) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month} ${day}, ${year}`;
};

export function sortByProperty(property: string, bool: boolean) {
	if (bool)
		return function (a: any, b: any) {
			if (a[property] > b[property]) {
				return -1;
			} else if (a[property] < b[property]) {
				return 1;
			}
			return 0;
		};
	else
		return function (a: any, b: any) {
			if (a[property] < b[property]) {
				return -1;
			} else if (a[property] > b[property]) {
				return 1;
			}
			return 0;
		};
}

export const upperCase = (text: string) => {
	return text[0].toUpperCase() + text.substring(1, text.length);
};
