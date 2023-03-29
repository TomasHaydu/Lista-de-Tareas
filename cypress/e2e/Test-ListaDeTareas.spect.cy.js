/// <reference types ='cypress'/>

describe("Lista de Tareas", () => {
  it("<Header/> - Verificar los titulos del Header", () => {
    cy.visit("http://127.0.0.1:5173/");

    //Titulo
    cy.contains("Lista de Tareas");
    cy.get("[data-cy=titulo]")
      .invoke("text")
      .should("equal", "Lista de Tareas");

    //Descripcion
    cy.contains("Organiza tu lista de tareas facilmente...");
    cy.get("[data-cy=descripcion]")
      .invoke("text")
      .should("equal", "Organiza tu lista de tareas facilmente...");
  });

  it("<Formulario/> - Verificar cada input del formualrio y sus titulos", () => {
    cy.visit("http://127.0.0.1:5173/");

    //Agrega tus tareas :
    cy.contains("Agrega tus tareas :");
    cy.get("[data-cy=titulo-formulario]")
      .invoke("text")
      .should("equal", "Agrega tus tareas :");

    //Form
    cy.get("[data-cy=form]").should("exist");

    //Titulo Formulario
    cy.contains("Titulo");
    cy.get("[data-cy=titulo-in-form]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "text");

    //Descripcion Formulario
    cy.contains("Descripcion");
    cy.get("[data-cy=descripcion-in-form]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "textarea");

    //Fecha Formulario
    cy.contains("Fecha limite");
    cy.get("[data-cy=fecha-in-form]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "date");

    //Importancia Formulario
    cy.contains("Importancia");
    cy.get("[data-cy=importancia-in-form]").should("exist");
    cy.get("[data-cy=importancia-in-form-1]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "radio");
    cy.get("[data-cy=importancia-in-form-2]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "radio");
    cy.get("[data-cy=importancia-in-form-3]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "radio");
  });

  it("<Lista de Tareas/> - Verificar que existan los elementos y que no existen tareas", () => {
    cy.visit("http://127.0.0.1:5173/");
    //Titulo
    cy.get("[data-cy=titulo-lista]")
      .invoke("text")
      .should("equal", "Sus tareas :");
    //Buscador
    cy.get("[data-cy=buscador-tareas-realizadas]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "text");
    //Select
    cy.get("[data-cy=select-tareas-realizadas]");
    //No existen tareas aun
    cy.get("[data-cy=ninguna-tarea]")
      .invoke("text")
      .should("equal", "Aun no se han agregado tareas...");
    //Button
    cy.get("[data-cy=button-tareas-realizadas]");
    //Image
    cy.get("[data-cy=img-tareas-realizdas]");
    //Titulo de boton Tareas Realizadas
    cy.get("[data-cy=titulo-tareas-realizadas]")
      .invoke("text")
      .should("equal", "Tareas Realizadas");
  });

  it("<Formulario/> - Verificar los errores", () => {
    cy.visit("http://127.0.0.1:5173/");

    //Error al no completar los campos
    cy.get("[data-cy=submite-form]").click();
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Todos los campos son obligatorios");
  });

  it("<Formulario/> - Rellenar el formulario, borrarlo y volverlo a rellenar", () => {
    cy.visit("http://127.0.0.1:5173/");

    cy.get("[data-cy=titulo-in-form]").type("Compras en supermercado");

    cy.get("[data-cy=descripcion-in-form]").type(
      "Comprar leche, pan, queso y manteca"
    );

    cy.get("[data-cy=fecha-in-form]").type("2023-03-01");

    cy.get("[data-cy=importancia-in-form-1]").click();

    cy.get("[data-cy=titulo-in-form]").clear().type("Compras en supermercado");

    cy.get("[data-cy=descripcion-in-form]")
      .clear()
      .type("Comprar leche, pan, queso y manteca");
  });

  it("<Formulario/> - Rellenar el formulario y corroborar que se haya creado la tarea y no exista la alerta", () => {
    cy.visit("http://127.0.0.1:5173/");
    //Rellenar formualrio
    cy.get("[data-cy=titulo-in-form]").type("Compras en supermercado");

    cy.get("[data-cy=descripcion-in-form]").type(
      "Comprar leche, pan, queso y manteca"
    );

    cy.get("[data-cy=fecha-in-form]").type("2023-03-01");

    cy.get("[data-cy=importancia-in-form-1]").click();
    //Enviar el formualario
    cy.get("[data-cy=submite-form]").click();

    //Corroborar que no haya nada en Formulario
    cy.get("[data-cy=tarea]").should("exist");
    cy.get("[data-cy=alerta]").should("not.exist");
    cy.get("[data-cy=titulo-in-form]").should("not.have.text");
    cy.get("[data-cy=descripcion-in-form]").should("not.have.text");
    cy.get("[data-cy=fecha-in-form]").should("not.have.text");
    cy.get("[data-cy=importancia-in-form-1]").should("not.be.checked");

    //Corroborar que exista la tarea y sus detalles
    cy.get("[data-cy=titulo-tarea]").should("exist");
    cy.get("[data-cy=descripcion-tarea]").should("exist");
    cy.get("[data-cy=fecha-tarea]").should("exist");
    cy.get("[data-cy=importancia-tarea]").should("exist");
    cy.get("[data-cy=editar-tarea]").should("exist");
    cy.get("[data-cy=eliminar-tarea]").should("exist");
    cy.get("[data-cy=check-tarea]").should("exist");
  });

  it("Funcionalidad - Agregar una tarea, testear la funcion Editar y funcion Eliminar", () => {
    cy.visit("http://127.0.0.1:5173/");

    //Agregar una tarea
    cy.get("[data-cy=titulo-in-form]").type("Compras en supermercado");
    cy.get("[data-cy=descripcion-in-form]").type(
      "Comprar leche, pan, queso y manteca"
    );
    cy.get("[data-cy=fecha-in-form]").type("2023-03-01");
    cy.get("[data-cy=importancia-in-form]").click();
    cy.get("[data-cy=submite-form]").click();

    //Editar tarea
    cy.get("[data-cy=editar-tarea]").click();

    cy.get("[data-cy=titulo-in-form]").should(
      "have.value",
      "Compras en supermercado"
    );
    cy.get("[data-cy=descripcion-in-form]").should(
      "have.value",
      "Comprar leche, pan, queso y manteca"
    );
    cy.get("[data-cy=fecha-in-form]").should("have.value", "2023-03-01");
    cy.get("[data-cy=importancia-in-form-1]").should("be.checked");

    //Eliminar tarea
    cy.get("[data-cy=eliminar-tarea]").click();

    cy.get("[data-cy=tarea-titulo]").should("not.exist");
  });

  it("Funcionalidad - Agregar dos tareas, testear la funcion Bucador, funcion Ordenar por, funcion marcar como realizada y Tareas Realizadas", () => {
    cy.visit("http://127.0.0.1:5173/");

    //Agregar 2 tareas
    cy.get("[data-cy=titulo-in-form]").type("Compras en supermercado");
    cy.get("[data-cy=descripcion-in-form]").type(
      "Comprar leche, pan, queso y manteca"
    );
    cy.get("[data-cy=fecha-in-form]").type("2023-03-01");
    cy.get("[data-cy=importancia-in-form-1]").click();
    cy.get("[data-cy=submite-form]").click();

    cy.get("[data-cy=titulo-in-form]").type("Entregar pedidos");
    cy.get("[data-cy=descripcion-in-form]").type(
      "Entregar pedido en correo a Juan, Roberto y Matias"
    );
    cy.get("[data-cy=fecha-in-form]").type("2023-04-20");
    cy.get("[data-cy=importancia-in-form-3]").click();
    cy.get("[data-cy=submite-form]").click();

    //Buscador
    cy.get("[data-cy=buscador-tareas-realizadas]").type("Compras");
    cy.get("[data-cy=tarea]:nth-child(2)").should("not.exist");

    cy.get("[data-cy=buscador-tareas-realizadas]").clear();
    cy.get("[data-cy=tarea]:nth-child(2)").should("exist");

    cy.get("[data-cy=buscador-tareas-realizadas]").type("zzzzzzzzzzz");
    cy.get("[data-cy=tarea]").should("not.exist");
    cy.get("[data-cy=ninguna-tarea]").should("exist");
    cy.get("[data-cy=buscador-tareas-realizadas]").clear();

    //Ordenar por
    cy.get("[data-cy=select-tareas-realizadas]").select("Importancia");
    cy.get("[data-cy=tarea]:nth-child(1)").should(
      "contain",
      "Entregar pedidos"
    );
    cy.get("[data-cy=tarea]:nth-child(2)").should(
      "contain",
      "Compras en supermercado"
    );

    //Abrir Tareas Realizadas
    cy.get("[data-cy=titulo-tareas-realizadas]").should("exist");
    cy.get("[data-cy=img-tareas-realizdas]").should("exist");
    cy.get("[data-cy=button-tareas-realizadas]").should("exist").click();

    cy.get("[data-cy=modal-tareas-realizadas]").should("exist");
    cy.get("[data-cy=any-tareas-realizadas]").should(
      "have.text",
      "No existen tareas realizadas..."
    );

    cy.get("[data-cy=close-tareas-realizadas]").should("exist").click();
    cy.get("[data-cy=modal-tareas-realizadas]").should("not.exist");

    //Marcar tarea realizada
    cy.get("[data-cy=check-tarea]").eq(1).click();
    cy.get("[data-cy=tarea-moviendose]").should("exist")

    //Corrobor que la tarea esté en Tareas Realizadas
    cy.get("[data-cy=button-tareas-realizadas]").click();
    cy.get("[data-cy=titulo-tarea-Trealizadas]")
      .should("exist")
      .should("contain", "Compras en supermercado");
    cy.get("[data-cy=fecha-tarea-Trealizadas]")
      .should("exist")
      .should("contain", "01-03-2023");
    cy.get("[data-cy=importancia-tarea-Trealizadas]")
      .should("exist")
      .should("contain", "alto");

    //Eliminar la tarea
    cy.get("[data-cy=eliminar-tarea-Trealizadas]").should("exist").click();
    cy.get("[data-cy=any-tareas-realizadas]").should("exist");
    cy.get("[data-cy=titulo-tarea-Trealizadas]").should("not.exist");
    cy.get("[data-cy=close-tareas-realizadas]").click();

    //Marcar una tarea y Regresarla
    cy.get("[data-cy=check-tarea]").check();
    cy.get("[data-cy=button-tareas-realizadas]").click();
    cy.get("[data-cy=regresar-tarea-Trealizadas]").click()
    cy.get("[data-cy=close-tareas-realizadas]").click();
    cy.get("[data-cy=titulo-tarea]").should("exist").should("contain", "Entregar pedidos")
  });
});
