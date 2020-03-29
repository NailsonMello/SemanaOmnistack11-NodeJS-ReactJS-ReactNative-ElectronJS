import { logout } from '../store/ducks/Logon/Index'

export default function Logout() {
	localStorage.clear()	
	window.location.pathname = '/'
	return logout();
}