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
      const user = {
        name: 'Hoang Pham',
        username: 'admin',
        password: '123456',
        blogs: [],
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
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
  })
})
