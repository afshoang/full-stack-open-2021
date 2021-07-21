describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Login to application')
    cy.get('[data-test="username"]').type('admin')
    cy.get('[data-test="password"]').type('123456')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.createUser({
        name: 'Hoang Pham',
        username: 'admin',
        password: '123456',
      })
    })

    it('succeeds with correct credentials', function () {
      cy.get('[data-test="username"]').type('admin')
      cy.get('[data-test="password"]').type('123456')
      cy.get('[data-test="login-button"]').click()

      cy.contains('Hoang Pham logged in')
    })
    it('fail with wrong credentials', function () {
      cy.get('[data-test="username"]').type('admin')
      cy.get('[data-test="password"]').type('12345')
      cy.get('[data-test="login-button"]').click()

      cy.get('.danger')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(220, 53, 69)')

      cy.get('html').should('not.contain', 'Hoang Pham logged in')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({
          username: 'admin',
          password: '123456',
        })
      })

      it('a blog can be created', function () {
        cy.contains('Create a new blog').click()

        cy.get('#title').type('blog created by cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('cypress.com')

        cy.get('#addBlog').click()

        cy.get('.blog').should('contain', 'blog created by cypress')
      })

      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'another blog created by cypress',
            author: 'Cypress',
            url: 'cypress.com',
          })
        })

        it('user can like a blog', function () {
          cy.contains('another blog created by cypress')
            .contains('view')
            .click()
          cy.contains('another blog created by cypress')
            .contains('like')
            .click()
        })

        it('user can delete a blog', function () {
          cy.contains('another blog created by cypress')
            .as('blogToDelete')
            .contains('view')
            .click()
          cy.get('@blogToDelete').contains('remove').click()
          cy.get('@blogToDelete').should('not.exist')
        })

        it('other user can not delete a blog', function () {
          cy.contains('logout').click()

          cy.createUser({
            name: 'Cypress user',
            username: 'user1',
            password: '123456',
          })

          cy.login({ username: 'user1', password: '123456' })

          cy.contains('another blog created by cypress')
            .as('blogToDelete')
            .contains('view')
            .click()
          cy.get('@blogToDelete').contains('remove').click()
          cy.contains('You dont have permission to delete this blog')
          cy.contains('another blog created by cypress')
        })
      })

      describe('several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'blog 1',
            author: 'Cypress',
            url: 'cypress.com',
          })
          cy.createBlog({
            title: 'blog 2',
            author: 'Cypress',
            url: 'cypress.com',
          })
        })

        it.only('blogs are order by descending', function () {
          cy.contains('blog 2').as('blogToLike').contains('view').click()
          cy.get('@blogToLike', { timeout: 5000 }).contains('like').click()
          cy.get('@blogToLike', { timeout: 5000 }).contains('like').click()
          cy.get('@blogToLike', { timeout: 5000 }).contains('like').click()

          cy.contains('blog 1').contains('view').click()

          cy.get('#likes').should('contain', '3')
        })
      })
    })
  })
})
