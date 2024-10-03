# prompts usados en la sesión

```
eres un experto en automación de pruebas de QA usando Cypress.

fijate en @cambio-fase.cy.js . quiero cambiar esta spec para que la primera cosa que haga sea navegar a la homepage de LTI en la dirección http://localhost:3000/. 

cambia los nodos `describe` y `it` para que describan de manera precisa lo que está pasando en la prueba. usa buenas practicas de desarollo de pruebas con Cypress.

para asegurarse que estamos en la página principal, esta spec debería comprobar que hay una tag <h1> con el texto `Dashboard del Reclutador`.
```

```
quiero que la URL inicial esté en una variable de entorno de Cypress
```

```
ahora quiero agregar un nuevo escenario a @cambio-fase.cy.js . quiero que clique sobre el botón que dice `Ir a Posiciones` y se asegure de que la página siguiente tenga una tag <h2> con el texto `Posiciones`
```

```
este nuevo escenario está bien del todo? es suficientemente robusto? qué tipos de problemas crees que podrían suceder en el futuro? no generes códigos, listame hasta 5 puntos de mejora. usa buenas practicas de desarollo de pruebas con Cypress.
```

```
sobre usar selectores más específicos, de qué manera puedo asegurarme de que la prueba seguirá funcionando si el texto "Ir a Posiciones" dentro la tag <a> se cambia?
```

```
quiero usar un atributo data-*
```

```
también quiero aplicar la sugerencia sobre Verificación de la URL y quitar la verificación de la tag h2.
```

```
ahora quiero que al final del `it` sobre lo cual estamos trabajando en @cambio-fase.cy.js , una vez cargada la pagina, se clique sobre el primer botón que tenga el texto `Ver proceso`. actualiza la descripción para asegurarse de que siga relevante.
```

```
quiero usar atributos data-* y evitar problemas en el futuro, en la casualidad de que el botón `Ver proceso` cambie de texto
```

```
en este mismo `it` ahora quiero comprobar que se muestran las columnas correspondientes a cada fase del proceso de contratación ("Initial Screening", "Technical Interview" y "Manager Interview". estas columnas son identificadas por tags <div> usando la clase CSS `card-header`.
```

```
ahora comprueba que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual. el candidato con el nombre "Carlos García" debería estar en la fase "Initial Screening". Los candidatos "John Doe" y "Jane Smith" debería estar en la fase "Technical Interview". 

tal y como dicho anteriormente, cada fase del proceso de contratación es identificada por una tag <div> usando la clase CSS `card-header`. los candidatos son identificados por una tag <div> usando la clase CSS `card-body`. una <div> usando la clase CSS `card` tendrá como mínimo una fase del proceso y 0 o más candidatos. para identificar que un candidato está en una determinada fase, debes comprobar la relación entre divs usando las tags `card-header` y `card-body`.
```

```
sabes como simular una acción de drag n drop usando Cypress y React? indicame hasta 5 opciones de implementación, ya sea usando alguna librería o implementando un comando customizado de Cypress.
```

```javascript
// solucion drag n drop
// fichero: cypress/support/commands.js

Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        });
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true            
                        })
                        .trigger('mouseup');
                });
        });
});


// fichero: cambio-fase.cy.js

cy.get('[data-rbd-draggable-id="3"]').dragAndDrop(
    '[data-rbd-draggable-id="3"]',
    '[data-rbd-droppable-id="1"]'
);

```

```
quiero añadir una nueva verificación al último bloque `it` que se ve en @cambio-fase.cy.js 

quiero comprobar que el candidato "Carlos García" ahora se encuentra en la fase "Technical Interview".
```

```
comprueba tambien que se hizo una llamada al endpoint PUT /candidate/:id
```
