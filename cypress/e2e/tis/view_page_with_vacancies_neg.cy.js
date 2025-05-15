describe('Поиск вакансий (негативные сценарии)', () => {
    it('Попытка поиска с невалидными данными', () => {
        cy.fixture('employer').then(data => {
            // 1. Авторизация
            cy.log('Вход в систему')
            cy.visit("https://dev.profteam.su/login")
            cy.get('.form-input--text').type(data.login)
            cy.get('.form-input--password').type(data.password)
            cy.get(':nth-child(3) > .button').click()
            cy.wait(3000)

            // 2. Переход к вакансиям
            cy.log('Открываем раздел вакансий')
            cy.get(':nth-child(1) > .header__nav > [href="/vacancies"] > .header__label').click()

            // 3. Негативные сценарии поиска
            cy.log('Попытка поиска с пустым запросом')
            cy.get('div.search-input__field > .button').click()
            cy.get('.search-error').should('contain', 'Введите текст для поиска')

            cy.log('Ввод слишком длинного запроса (более 100 символов)')
            cy.get('.form-input--text').type('Это очень очень очень длинный текст запроса который явно превышает максимально допустимую длину для поля поиска вакансий в этой системе')
            cy.get('div.search-input__field > .button').click()
            cy.get('.search-error').should('contain', 'Слишком длинный запрос')

            // // 4. Негативные сценарии фильтрации
            // cy.log('Попытка установки отрицательной зарплаты')
            // cy.get('.salary-input').type('-10000')
            // cy.get('.filter-error').should('contain', 'Зарплата не может быть отрицательной')
            //
            // cy.log('Попытка выбрать несовместимые фильтры')
            // cy.get(':nth-child(3) > :nth-child(2) > .form-select__selected').click()
            // cy.get('.form-select__items > :nth-child(1)').click() // Полная занятость
            // cy.get(':nth-child(4) > :nth-child(2) > .form-select__selected').click()
            // cy.get('.form-select__items > :nth-child(3)').click() // Дистанционная работа
            // cy.get('.filter-error').should('contain', 'Несовместимые параметры')
            //
            // // 5. Проверка отсутствия результатов
            // cy.log('Поиск несуществующей вакансии')
            // cy.get('.form-input--text').clear().type('Несуществующая вакансия 12345')
            // cy.get('div.search-input__field > .button').click()
            // cy.contains('Вакансии не найдены').should('be.visible')
        })
    })
})