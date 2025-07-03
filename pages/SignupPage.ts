import { Locator, Page } from "@playwright/test";
import { SignupPageLocators } from "../fixtures/locator/signup.page";

export class SignupPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly password: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstName = page.getByTestId(SignupPageLocators.firstName);
        this.lastName = page.getByTestId(SignupPageLocators.lastName);
        this.email = page.getByTestId(SignupPageLocators.email);
        this.phone = page.getByTestId(SignupPageLocators.phone);
        this.password = page.getByTestId(SignupPageLocators.password);
        this.registerBtn = page.getByTestId(SignupPageLocators.registerBtn);
    }

    async navigate() {
        await this.page.goto("/register");
    }

    async getFirstname(): Promise<string> {
        return await this.firstName.inputValue();
    }

    async getLastname(): Promise<string> {
        return await this.lastName.inputValue();
    }

    async getEmail(): Promise<string> {
        return await this.email.inputValue();
    }
    
    async getPhoneNumber(): Promise<string> {
        return await this.phone.inputValue();
    }

    async getPassword(): Promise<string> {
        return await this.password.inputValue();
    }

    async registerUser({
        firstName,
        lastName,
        email,
        phone,
        password
    }: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.password.fill(password);
        await this.registerBtn.click();
    }
}