import { InputsElements } from "./types";

class Validation {
	private static instance: Validation;

	constructor() {}

	static getInstance() {
		if (this.instance) this.instance;
		this.instance = new Validation();
		return this.instance;
	}

	validateRegex(regex: RegExp, element: InputsElements): boolean {
		return regex.test(element.value);
	}

	isNotEmpty(): boolean {
		let isValid: boolean = false;
		let iterationFailed = 0;

		["select", "textarea", "#full_name", "#age", "#email"].forEach((element: string) => {
			const inputs: InputsElements[] = document.querySelectorAll(element) as any;

			if (inputs.length > 0) {
				inputs.forEach((input: InputsElements) => {
					if (input.value) isValid = true;
					else iterationFailed++;
				});
			}
		});

		if (iterationFailed > 0) isValid = false;

		return isValid;
	}

	isSelected(): boolean {
		let isValid: boolean = false;
		let iterationFailed = 0;
		let numElements = 0;

		[".radio", ".check"].forEach((element: string) => {
			const inputs: HTMLInputElement[] = document.querySelectorAll(element) as any;
			if (inputs.length > 0) {
				numElements = inputs.length;
				inputs.forEach((input: HTMLInputElement) => {
					if (input.checked) isValid = true;
					else iterationFailed++;
				});
			}
		});

		if (iterationFailed >= numElements) isValid = false;
		if (iterationFailed === 0) isValid = true;

		return isValid;
	}
}

export const validation = Validation.getInstance();
