describe('Non-public API Tests', () => {
    it('Should return correct response code', () => {
        cy.request({
            method: 'GET',
            url: 'https://exchange.da-desk.com/agency-api/1.1/search/masterCostItems',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });

    it('Should return correct Date header and format it to current timezone if necessary', () => {
        cy.request({
            method: 'GET',
            url: 'https://exchange.da-desk.com/agency-api/1.1/search/masterCostItems',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.headers).to.have.property('date');
            const dateHeader = response.headers['date'];
            const dateInCurrentTimezone = new Date(dateHeader).toLocaleString();
            cy.log(`Date header: ${dateInCurrentTimezone}`);
            expect(dateInCurrentTimezone).to.exist;
        });
    });
});


