describe('Поиск вакансий', () => {
    it('Фильтрация и поиск вакансий', () => {
        cy.fixture('employer').then(data => {
            // Авторизация
            cy.log('Открытие страницы входа')
            cy.visit("https://dev.profteam.su/login")

            cy.log('Ввод логина')
            cy.get('.form-input--text').type(data.login)

            cy.log('Ввод пароля')
            cy.get('.form-input--password').type(data.password)

            cy.log('Нажатие кнопки входа')
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // Поиск вакансий
            cy.log('Переход в раздел вакансий')
            cy.get(':nth-child(1) > .header__nav > [href="/vacancies"] > .header__label').click()

            cy.log('Ввод текста для поиска')
            cy.get('.form-input--text').type(data.search_text)

            cy.log('Запуск поиска')
            cy.get('div.search-input__field > .button').click()

            // Фильтрация
            cy.log('Выбор варианта "Любая зарплата"')
            cy.get('.radio-list > :nth-child(3)').click()

            cy.log('Открытие списка графиков работы')
            cy.get(':nth-child(3) > :nth-child(2) > .form-select__selected').click()

            cy.log('Выбор неполной занятости')
            cy.get('.form-select__items > :nth-child(3)').click()

            cy.log('Открытие типов занятости')
            cy.get(':nth-child(4) > :nth-child(2) > .form-select__selected').click()

            cy.log('Выбор удаленной работы')
            cy.get('.form-select__items > :nth-child(3)').click()
            cy.wait(2000)

        })
    })
})