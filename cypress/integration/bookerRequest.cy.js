
describe('API Testing ', function() {   
    Cypress.config('baseUrl', 'https://restful-booker.herokuapp.com')

    const bodyJson = { 
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2023-04-04",
        "checkout" : "2023-04-04"
    },
    "additionalneeds" : "Breakfast"    
   }

   it('Retrieve Hotel Reservation', () => {
    cy.request({method:'GET',url:'/booking/2', body:bodyJson, failOnStatusCode: false}).as('validateHeader') 
    .then(response => {	
        const respBody = (response.body)	
        expect(response).to.have.property('status', 200) 
        expect(response.duration).to.below(400) 	
        expect(respBody.firstname).to.not.be.null
        expect(respBody.lastname).to.not.be.null 
        expect(respBody.totalprice).to.not.be.null
        expect(respBody.depositpaid).to.not.be.null 
        expect(respBody.bookingdates.checkin).to.not.be.null
        expect(respBody.bookingdates.checkout).to.not.be.null
        cy.get('@validateHeader').its('headers').its('content-type')
        .should('include', 'application/json; charset=utf-8')
        })
    }) 

    it('Create Hotel Reservation', () => {
        cy.request({method:'POST',url:'/booking', body:bodyJson, failOnStatusCode: false}).as('validateHeader') 
        .then(response => {	
            const respBody = (response.body)	
            expect(response).to.have.property('status', 200) 
            expect(response.duration).to.below(400) 
            expect(respBody.booking.bookingid).to.not.be.null	
            expect(respBody.booking.firstname).to.eq(bodyJson.firstname) 
            expect(respBody.booking.lastname).to.eq(bodyJson.lastname) 
            expect(respBody.booking.totalprice).to.eq(bodyJson.totalprice) 
            expect(respBody.booking.depositpaid).to.eq(bodyJson.depositpaid) 
            expect(respBody.booking.bookingdates.checkin).to.eq(bodyJson.bookingdates.checkin) 
            expect(respBody.booking.bookingdates.checkout).to.eq(bodyJson.bookingdates.checkout)
            expect(respBody.booking.additionalneeds).to.eq(bodyJson.additionalneeds) 
            cy.get('@validateHeader').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')
            })
        })  
    })