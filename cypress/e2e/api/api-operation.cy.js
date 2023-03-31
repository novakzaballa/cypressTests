context('POST /operations', () => {
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
  it('Create new operation division', () => {
    cy.request({
      method: 'POST',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
      body: {
        operation: 'division',
        arguments: {
          operand1: 40,
          operand2: 4,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Create new operation addition', () => {
    cy.request({
      method: 'POST',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
      body: {
        operation: 'addition',
        arguments: {
          operand1: 10,
          operand2: 49,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Create new operation random_string', () => {
    cy.request({
      method: 'POST',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
      body: {
        operation: 'random_string',
        arguments: {
          length: 10,
        },
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

context('GET /operations', () => {
  it('Gets operation records', () => {
    cy.request({
      method: 'GET',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations?page_number=1&rows_per_page=50',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
    }).then((response) => {
      console.log('response:', response);
      expect(response.status).to.eq(200);
    });
  });
});

context('DELETE /operations', () => {
  it('Delete a operation record by id', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations/1',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Delete all operation records by user (Novak)', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations/delete_all_records',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
