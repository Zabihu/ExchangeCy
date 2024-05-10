describe('Select Correct MCI Test', () => {

  it('Add All Agency Annotation and Verify Total Prices', () => {
    cy.visit('https://qa-test.cuat.marcura.com/dashboard');
    ['Drydock', 'External', 'Internal', 'Bosporus', 'Transportation'].forEach((annotation, index) => {
      //From 'Search MCI' Component, select ONLY 'Agency Fee' from the list
      cy.get('#search-box-mcis').type('Agency Fee')
      cy.get('.search-result a').contains('Agency Fee').click()
      cy.get('#search-box-mcis').should('have.value', 'Agency Fee')
      //Add 'Agency Fee' MCI with all annotations available, i.e. Agency Fee - Drydock, Agency Fee - External, etc
      cy.get('#search-box-annotations').type(annotation)
      cy.get('.search-result a').contains(annotation).click()
      cy.get('#search-box-annotations').should('have.value', annotation)
      //Add value for every item - it should be 222 INR
      cy.get('#master-cost-input').type('222')
      cy.get('#master-cost-usd-rate').click()
      //Check exchange rate t should be: 1 USD = 80.53999999999999 INR
      cy.get('#master-cost-usd-rate').invoke('val').then($el => {
        expect($el).to.equal('80.53999999999999')
      })
      cy.contains('button', 'Add').click();
      cy.get('tbody tr').eq(index).then($el => {
        expect($el.find('td.mci-cell').text()).to.eq('Agency Fee')
        expect($el.find('td.annotation-cell').text()).to.eq(annotation)
        //Add value for every item - it should be 222 INR
        expect($el.find('td.cost-cell div').eq(0).text()).to.eq('INR: 222.00')
        //Check whether all items contains correct values in USD currency
        expect($el.find('td.cost-cell div').eq(1).text()).to.eq('USD: 2.76')
        let totalINR = (222.00 * (index + 1)).toFixed(2)
        let totalUSD = Number((2.76 * (index + 1)).toFixed(2))
        //Write a helper method to check 1 cent adjustment if required
        cy.get('tfoot td').eq(1).then($elTotal => {
          expect(Number($elTotal.find('div').eq(1).text().split(': ')[1])).to.be.closeTo(totalUSD, totalUSD - 0.01)
        })
      })
    })
  });
})

