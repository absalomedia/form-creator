describe('Home page on desktop', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it('visits home page', () => {
    cy.visit('/')
  })
})
