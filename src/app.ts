// Navigation Events
class NavigationEvent {
	static instance: NavigationEvent;

	paths: string[] = [
		"/public/",
		"/public/pages/page-1.html",
		"/public/pages/page-2.html",
		"/public/pages/page-3.html",
		"/public/pages/page-4.html",
		"/public/pages/page-5.html",
		"/public/pages/thanks.html",
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
			else window.location.pathname = this.paths[pathIndex + 1];
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
console.log(document.location.pathname);
if (document.location.pathname === "/public/") {
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
const selectInput = document.querySelector("select")! as HTMLSelectElement;
if (selectInput) {
	selectInput.addEventListener("change", () => {
		survey[selectInput.id] = selectInput.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	});
}

// Radio input
const radioInput: HTMLInputElement[] = document.querySelectorAll(".radio")! as any;
if (radioInput) {
	radioInput.forEach((radio: HTMLInputElement) => {
		radio.addEventListener("click", () => {
			survey[radio.name] = radio.value;
			localStorage.setItem("survey", JSON.stringify(survey));
		});
	});
}

// Checkbox
const checkInput: HTMLInputElement[] = document.querySelectorAll(".check")! as any;
const checkValues: string[] = [];
if (checkInput) {
	checkInput.forEach((check: HTMLInputElement) => {
		check.addEventListener("change", () => {
			if (!checkValues.includes(check.value)) checkValues.push(check.value);
			else {
				const position = checkValues.findIndex((value: string) => value === check.value);
				checkValues.splice(position, 1);
			}

			survey[check.name] = `${checkValues}`;
			localStorage.setItem("survey", JSON.stringify(survey));
		});
	});
}

// TextArea
const textAreaInput: HTMLTextAreaElement = document.querySelector("textarea")! as HTMLTextAreaElement;
if (textAreaInput) {
	textAreaInput.addEventListener("keydown", (e: Event) => {
		survey[textAreaInput.id] = textAreaInput.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	});
}

// Name Input
const nameInput: HTMLInputElement = document.querySelector("#full_name")! as HTMLInputElement;
if (nameInput) {
	nameInput.addEventListener("keydown", (e: Event) => {
		survey[nameInput.id] = nameInput.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	});
}

// Email Input
const emailInput: HTMLInputElement = document.querySelector("#email")! as HTMLInputElement;
if (emailInput) {
	emailInput.addEventListener("keydown", (e: Event) => {
		survey[emailInput.id] = emailInput.value;
		localStorage.setItem("survey", JSON.stringify(survey));
	});
}

// Age Input
const ageInput: HTMLInputElement = document.querySelector("#age")! as HTMLInputElement;
if (ageInput) {
	["click", "keydown"].forEach((eventType: string) =>
		ageInput.addEventListener(eventType, (e: Event) => {
			survey[ageInput.id] = +ageInput.value;
			localStorage.setItem("survey", JSON.stringify(survey));
		})
	);
}
