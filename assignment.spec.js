/// <reference types="cypress" />

describe('User Story verification for events',function(){
   /*  before('navigate to website',function(){
        cy.visit('https://damian-events.coursedog.com/2021/11/20')
    }) */
    it('verify all events happening on 20th November',function(){
       cy.visit('/2021/11/20')
     cy.get('#main-content section h1 span').then($text=>{
        let dateText =$text.text().trim()
        cy.log('date text'+""+dateText)
        expect(dateText).to.equal('Saturday, November 20, 2021')
    })
     cy.get('.search__input').type('Tokyo')
     cy.get('.search__button > .svg-inline--fa').click();
     cy.get('.card-content').should('have.length',1)
     cy.get('#61w5wfhCtxaJ6zYlebWA').then($eventName=>{
         let eventName =$eventName.text().trim()
         expect(eventName).to.eql('Tokyo: Art and Photography')
              })
              cy.get('#search-input').clear({timeout:5000});
                     //Issue# 1-Top 'Filter by Organization gives "No results found" where as using it from side panel Filtering card>>>>Filter by organization gives 4 results. This still 
           //   does not match our expected results, so it will fail.

            //  cy.get('#orgSelect').select(' Anderson Collection at Stanford University ')
            //top org select filter
           //  cy.get('#orgSelect').select('Model UN')
           //side org select
           cy.get('.card.p-4.flex.flex-col.w-full select#orgSelect').select('Model UN',{timeout:5000})
                     cy.get('p.font-semibold.text-theme-darker').then($countText=>{
                 let countText =$countText.text().trim()
                 expect(countText).to.eql('showing 0 to 3 of 3 total results')
             })
             

    })
    it('verify featured events happening on 2nd september',function(){
        cy.visit('/2021/9/2')
        cy.get('[href="/today"]').click()
        cy.get('h1.mt-8.text-3xl.text-theme').then($eventText=>{
           let text=$eventText.text().trim() 
           expect(text).to.eql('No events found')
        })
        cy.get('[href="/featured"]').click({timeout:2000})
    
        cy.get('h1.mt-8.text-3xl.text-theme').then($featuredText=>{
            let text=$featuredText.text().trim() 
            expect(text).to.eql('showing 0 to 3 of 3 total results')
         })
         //Issue# 2-Since there are no featured events , so below code is written based on assumption.
cy.get('.card-content.flex-col').click();
cy.get('.mr-1.svg-inline--fa.fa-calendar-plus.fa-w-14').should('have.text','Add to calendar')
cy.get('.mr-1.svg-inline--fa.fa-google.fa-w-16').should('have.text','Add to Google Calendar')
cy.get('[data-test="event-type"] > .block').should('have.text','Event Type')
cy.get('[data-test="organisation"] > .font-semibold').should('have.text',' Model UN ')
cy.get('article > .text-xl').should('have.text','Event Description:')
//Issue#3 -Contacts option is missing from the events
    })
})