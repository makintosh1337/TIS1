describe('Подтверждение отклика (негативные сценарии)', () => {
    it('Попытка подтвердить несуществующий/недоступный отклик', () => {
        cy.fixture('employer').then(data => {
            // 1. Вход в систему
            cy.log('Авторизуемся как работодатель')
            cy.visit("https://dev.profteam.su/login")
            cy.get('.form-input--text').type(data.login)
            cy.get('.form-input--password').type(data.password)
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // 2. Переход в несуществующий раздел
            cy.log('Попытка открыть несуществующий ID отклика')
            cy.visit("https://dev.profteam.su/responses/999999")
            cy.contains('Отклик не найден').should('be.visible')

            // 3. Работа с пустым списком
            cy.log('Переход в раздел откликов')
            cy.get(':nth-child(5) > .menu-item__item-name').click()
            cy.wait(2000)

            cy.log('Проверка пустого списка откликов')
            cy.get('.empty-state').should('contain', 'Нет новых откликов')

            // 4. Попытка действий с закрытым откликом
            cy.log('Открываем архивный отклик')
            cy.get('[href="/responses/archive"]').click()
            cy.get('.archive-item:first-child').click()
            cy.wait(1000)

            cy.log('Попытка подтвердить архивный отклик')
            cy.get('.accept-button').should('be.disabled')
            cy.get('.error-message').should('contain', 'Нельзя изменить статус архивного отклика')
        })
    })
})