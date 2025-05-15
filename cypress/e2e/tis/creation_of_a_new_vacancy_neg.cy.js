describe('Негативные сценарии создания вакансии', () => {
    it('Попытка создания вакансии с невалидными данными', () => {
        cy.fixture('employer').then(data => {
            // 1. Авторизация
            cy.log('Открываем страницу входа')
            cy.visit("https://dev.profteam.su/login")

            cy.log('Вводим логин')
            cy.get('.form-input--text').type(data.login)

            cy.log('Вводим пароль')
            cy.get('.form-input--password').type(data.password)

            cy.log('Нажимаем кнопку Войти')
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // 2. Переход к вакансиям
            cy.log('Открываем раздел Вакансии')
            cy.get(':nth-child(7) > .menu-item__item-name').click()

            cy.log('Нажимаем Создать вакансию')
            cy.get('[data-v-94414c9f=""][data-v-4849dea2=""] > .vacancies-block > .vacancies-block__filters-wrapper > .button').click()
            cy.viewport(1200, 1000)
            cy.wait(1000)

            // 3. Попытка сохранить пустую форму
            cy.log('Пытаемся сохранить вакансию без заполнения данных')
            cy.get('.vacancy-add-form-wrapper > .form > .form__buttons > .buttons > .button').click()

            cy.log('Проверяем сообщения об ошибках')
            cy.get('.form-error').should('contain', 'Обязательное поле')
            cy.get('.form-error').should('have.length.at.least', 3)

            // 4. Заполнение формы невалидными данными
            cy.log('Вводим слишком длинное название должности')
            cy.get('.form-input--text').type('Очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень')

            cy.log('Вводим отрицательную зарплату')
            cy.get('.form-input--number').clear().type('-156346553')

            cy.log('Пытаемся сохранить с невалидными данными')
            cy.get('.vacancy-add-form-wrapper > .form > .form__buttons > .buttons > .button').click()

            cy.log('Проверяем сообщения об ошибках')
            cy.get('.form-error').should('contain', 'Превышена максимальная длина')
            cy.get('.form-error').should('contain', 'Значение не может быть отрицательным')


        })
    })
})