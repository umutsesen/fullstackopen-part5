describe('Blogg app', function() {
  beforeEach(function() {
    cy.createuser()
    cy.visit('http://localhost:3000/')
  })

  describe('create auto', function() {
    it.only('blog', function() {
      cy.login({ username: 'yourusername', password: 'yourpass' })
      cy.createBlog({
        title: 'minikbusestar',
        author: 'asdasdasdasdw',
        url: 'asdasdasdasdasd'
      })
      cy.contains('minikbusestar').contains('Show').click()
      cy.contains('minikbusestar').contains('Like').click()
      cy.contains('minikbusestar').contains('Hide').click()
      cy.createBlog({
        title: 'mini',
        author: 'asdasdasdasdw',
        url: 'asdasdasdasdasd'
      })
      cy.createBlog({
        title: 'minik11eee',
        author: 'asdasdasdasdw',
        url: 'asdasdasdasdasd'
      })
      cy.createBlog({
        title: 'minik2323eeeeee',
        author: 'asdasdasdasdw',
        url: 'asdasdasdasdasd'
      })

    })
  })
  describe('Manually login+create+like+delete', function() {
    it('blog ', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('yourusername')
      cy.get('#password').type('yourpass')
      cy.get('form').submit()
      cy.contains('Create a new Blog').click()
      cy.get('#title').type('minikbusestar')
      cy.get('#author').type('sweetstar')
      cy.get('#url').type('salakstar')
      cy.get('form').submit()
      cy.contains('minikbusestar').contains('Show').click()
      cy.contains('minikbusestar').contains('Like').click()
      cy.contains('minikbusestar').contains('Remove Blog').click()
    })
  })
  // could not do, will look later.
  // 5.22: bloglist end to end testing, step6
  //Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.
  //This exercise might be a bit trickier. One solution is to find all of the blogs and then compare them in the callback function of a then command.

})