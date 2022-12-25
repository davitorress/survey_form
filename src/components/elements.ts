const backBtn = document.querySelector(".backBtn")! as HTMLButtonElement;
const skipBtn = document.querySelector(".skipBtn")! as HTMLButtonElement;
const nextBtn = document.querySelector(".nextBtn")! as HTMLButtonElement;

const nameMsg = document.querySelector("#nameMsg") as HTMLHeadingElement;

const selectInput = document.querySelector("select") as HTMLSelectElement;
const radioInput: HTMLInputElement[] = document.querySelectorAll(".radio") as any;
const checkInput: HTMLInputElement[] = document.querySelectorAll(".check") as any;
const textAreaInput = document.querySelector("textarea") as HTMLTextAreaElement;
const nameInput = document.querySelector("#full_name") as HTMLInputElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const ageInput = document.querySelector("#age") as HTMLInputElement;

export {
	backBtn,
	skipBtn,
	nextBtn,
	nameMsg,
	selectInput,
	radioInput,
	checkInput,
	textAreaInput,
	nameInput,
	emailInput,
	ageInput,
};
