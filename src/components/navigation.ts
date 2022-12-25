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

export const nav = NavigationEvent.getInstance();
