import { Locator, Page } from "@playwright/test";
import { LoginPageLocators } from "../fixtures/locator/login.page";


export class LoginPage {
    readonly page : Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly otpInput: Locator;

    readonly loginBtn: Locator;
    readonly loginGoogleBtn: Locator;

    readonly otpVerifyBtn: Locator;
    readonly otpCancelBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.email = page.getByTestId(LoginPageLocators.email);
        this.password = page.getByTestId(LoginPageLocators.password);
        this.otpInput = page.getByTestId(LoginPageLocators.otpInput);

        this.loginBtn = page.getByTestId(LoginPageLocators.loginBtn).nth(1);
        this.loginGoogleBtn = page.getByTestId(LoginPageLocators.loginGoogleBtn);

        this.otpVerifyBtn = page.getByTestId(LoginPageLocators.otpVerifyBtn);
        this.otpCancelBtn = page.getByTestId(LoginPageLocators.otpCancelBtn);
    }

    async gotoPage(){
        await this.page.goto("/login");
    }

    async getEmail(): Promise<string> {
        return await this.email.inputValue();
    }
    async getPassword(): Promise<string> {
        return await this.password.inputValue();
    }

    async loginUser({
        email,
        password,
    }:{
        email: string;
        password: string;
    }){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async verifyOtp(otp: string){
        await this.otpInput.fill(otp);
        await this.otpVerifyBtn.click();
    }

    async clickGoogleLoginBtn(){
        await this.loginGoogleBtn.click();
    }
}