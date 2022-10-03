"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = (request, response) => {
    ApiConnector.login(request, response => {
        response.success === true ? location.reload() : userForm.setLoginErrorMessage(JSON.stringify(response.error));
    })
}

userForm.registerFormCallback = (request, response) => {
    ApiConnector.register(request, response => {
        response.success === true ? location.reload() : userForm.setRegisterErrorMessage(JSON.stringify(response.error));
    })
}