context('Hanzo interview',()=>{
    beforeEach(function () { // Does the sign in before running each test
    cy.visit('https://slack.com/signin') // Goes to the sign in page   
    cy.url().should('contain', 'https://slack.com/signin') // Verify that it goes to the right page
    cy.get('#domain').type('hanzogrupo') // Type the name of the workspace
    cy.get('#submit_team_domain').click() // Click the button to Continue
    cy.get('#email').type('mariosilvaecastro@gmail.com') // Type the e-mail
    cy.get('#password').type('Abc123') // Type the password
    cy.get('#signin_btn').click() // Click the Sign in button
  })

  it('Create message and everybody can see it',()=>{
      cy.visit('https://app.slack.com/client/TSTRA82RF/CT41RNG3F') // Goes to the general group
      cy.url().should('contain', 'https://app.slack.com/client/TSTRA82RF/CT41RNG3F') // Verify that it goes to the right page
      cy.get('#undefined > p', { timeout: 10000 }).type('Test!{enter}') // Type "Test!" and press Enter   
      cy.get('div.p-rich_text_section', { timeout: 10000 }).should('have.text','Test!') // Verify that the message was posted
      cy.get('button.c-button-unstyled.p-classic_nav__model__title__info__members')
        .click() // Click the button to go to the members section

      cy.get('div.p-channel_details_section.p-channel_details__members_list_section > button.c-button-unstyled.p-channel_details_section__header > span.p-channel_details_section__title > span.p-channel_details_section__title-content')
        .should('have.text', '5 members') // Verify that all 5 the members are in the conversation so that they can see the message 
  })      
    
  it('Delete message and makes sure nobody can see it',()=>{
      cy.visit('https://app.slack.com/client/TSTRA82RF/CT41RNG3F') // Goes to the general group
      cy.url().should('contain', 'https://app.slack.com/client/TSTRA82RF/CT41RNG3F') // Verify that it goes to the right page
      cy.get('div.c-message_kit__background.p-message_pane_message__message.c-message_kit__message.p-message_pane_message__message--last > div > div.c-message_kit__actions.c-message_kit__actions--default > div.c-message_kit__gutter > div.c-message_kit__gutter__right')
        .trigger('mouseover') // Moves the mouse over the message
      cy.wait(3000)  
      cy.get('div.c-message_actions__container.c-message__actions > button:nth-of-type(5) > i.c-icon.c-icon--vertical-ellipsis')
        .click() // Click the "..." button to open the options
      
      cy.get('button.c-button-unstyled.p-message_actions_menu__delete_message.c-menu_item__button.c-menu_item__button--danger > div.c-menu_item__label')
        .click() // Click to delete message

      cy.get('button.c-button.c-button--danger.c-button--medium.c-dialog__go.null--danger.null--medium')
        .click() // Click at the button to confirm the deleting of the message

      cy.get('div.p-rich_text_section').should('not.exist') // Verify that the message does not exist anymore
        
  })      

  it('Send and edit a direct message to test_user1',()=>{
      cy.visit('https://app.slack.com/client/TSTRA82RF/DSSGYE9V1') // Goes to the conversation with "test_user1"
      cy.url().should('contain', 'https://app.slack.com/client/TSTRA82RF/DSSGYE9V1') // Verify that it goes to the right page
      cy.get('#undefined > p', { timeout: 10000 }).type('Hello!{enter}') // Type the message "Hello!"
      cy.get('div.p-rich_text_section').should('have.text','Hello!') // Verify that the message "Hello!" was posted
      cy.wait(4000)  
      cy.get('div.p-rich_text_section')
        .trigger('mouseover') // Moves the mouse over the message

      cy.wait(3000)  

      cy.get('div.c-message_actions__container.c-message__actions > button:nth-of-type(5) > i.c-icon.c-icon--vertical-ellipsis')
        .invoke('show')
        .click() // Click the "..." button to open the options
      
      cy.get('button.c-button-unstyled.p-message_actions_menu__edit_message.c-menu_item__button > div.c-menu_item__label')
        .click() // Click to edit the message

      cy.get('div.c-message__editor__input.c-texty_input--multi_line.c-texty_input.ql-container.c-texty_input--sticky_composer > div.ql-editor > p', { timeout: 10000 })
        .type('{backspace}{backspace}{backspace}{backspace}{backspace}ow are you doing?') // Edit the message

      cy.get('button.c-button.c-button--primary.c-button--small.c-message__editor__save.null--primary.null--small')
        .click() // Save the changes

      cy.get('div.p-rich_text_section').contains('How are you doing?') // Verify that message was correctly posted

      cy.get('div.p-classic_nav__model__buttons.p-classic_nav__no_drag > button:nth-of-type(2)')
        .click() // Goes to the members section

      cy.get('span.c-unified_member__secondary-name.c-unified_member__secondary-name--large')
        .should('have.text', 'test_user1') // Verify that the test_user1 is member of the conversation

      cy.get('div.c-message_kit__gutter__right')
        .trigger('mouseover') // Moves the mouse over the message
            
      cy.get('div.c-message_actions__container.c-message__actions > button:nth-of-type(5) > i.c-icon.c-icon--vertical-ellipsis', { timeout: 10000 })
        .click()  // Click the "..." button to open the options

      cy.get('button.c-button-unstyled.p-message_actions_menu__delete_message.c-menu_item__button.c-menu_item__button--danger > div.c-menu_item__label')
        .click()  // Click in the button to delete the message

      cy.get('button.c-button.c-button--danger.c-button--medium.c-dialog__go.null--danger.null--medium')
        .click() // Click in the button to confirm that we want to delete the message

      cy.get('div.p-rich_text_section')
        .should('not.exist')  // Confirm that the message does not exist anymore

  })
})