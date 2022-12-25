export const survey = JSON.parse(localStorage.getItem("survey")!) || {
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
