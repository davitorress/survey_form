// Navigation Events
class NavigationEvent {
	static instance: NavigationEvent;

	constructor() {}

	static getInstance() {
		if (this.instance) this.instance;
		this.instance = new NavigationEvent();
		return this.instance;
	}

	// Navigation Method
	navigate(element: HTMLElement, href: string): void {
		element?.addEventListener("click", (e: Event) => {
			e.preventDefault();
			window.location.href = href;
		});
	}
}
const nav = NavigationEvent.getInstance();

// Back to Home button
const homeBtn = document.getElementById("homeBtn")! as HTMLButtonElement;
if (homeBtn) nav.navigate(homeBtn, "/public/pages/page-1.html");

// Back button
const backBtn = document.querySelector(".backBtn")! as HTMLButtonElement;
if (backBtn) {
	backBtn.addEventListener("click", () => {
		window.history.back();
	});
}

// Next button
const form = document.querySelector("form")! as HTMLFormElement;
const nextBtn = document.querySelector(".nextBtn")! as HTMLButtonElement;
if (nextBtn) nav.navigate(nextBtn, form ? form.action : "/public/pages/page-2.html");
