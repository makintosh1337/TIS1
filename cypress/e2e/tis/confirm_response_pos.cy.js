describe('Подтверждение отклика', () => {
    it('Работодатель принимает отклик студента', () => {
        cy.fixture('employer').then(data => {
            // 1. Вход в систему
            cy.log('Открываем страницу входа')
            cy.visit("https://dev.profteam.su/login")

            cy.log('Вводим логин работодателя')
            cy.get('.form-input--text').type(data.login)

            cy.log('Вводим пароль')
            cy.get('.form-input--password').type(data.password)

            cy.log('Нажимаем "Войти"')
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // 2. Работа с откликами
            cy.log('Открываем раздел "Отклики"')
            cy.get(':nth-child(5) > .menu-item__item-name').click()
            cy.wait(2000)

            cy.log('Открываем первый отклик в списке')
            cy.get('.infinite-loader > :nth-child(1) > .button').click()
            cy.wait(2000)
        })
    })
})