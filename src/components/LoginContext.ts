import React, {Dispatch, SetStateAction} from "react";

export type LoginContextValue = { isLoggedIn: boolean, setIsLoggedIn: Dispatch<SetStateAction<boolean>> }

let defaultValue: LoginContextValue = {isLoggedIn: false, setIsLoggedIn: isLoggedIn => undefined}

const LoginContext = React.createContext(defaultValue)

export default LoginContext