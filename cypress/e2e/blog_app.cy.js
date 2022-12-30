describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'SquidMan',
      password: 'ilovesquid',
      name: 'Squidward Tentacles'
    })
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#login-button').should('have.text', 'Login')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('SquidMan')
      cy.get('#password').type('ilovesquid')
      cy.get('#login-button').click()
      cy.get('html').should('contain', 'Squidward Tentacles is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('SquidMan')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .should('have.css', 'color', 'rgb(248, 52, 52)')
        .should('have.css', 'border-color', 'rgb(248, 52, 52)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('SquidMan', 'ilovesquid')
    })

    it('can create a new blog', function() {
      cy.contains('Blogs')
      cy.get('button:last').click()
      cy.get('#title').type('This blog was created via cypress')
      cy.get('#author').type('Cypress Woods')
      cy.get('#url').type('end2end.com')
      cy.get('#add-blog-button').click()

      cy.get('.success')
        .should('contain', 'This blog was created via cypress by Cypress Woods added!')
        .should('have.css', 'color', 'rgb(25, 172, 25)')
        .should('have.css', 'border-color', 'rgb(25, 172, 25)')

      cy.get('.blogContainer').should('contain', 'This blog was created via cypress by Cypress Woods')
    })

    describe('Some blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'This blog was created via cypress',
          author: 'Cypress Woods',
          url: 'end2end.com'
        })
        cy.createBlog({
          title: 'Population of Squids in Africa',
          author: 'Squid Connoisseur',
          url: 'squidssquidssquids.io'
        })

        cy.request('POST', 'http://localhost:3000/api/users', {
          username: 'TestBoy',
          password: 'test123',
          name: 'Test Boy'
        })
        cy.login('TestBoy', 'test123')
        cy.createBlog({
          title: 'This is a test blog',
          author: 'Test Maestro',
          url: 'tests4days.co.nx'
        }).wait(500)
      })

      it('can like a blog', function() {
        cy.get('.blogContainer:first').contains('View').click()
        cy.get('.blogContainer:first').contains('Like').click()
        cy.get('.blogContainer:first').contains('Likes: 1')
      })

      it('can remove a blog', function() {
        cy.get('.blogContainer:last').contains('View').click()
        cy.get('.blogContainer:last').contains('Remove').click()
        cy.get('html').should('not.contain', 'This is a test blog by Test Maestro')
      })

      it('cannot remove a blog submitted by a different user', function() {
        cy.get('.blogContainer:first').contains('View').click()
        cy.get('.blogContainer:first').contains('Remove').should('not.be.visible')
      })

      it('sorts blogs according to number of likes (top down)', function() {
        cy.get('.blogContainer').eq(0).should('contain', 'This blog was created via cypress by Cypress Woods')
        cy.get('.blogContainer').eq(1).should('contain', 'Population of Squids in Africa by Squid Connoisseur')
        cy.get('.blogContainer').eq(2).should('contain', 'This is a test blog by Test Maestro')

        cy.get('.blogContainer:first').contains('View').click()
        cy.get('.blogContainer:first').contains('Like')
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()

        cy.get('.blogContainer:last').contains('View').click()
        cy.get('.blogContainer:last').contains('Like')
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()

        cy.get('.blogContainer').eq(0).should('contain', 'This is a test blog by Test Maestro')
        cy.get('.blogContainer').eq(1).should('contain', 'This blog was created via cypress by Cypress Woods')
        cy.get('.blogContainer').eq(2).should('contain', 'Population of Squids in Africa by Squid Connoisseur')
      })
    })
  })
})