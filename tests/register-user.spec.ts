import test from "@playwright/test";
import { CommonPage } from "../pages/CommonPage";
import { SignupPage } from "../pages/SignupPage";

test.describe("Register - Success Cases", () => {

    test("TC_REG_01:Register with valid data @regression @smoke", async({page}) =>{
        const signup = new SignupPage(page);
        await signup.navigate();
    
        await signup.registerUser({
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@example.com`,
            phone: "0812345678",
            password: "Com@sci54",
        });
    
        await signup.expectSuccessPopupMessage();
    });
});

test.describe("Register - Fail Cases", () => {

    test("TC_REG_02:Register with an already used email @regression", async({page}) =>{
        const signup = new SignupPage(page);
        const common = new CommonPage(page);

        await signup.navigate();
    
        await signup.registerUser({
            firstName: "Any",
            lastName: "Nane",
            email: "maicomsci54@gmail.com",
            phone: "0812345678",
            password: "Com@sci54",
        });
    
        await common.expectErrorPopup(
            "REG_1005",
            "Email Already Exists: The email already exists in the system."
        );
    
    });
    
    test('TC_REG_03:Register with weak password (invalid format) @regression', async({page}) =>{
        const signup = new SignupPage(page);
        const common = new CommonPage(page);

        await signup.navigate();
        await signup.registerUser({
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@example.com`,
            phone: "0812345678",
            password: "abc123",
        })
    
        await common.expectErrorPopup(
            "REG_1006",
            'Password must meet the following requirements: 1. Length between 8 and 20 characters, 2. At least one uppercase letter (A-Z), 3. At least one lowercase letter (a-z), 4. At least one number (0-9), 5. At least one special character (e.g., !@#$%^&*(),.?":{}|<>).'
        );
    
    });
    
    test('TC_REG_04:Register with invalid phone number (too long/incorrect format) @regression', async({page}) =>{
        const signup = new SignupPage(page);
        const common = new CommonPage(page);

        await signup.navigate();
    
        await signup.registerUser({
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@example.com`,
            phone: "0812345678123456789423456789",
            password: "Com@sci54",
        })
    
        const phoneValue = await signup.getPhoneNumber();
        await common.expectErrorPopup(
            "REG_1003",
            `Invalid Formats: ${phoneValue}`
        );
    });
    
    test('TC_REG_05:Register with invalid first name (contains numbers) @regression', async({page}) =>{
        const signup = new SignupPage(page);
        const common = new CommonPage(page);

        await signup.navigate();
    
        await signup.registerUser({
            firstName: "John123",
            lastName: "User",
            email: `test${Date.now()}@example.com`,
            phone: "0812345678",
            password: "Com@sci54",
        })
    
        const firstnameValue = await signup.getFirstname();
    
        await common.expectErrorPopup(
            "REG_1003",
            `Invalid Formats: ${firstnameValue}`
        );
    });
    
    test('TC_REG_06:Register with invalid first name (contains numbers) @regression', async({page}) =>{
        const signup = new SignupPage(page);
        const common = new CommonPage(page);
        
        await signup.navigate();
    
        await signup.registerUser({
            firstName: "Test",
            lastName: "Smith123!",
            email: `test${Date.now()}@example.com`,
            phone: "0812345678",
            password: "Com@sci54",
        })
    
        const lastnameValue = await signup.getLastname();
        await common.expectErrorPopup(
            "REG_1003",
            `Invalid Formats: ${lastnameValue}`
        );

    });
});




