context('POST /auth', () => {
  it('get token and login', () => {
    cy.request(
      'POST',
      'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/auth',
      {
        username: 'novak',
        password: 'password123',
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
