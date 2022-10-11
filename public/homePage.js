"use strict"

// Выход из личного кабинета
let logout = new LogoutButton();

logout.action = (response) => {
    ApiConnector.logout(response => {
        response.success === true ? location.reload() : false;
    })
}

// Получение информации о пользователе
ApiConnector.current(response => {
    response.success === true ? ProfileWidget.showProfile(response.data) : false;
})

// Получение текущих курсов валюты
let rating = new RatesBoard();
function getCurrenсу() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            rating.clearTable();
            rating.fillTable(response.data);
        }
    })
}

getCurrenсу();
setInterval(getCurrenсу, 60000);

// Операции с деньгами
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = request => {
    ApiConnector.addMoney(request, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, response.success = 'Баланс пополнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = request => {
    ApiConnector.convertMoney(request, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, response.success = 'Деньги успешно конвертированы');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = request => {
    ApiConnector.transferMoney(request, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, response.success = 'Перевод выполнен');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

// Работа с избранным
let favoriteWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoriteWidget.clearTable();
        favoriteWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoriteWidget.addUserCallback = request => {
    ApiConnector.addUserToFavorites(request, response => {
        if (response.success === true) {
            favoriteWidget.clearTable();
            favoriteWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoriteWidget.setMessage(true, response.success = 'Пользователь добавлен');
        } else {
            favoriteWidget.setMessage(false, response.error);
        }
    })
}

favoriteWidget.removeUserCallback = request => {
    ApiConnector.removeUserFromFavorites(request, response => {
        if (response.success === true) {
            favoriteWidget.clearTable();
            favoriteWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoriteWidget.setMessage(true, response.success = 'Пользователь удален');
        } else {
            favoriteWidget.setMessage(false, response.error);
        }
    })
}