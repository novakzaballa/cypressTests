context('GET /users/current_user/balance', () => {
  before(() => {
    cy.request(
      'POST',
      'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/auth',
      {
        username: 'novak',
        password: 'password123',
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('TOKEN', response.body.payload.token);
    });
  });
  it("gets a user's balance", () => {
    cy.request({
      method: 'GET',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/users/current_user/balance',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
