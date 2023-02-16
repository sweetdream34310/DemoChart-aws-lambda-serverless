import {
    CognitoUserPool,
    CookieStorage,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserSession,
    ISignUpResult
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import {useRuntimeConfig} from "#app";
import {useUserStore} from "~/stores/user";
import {setSessionToken} from "~/plugins/axios";

export default function useAuth() {
    const config = useRuntimeConfig()

    const isAuthenticated = () => {
        console.log("Authenticating")
        const config = useRuntimeConfig()
        console.log("Config", config.userPoolId)
        let userPool = new CognitoUserPool({
            UserPoolId: config.userPoolId,
            ClientId: config.clientId,
            Storage: new CookieStorage({ secure: false, domain: "democharts.org" }),
        });
        let cognitoUser = userPool.getCurrentUser();
        console.log("Current User", cognitoUser)
        if (cognitoUser != null) {
            return Observable.create((observer: any) => {
                cognitoUser.getSession((error, session) => {
                    if (error) {
                        console.error(error);
                        observer.next(false);
                        observer.complete();
                    }
                    console.log(session, session.isValid(), session.isAuthenticated);
                    observer.next(session.isValid());
                    observer.complete();
                });
            })
        }
    }



    const userPool = new CognitoUserPool({
        UserPoolId: 'eu-central-1_S7UxTQO3p',
        ClientId: '54n0hvgs4ms42ki4s7h0dm7sft',
        Storage: new CookieStorage({secure: false, domain:"democharts.com"}),
    });

    const login = (email: string, password: string, onSuccess?: () => any, onError?: (err: any) => void) => {
        const AD = new AuthenticationDetails({
            Username: email?.toLowerCase().trim(),
            Password: password,
        });
        const CU = new CognitoUser({
            Username: email?.toLowerCase().trim(),
            Pool: userPool,
            Storage: new CookieStorage({secure: false, domain: "democharts.org"})
        });

        CU.authenticateUser(AD, {
            async onSuccess(result) {
                console.log("Login succeded!", result);

                let cognitoUser = userPool.getCurrentUser();
                if (cognitoUser !== null) {
                    cognitoUser.getSession((error: any, session: any) => {
                        console.log("Cognito set session of user!")
                        setSessionToken(session.getIdToken().getJwtToken())
                    })
                }

                const userStore = useUserStore()
                await userStore.fetchUser()


                onSuccess && onSuccess();
                //
                // console.log('Authenticate user on success', result);
                //
                // thisTmp.store.dispatch(new SetAuthSession(result));
                //
                // thisTmp.http.getUser().subscribe((user: UserStateModel) => {
                //         if (user.approvedByAdmin) {
                //             thisTmp.store.dispatch(new SetUser(user));
                //             thisTmp.updateLoginStatus();
                //             onSuccess(user);
                //         } else {
                //             thisTmp.signOut(false);
                //
                //             onError({
                //                 code: 'not_approved_by_admin_yet',
                //                 message: 'User is not approved by admin.'
                //             });
                //         }
                //     },
                //     (err: any) => {
                //         console.log('USER -- ERROR on fetching profile');
                //         onError(err);
                //     }
                // );
            },
            onFailure(err) {
                console.error(err);
                onError && onError(err);
            },
        });
    }

    return { isAuthenticated, login };
}