describe('Проверка уведомлений', () => {
    it('Просмотр уведомления работодателем', () => {
        cy.fixture('employer').then(data => {
            // 1. Вход в систему
            cy.log('Открываем страницу входа')
            cy.visit("https://dev.profteam.su/login")

            cy.log('Вводим логин')
            cy.get('.form-input--text').type(data.login)

            cy.log('Вводим пароль')
            cy.get('.form-input--password').type(data.password)

            cy.log('Нажимаем кнопку входа')
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // 2. Работа с уведомлениями
            cy.log('Открываем раздел уведомлений')
            cy.get('.header__nav > [href="/notification"]').click()
            cy.wait(2000)

            cy.log('Открываем первое уведомление')
            cy.get(':nth-child(1) > .notification-list-item > .button').click()
        })
    })
})