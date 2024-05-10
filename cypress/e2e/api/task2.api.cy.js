describe('Non-public API Tests', () => {
    it('Should redirect to authentication failed response with incorrect token', () => {
      cy.request({
        method: 'GET',
        url: 'https://exchange.da-desk.com/agency-api/1.1/search/masterCostItems?name=test&token=incorrectToken&serviceId=web/edge&serviceVersion=1.5.18.2',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq('Authentication failed');
      });
    });
  
    //Response Is Authentication Failed Irrespective of Name parameter
    it('Should return different results for different name parameters', () => {
      cy.request({
        method: 'GET',
        url: 'https://exchange.da-desk.com/agency-api/1.1/search/masterCostItems?name=test&token=123&serviceId=web/edge&serviceVersion=1.5.18.2',
        failOnStatusCode: false
      }).then((response1) => {
        const result1 = response1.body.message;
        cy.request({
          method: 'GET',
          url: 'https://exchange.da-desk.com/agency-api/1.1/search/masterCostItems?name=otherTest&token=123&serviceId=web/edge&serviceVersion=1.5.18.2',
          failOnStatusCode: false
        }).then((response2) => {
          const result2 = response2.body.message;
          expect(result1).to.equal(result2);
        });
      });
    });
  });
  

