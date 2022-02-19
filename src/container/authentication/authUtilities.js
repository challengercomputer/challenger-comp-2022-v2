const TOKEN_KEY = "jwt";

export const login = () => {
	localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
	localStorage.removeItem("currentUser");
};

export const isLogin = () => {
	if (localStorage.getItem("currentUser")) {
		return true;
	}
	return false;
};