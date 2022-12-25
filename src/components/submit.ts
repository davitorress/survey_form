import { InputsElements } from "./types";
import { survey } from "./survey_storage";

class Submit {
	private static instance: Submit;

	constructor() {}

	static getInstance() {
		if (this.instance) this.instance;
		this.instance = new Submit();
		return this.instance;
	}

	basic(element: InputsElements) {
		survey[element.id] = element.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	}

	number(element: InputsElements) {
		survey[element.id] = +element.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	}

	radio(element: InputsElements) {
		survey[element.name] = element.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	}

	check(element: HTMLInputElement[]) {
		const checkValues: string[] = [];
		element.forEach((check: HTMLInputElement) => {
			if (!checkValues.includes(check.value) && check.checked) checkValues.push(check.value);
			survey[check.name] = `${checkValues}`;
			localStorage.setItem("survey", JSON.stringify(survey));
		});
	}
}
export const submit = Submit.getInstance();
