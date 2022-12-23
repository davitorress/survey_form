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
