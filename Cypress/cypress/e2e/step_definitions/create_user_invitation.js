import {
    Given,
    When,
    Then,
    And,
  } from "@badeball/cypress-cucumber-preprocessor";
  import userPage from '../../pages/UserPage';
  import loginPage from '../../pages/LoginPage';

  let credentials;

  Given("Que el usuario se encuentra autenticado, está en la página de listado de usuarios", () => {
    loginPage.defaultLogin();
    userPage.goListUsers();
  });
  
  When("envía invitacion al usuario con email {string}", (newUserEmail) => {
    cy.fixture('Users').then( user => {
        userPage.sendInvitation(user[newUserEmail]);
    })
  });

  When("regresa al listado de usuarios", () => {
    cy.reload();
  })
  
  Then("debería visualizar la invitación con el email {string} en el listado", (newUserEmail) => {
    cy.fixture('Users').then( user => {
        cy.contains(user[newUserEmail])
    })
  });