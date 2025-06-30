import test, { expect } from "@playwright/test";
import { CommonPage } from "../pages/CommonPage";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login - Success Cases", () => {
    test("TC_LOGIN_01: Login with valid data", async({page}) =>{ 
        const login = new LoginPage(page);
        const common = new CommonPage(page);
        
        await login.gotoPage();

        await login.loginUser({
            email: "misterjittakorn@gmail.com",
            password: "Jittakorn9@X"
        });

        await login.verifyOtp("123456");
    });
});

test.describe("Login - Fail Cases", () => {
    test("TC_LOGIN_02: Login Not Input Email", async({page}) =>{ 
        const login = new LoginPage(page);
        const common = new CommonPage(page);
        
        await login.gotoPage();

        await login.loginUser({
            email: "",
            password: "Jittakorn9@X"
        });

        await common.expectErrorPopup(
            "LGN_2002"
            ,"Missing required information: flightId, email, password and otp are mandatory."
        );
        
    });

    test("TC_LOGIN_03: Login Not Input Password", async({page}) =>{ 
        const login = new LoginPage(page);
        const common = new CommonPage(page);
        
        await login.gotoPage();

        await login.loginUser({
            email: "misterjittakorn@gmail.com",
            password: ""
        });

        await common.expectErrorPopup(
            "LGN_2002"
            ,"Missing required information: flightId, email, password and otp are mandatory."
        );

    });

    test("TC_LOGIN_04: Login Email , Password Is Invalid", async({page}) =>{ 
        const login = new LoginPage(page);
        const common = new CommonPage(page);
        
        await login.gotoPage();

        await login.loginUser({
            email: "misterjittakorn_lnwza@gmail.com",
            password: "123456789za"
        });

        await common.expectErrorPopup(
            "LGN_2003"
            ,"The email you entered is incorrect. Please try again."
        );

    });

    test("TC_LOGIN_05: Click GoogleLogin", async({page}) =>{ 
        const login = new LoginPage(page);

        await login.gotoPage();
        await login.clickGoogleLoginBtn();
        
        await expect(page).toHaveURL(/accounts.google.com?\//);

    });

    test("TC_LOGIN_06: Login with OTP Invalid", async({page}) =>{ 
        const login = new LoginPage(page);
        const common = new CommonPage(page);

        await login.gotoPage();

        await login.loginUser({
            email: "misterjittakorn@gmail.com",
            password: "Jittakorn9@X"
        });

        await login.verifyOtp("000000");
        
        await common.expectErrorPopup(
            "OTP_1002"
            ,"Invalid OTP. Please try again."
        );
        

    });



});