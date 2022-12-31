import React from "react";

import { useLogin, useRegistration } from "../../../app/services/AuthService/hooks";
import AuthForm from "../../organisms/AuthForm";

const AuthLayout = () => {
    const [isRegistration, setIsRegistration] = React.useState<boolean>(false);

    return (
        <div className="container mx-auto mt-14 flex justify-center">
            <div className="h-full w-80 p-6 shadow-lg shadow-gray-400">
                {isRegistration ? (
                    <AuthForm
                        isRegistration={isRegistration}
                        setIsRegistration={(value) => setIsRegistration(value)}
                        onCreate={useRegistration()}
                    />
                ) : (
                    <AuthForm
                        isRegistration={isRegistration}
                        setIsRegistration={(value) => setIsRegistration(value)}
                        onCreate={useLogin()}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
