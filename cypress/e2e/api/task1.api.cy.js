describe('Public API Tests', () => {
  beforeEach(() => {
    cy.request('GET', 'https://exchange.da-desk.com/agency-api/1.1/info')
      .as('apiResponse');
  });

  it('should return a 200 response code', () => {
    cy.get('@apiResponse').its('status').should('eq', 200);
  });

  it('should have non-null values for name, telephone, fax, and email properties', () => {
    cy.get('@apiResponse').then(response => {
      expect(response.body).to.have.property('name').that.is.not.null;
      expect(response.body).to.have.property('telephone').that.is.not.null;
      expect(response.body).to.have.property('fax').that.is.not.null;
      expect(response.body).to.have.property('email').that.is.not.null;
    });
  });

  it('should have the correct media type in the response', () => {
    cy.get('@apiResponse').its('headers').its('content-type').should('include', 'application/json');
  });
  
});
