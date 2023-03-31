describe('Test App', () => {
  before(() => {
    cy.request(
      'POST',
      'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/auth',
      {
        username: 'john',
        password: 'password123',
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('TOKEN', response.body.payload.token);
    });
  });

  it(
    'login and make operations',
    {
      retries: 2,
    },
    function () {
      cy.visit('/login');
      cy.get('input[name=email]').type('john');
      cy.get('input[name=password]').type(`password123{enter}`); // {enter} causes the form to submit

      cy.location('pathname', {timeout: 60000}).should(
        'include',
        '/calculator/operations'
      );

      cy.request({
        method: 'DELETE',
        url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations',
        headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
      }).then((response) => {
        expect(response.status).to.equal(200);
      });

      cy.wait(10000);
      cy.get('h6[id=remainingBalance]').contains(30);

      cy.get('button[name=addition]').click();
      cy.get('input[name=operand1]').type(20);
      cy.get('input[name=operand2]').type(20);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 30000}).should(
        'have.value',
        40
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(29);

      cy.get('button[name=multiplication]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand2]').clear();
      cy.get('input[name=operand1]').type(2);
      cy.get('input[name=operand2]').type(9);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 6000}).should(
        'have.value',
        18
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(26);

      cy.get('button[name=subtraction]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand2]').clear();
      cy.get('input[name=operand1]').type(392);
      cy.get('input[name=operand2]').type(90);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 6000}).should(
        'have.value',
        302
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(24);

      cy.get('button[name=division]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand2]').clear();
      cy.get('input[name=operand1]').type(50);
      cy.get('input[name=operand2]').type(5);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 10000}).should(
        'have.value',
        10
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(20);

      cy.get('button[name=square_root]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand1]').type(9);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 10000}).should(
        'have.value',
        3
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(15);

      cy.get('button[name=subtraction]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand2]').clear();
      cy.get('input[name=operand1]').type(20);
      cy.get('input[name=operand2]').type(5);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 6000}).should(
        'have.value',
        15
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(13);

      cy.get('button[name=subtraction]').click();
      cy.get('input[name=operand1]').clear();
      cy.get('input[name=operand2]').clear();
      cy.get('input[name=operand1]').type(20);
      cy.get('input[name=operand2]').type(5);
      cy.get('button[name=result]').click();
      cy.get('input[name=resultField]', {timeout: 6000}).should(
        'have.value',
        15
      );
      cy.get('h6[id=remainingBalance]', {timeout: 5000}).contains(11);

      cy.get('button[id=logout]').click();
    }
  );

  it('login and show records and filters', function () {
    cy.visit('/login');

    cy.get('input[name=email]').type('john');
    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`password123{enter}`);

    cy.location('pathname', {timeout: 60000}).should(
      'include',
      '/calculator/operations'
    );

    cy.get('button[name=Records]').click();
    cy.get('span[id=operation_id]').click();
    cy.get('span[id=user_balance]').click();

    cy.get('span[id=operation_id]').click();
    cy.wait(10000);
    cy.get('span[id=user_balance]').click();
    cy.wait(10000);
    cy.get('input[name=showDeleted]').click();
    cy.wait(10000);
    cy.get('div[id=demo-simple-select]', {timeout: 5000}).click();
    cy.get('li[id=subtraction]', {timeout: 5000}).click();
    cy.wait(10000);
    cy.request({
      method: 'DELETE',
      url: 'https://68i17san2e.execute-api.us-east-1.amazonaws.com/dev/api/v1/operations',
      headers: {Authorization: `Bearer ${Cypress.env('TOKEN')}`},
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
