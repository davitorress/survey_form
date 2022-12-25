// Navigation Events
class NavigationEvent {
	private static instance: NavigationEvent;

	paths: string[] = [
		"/",
		"/pages/page-1.html",
		"/pages/page-2.html",
		"/pages/page-3.html",
		"/pages/page-4.html",
		"/pages/page-5.html",
		"/pages/thanks.html",
	];

	constructor() {}

	static getInstance() {
		if (this.instance) this.instance;
		this.instance = new NavigationEvent();
		return this.instance;
	}

	// Navigation Method
	navigate(element: HTMLElement, pathname: string, back?: boolean): void {
		element?.addEventListener("click", (e: Event) => {
			e.preventDefault();

			const pathIndex = this.paths.indexOf(pathname);
			if (back) window.location.pathname = this.paths[pathIndex - 1];
			else window.location.pathname = this.paths[pathIndex + 1] ? this.paths[pathIndex + 1] : this.paths[0];
		});
	}
}
const nav = NavigationEvent.getInstance();

// Back button
const backBtn = document.querySelector(".backBtn")! as HTMLButtonElement;
if (backBtn) nav.navigate(backBtn, window.location.pathname, true);

// Skip button
const skipBtn = document.querySelector(".skipBtn")! as HTMLButtonElement;
if (skipBtn) nav.navigate(skipBtn, window.location.pathname);

const survey = JSON.parse(localStorage.getItem("survey")!) || {
	account_status: "",
	financial_market: "",
	investment_type: "",
	resources_training: "",
	loss_details: "",
	full_name: "",
	email: "",
	age: 0,
};

// Clean LocalStorage
if (document.location.pathname === "/") {
	localStorage.setItem(
		"survey",
		JSON.stringify({
			account_status: "",
			financial_market: "",
			investment_type: "",
			resources_training: "",
			loss_details: "",
			full_name: "",
			email: "",
			age: 0,
		})
	);
}

// Select input
const selectInput = document.querySelector("select") as HTMLSelectElement;
if (selectInput) {
	if (survey[selectInput.id]) selectInput.value = survey[selectInput.id];
}

// Radio input
const radioInput: HTMLInputElement[] = document.querySelectorAll(".radio") as any;
if (radioInput) {
	radioInput.forEach((radio: HTMLInputElement) => {
		if (survey[radio.name] !== "" && radio.value === survey[radio.name]) radio.checked = true;
	});
}

// Checkbox
const checkInput: HTMLInputElement[] = document.querySelectorAll(".check") as any;
const checkValues: string[] = [];
if (checkInput) {
	const checkedArray = survey.resources_training.split(",");

	checkInput.forEach((check: HTMLInputElement) => {
		if (checkedArray.includes(check.value)) check.checked = true;

		check.addEventListener("change", () => {
			disableBtn();
		});
	});
}

// TextArea
const textAreaInput = document.querySelector("textarea") as HTMLTextAreaElement;
if (textAreaInput) {
	if (survey[textAreaInput.id] !== "") textAreaInput.value = survey[textAreaInput.id];

	const textLength = document.querySelector("#text_length")! as HTMLElement;

	const max = 130;
	textAreaInput.maxLength = max;
	textLength.innerHTML = `Characters: ${textAreaInput.value.length}/${max}`;

	textAreaInput.addEventListener("input", (e: Event) => {
		const counter = textAreaInput.value.length;
		textLength.innerHTML = `Characters: ${counter}/${max}`;
	});
}

// Name Input
const nameInput = document.querySelector("#full_name") as HTMLInputElement;
if (nameInput) {
	let isValid = true;

	nameInput.addEventListener("input", (e: Event) => {
		const nameRegex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
		isValid = validation.validateRegex(nameRegex, nameInput);
		if (!isValid) disableBtn(true);
	});
}

// Email Input
const emailInput = document.querySelector("#email") as HTMLInputElement;
if (emailInput) {
	let isValid = true;

	emailInput.addEventListener("input", (e: Event) => {
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/g;
		isValid = validation.validateRegex(emailRegex, emailInput);
	});

	setInterval(() => {
		if (!isValid) disableBtn(true);
	}, 100);
}

// Age Input
const ageInput = document.querySelector("#age") as HTMLInputElement;
if (ageInput) {
	ageInput.maxLength = 2;

	ageInput.addEventListener("input", (e: Event) => {
		if (ageInput.value.length > ageInput.maxLength) ageInput.value = ageInput.value.slice(0, ageInput.maxLength);

		const numberRegex = /^[0-9]{1,}$/;
		let isValid = validation.validateRegex(numberRegex, ageInput);
		if (!isValid) disableBtn(true);
	});
}

// Submit
type InputsElements = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;

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
const submit = Submit.getInstance();

// Next button
const nextBtn = document.querySelector(".nextBtn")! as HTMLButtonElement;
if (nextBtn) {
	setInterval(() => {
		disableBtn();
	}, 1000);

	nextBtn.addEventListener("click", (e: Event) => {
		e.preventDefault();

		if (selectInput) submit.basic(selectInput);
		if (textAreaInput) submit.basic(textAreaInput);
		if (nameInput) submit.basic(nameInput);
		if (emailInput) submit.basic(emailInput);
		if (ageInput) submit.number(ageInput);
		if (checkInput) submit.check(checkInput);
		if (radioInput) {
			radioInput.forEach((radio: HTMLInputElement) => {
				if (radio.checked) submit.radio(radio);
			});
		}
	});
	nav.navigate(nextBtn, window.location.pathname);
}

function disableBtn(disable?: boolean) {
	const isValid = validation.isNotEmpty() && validation.isSelected();
	nextBtn.disabled = disable ? disable : !isValid;
	if (nextBtn.disabled) nextBtn.classList.add("btn-disabled");
	else nextBtn.classList.remove("btn-disabled");
}
