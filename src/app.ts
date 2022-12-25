import { nav } from "./components/navigation";
import { validation } from "./components/validation";
import { survey } from "./components/survey_storage";
import { submit } from "./components/submit";

import {
	backBtn,
	skipBtn,
	nameMsg,
	selectInput,
	radioInput,
	checkInput,
	textAreaInput,
	nameInput,
	emailInput,
	ageInput,
	nextBtn,
} from "./components/elements";

if (backBtn) nav.navigate(backBtn, window.location.pathname, true);
if (skipBtn) nav.navigate(skipBtn, window.location.pathname);

if (nameMsg) {
	if (survey.full_name !== "") nameMsg.innerHTML = `Thanks, ${survey.full_name}`;
}

if (selectInput) {
	if (survey[selectInput.id]) selectInput.value = survey[selectInput.id];
}

if (radioInput) {
	radioInput.forEach((radio: HTMLInputElement) => {
		if (survey[radio.name] !== "" && radio.value === survey[radio.name]) radio.checked = true;
	});
}

if (checkInput) {
	const checkedArray = survey.resources_training.split(",");

	checkInput.forEach((check: HTMLInputElement) => {
		if (checkedArray.includes(check.value)) check.checked = true;

		check.addEventListener("change", () => {
			disableBtn();
		});
	});
}

if (textAreaInput) {
	if (survey[textAreaInput.id] !== "") textAreaInput.value = survey[textAreaInput.id];

	const textLength = document.querySelector("#text_length")! as HTMLElement;

	const max = 130;
	textAreaInput.maxLength = max;
	textLength.innerHTML = `Characters: ${textAreaInput.value.length}/${max}`;

	textAreaInput.addEventListener("input", (_: Event) => {
		const counter = textAreaInput.value.length;
		textLength.innerHTML = `Characters: ${counter}/${max}`;
	});
}

if (nameInput) {
	let isValid = true;

	nameInput.addEventListener("input", (_: Event) => {
		const nameRegex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
		isValid = validation.validateRegex(nameRegex, nameInput);
		if (!isValid) disableBtn(true);
	});
}

if (emailInput) {
	let isValid = true;

	emailInput.addEventListener("input", (_: Event) => {
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/g;
		isValid = validation.validateRegex(emailRegex, emailInput);
	});

	setInterval(() => {
		if (!isValid) disableBtn(true);
	}, 100);
}

if (ageInput) {
	ageInput.maxLength = 2;

	ageInput.addEventListener("input", (_: Event) => {
		if (ageInput.value.length > ageInput.maxLength) ageInput.value = ageInput.value.slice(0, ageInput.maxLength);

		const numberRegex = /^[0-9]{1,}$/;
		let isValid = validation.validateRegex(numberRegex, ageInput);
		if (!isValid) disableBtn(true);
	});
}

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
