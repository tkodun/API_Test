describe('PetStore API Test ', function() {   
    Cypress.config('baseUrl', 'https://petstore.swagger.io/v2/pet')

    function IDNumber(int) {
        var text = "";
        var possible = "123456789";
        for (var i = 0; i < int; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
     }  
     
     function RandomName(string) {
        var text = ""; 
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i = 0; i < string; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }    

    const id = JSON.parse(IDNumber(9)) 
    const categoryId = JSON.parse(IDNumber(7))
    const tagsId = JSON.parse(IDNumber(4)+"0")
    const eMail = RandomName(6)
    const bodyJson = {
        "id": id,
        "category": {
          "id": categoryId,
          "name": "Marvel"
        },
        "name": "CatMan",
        "photoUrls": [
          eMail+"@test.com"
        ],
        "tags": [
          {
            "id": tagsId,
            "name": "SuperCat"
          }
        ],
        "status": "available"
      }

   it('Add a New Pet to the Store', () => {
    cy.request({method:'POST',url:'/', body:bodyJson, failOnStatusCode: false}).as('validateHeader') 
    .then(response => {	
        const respBody = (response.body)	
        expect(response).to.have.property('status', 200) 
        expect(response.duration).to.below(800) 	
        expect(respBody.id).to.not.be.null
        expect(respBody.category.id).to.eq(bodyJson.category.id) 
        expect(respBody.category.name).to.eq(bodyJson.category.name) 
        expect(respBody.name).to.eq(bodyJson.name) 
        expect(respBody.photoUrls[0]).to.eq(bodyJson.photoUrls[0]) 
        expect(respBody.tags[0].id).to.eq(bodyJson.tags[0].id) 
        expect(respBody.tags[0].name).to.eq(bodyJson.tags[0].name) 
        cy.get('@validateHeader').its('headers').its('content-type')
        .should('include', 'application/json')
        })
    }) 

    it('Delete a Newly Added Pet from the Store using PetID', () => {
        cy.request({method:'POST',url:'/', body:bodyJson, failOnStatusCode: false}) 
        .then(response1 => {		
            const respBodyID = (response1.body.id)
            expect(response1).to.have.property('status', 200) 
            expect(response1.duration).to.below(800) 

       cy.request({method:'DELETE',url:'/'+respBodyID, body:bodyJson, failOnStatusCode: false})
        .then(response => {	
        const respBody = (response.body)	
        expect(response).to.have.property('status', 200) 
        expect(response.duration).to.below(800) 	
        expect(respBody.code).to.eq(200)
        expect(respBody.type).to.eq('unknown') 
        expect(respBody.message).to.eq(''+respBodyID+'') 
       })
      }) 
     })
    })
