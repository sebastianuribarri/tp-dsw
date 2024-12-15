describe('Login Page E2E Tests', () => {
    const BASE_URL = 'http://localhost:5173'; // Ajusta la URL real de tu aplicación
    const API_LOGIN_ENDPOINT = 'http://localhost:5000/api/users/login'; // Endpoint relativo de la API
    
    beforeEach(() => {
      // Visita la página de login antes de cada test
     

      cy.visit(`${BASE_URL}/login`);

    });
    
    it('Should successfully log in a user', () => {
      // Simula una respuesta exitosa de la API
      // cy.intercept('GET', '/__/fonts/FiraCode-VF.woff2', { fixture: 'FiraCode-VF.woff2' });


      
      // Rellenar el formulario
      cy.get('[data-testid="username-input"]').type('TestUser');
      cy.get('[data-testid="password-input"]').type('TestPassword123');
    
      // Hacer clic en el botón de login
      cy.get('[data-testid="login-button"]').click();
    

      cy.intercept('POST', API_LOGIN_ENDPOINT, {
        statusCode: 200,
        body: {
          token: 'fakeAuthToken123',
          user: { id: 1, username: 'TestUser' },
        },
      }).as('loginRequest');
      
      // Verificar que la API se llama correctamente
      cy.wait('@loginRequest').its('request.body').should('deep.equal', {
        username: 'TestUser',
        password: 'TestPassword123',
      });
    
      // Verificar redirección a la página principal
      cy.url().should('eq', `${BASE_URL}/`);
    
      // Verificar almacenamiento en sessionStorage
      cy.window().then((win) => {
        expect(win.sessionStorage.getItem('authToken')).to.equal('fakeAuthToken123');
        expect(win.sessionStorage.getItem('userId')).to.equal('1');
      });
    });
  
    it('Should display an error for invalid credentials', () => {
      // Simula una respuesta de error de la API
      cy.intercept('POST', API_LOGIN_ENDPOINT, {
        statusCode: 401,
        body: { message: 'Invalid username or password' },
      }).as('loginRequest');
    
      // Rellenar el formulario con datos incorrectos
      cy.get('[data-testid="username-input"]').type('WrongUser');
      cy.get('[data-testid="password-input"]').type('WrongPassword');
    
      // Hacer clic en el botón de login
      cy.get('[data-testid="login-button"]').click();
    
      // Verificar que se muestra el mensaje de error
      cy.wait('@loginRequest');
      cy.get('[data-testid="error-message"]').should('contain.text', 'Invalid username or password');
    });
  
    it('Should display a loading state during login', () => {
      // Simula un retraso en la respuesta de la API
      cy.intercept('POST', API_LOGIN_ENDPOINT, (req) => {
        req.reply((res) => {
          setTimeout(() => {
            res.send({
              statusCode: 200,
              body: {
                token: 'fakeAuthToken123',
                user: { id: 1, username: 'TestUser' },
              },
            });
          }, 2000); // 2 segundos de retraso
        });
      }).as('loginRequest');
    
      // Rellenar el formulario
      cy.get('[data-testid="username-input"]').type('TestUser');
      cy.get('[data-testid="password-input"]').type('TestPassword123');
    
      // Hacer clic en el botón de login
      cy.get('[data-testid="login-button"]').click();
    
      // Verificar que el botón está en estado de carga
      cy.get('[data-testid="login-button"]').should('have.text', 'Logging in...');
    });
  });
  