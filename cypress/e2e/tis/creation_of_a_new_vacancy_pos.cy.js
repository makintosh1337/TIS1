describe('Создание вакансии', () => {
    it('Создание новой вакансии работодателем', () => {
        cy.fixture('employer').then(data => {
            // 1. Авторизацияпше
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

            // 3. Заполнение формы вакансии
            cy.log('Указываем должность')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(1) > .form-control--responsive > .form-input--')
                .type(data.species, {force: true})

            cy.log('Выбираем фиксированную зарплату')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(2) > .salary-field > .salary-field__wrapper--bottom > .radio-list > :nth-child(3)').click()

            cy.log('Указываем сумму зарплаты')
            cy.get('.form-input--number').type(data.salary)

            cy.log('Открываем список типов занятости')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(3) > .form-select > :nth-child(2) > .form-select__selected').click()

            cy.log('Выбираем удаленную работу')
            cy.get('.form-select__items > :nth-child(2)').click()

            cy.log('Выбираем индивидуальный график')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(4) > [data-v-af677f15=""] > :nth-child(1) > .radio-list > :nth-child(3)').click()

            cy.log('Указываем график работы')
            cy.get('.form-control--responsive > .form-input--text').type(data.schedule)

            cy.log('Заполняем требования к кандидату')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(5) > .form-control > .form-area').type(data.requirements)

            cy.log('Заполняем обязанности')
            cy.get('.vacancy-add-form-wrapper > .form > :nth-child(1) > .form__labels > .labels > :nth-child(6) > .form-control > .form-area').type(data.responsibilities)

            // 4. Сохранение
            cy.log('Сохраняем вакансию')
            cy.get('.vacancy-add-form-wrapper > .form > .form__buttons > .buttons > .button').click()

            // cy.log('Пубикация вакансии')
            // cy.get(':nth-child(1) > .vacancy-item__info-wrapper > .vacancy-item__footer-wrapper > .vacancy-footer > .vacancy-footer__button-wrapper > .button__background-color-green').click()
        })
    })
})