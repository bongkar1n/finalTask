const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const dbConn = require("../lib/db");

router.get("/", (request, response, next) => {
    dbConn.query(
        'SELECT * from heroes_tb order by type_id ASC',
        // 'SELECT heroes_tb.id, heroes_tb.name, type_tb.name from heroes_tb left join type_tb on heroes_tb.type_id = type_tb.id order by heroes_tb.type_id ASC',

        (error, rows) => {
        if(error){
            request.flash("error", error); 
            response.render("heroes", { data: [] });
        } else {
            
            response.render("heroes", {
                data: rows,
                
            });
        }
    }
    );
});

router.get("/add", (request, response) => {
    response.render("add", {
        name: "",
        type_id: "",
    });
});

router.get("/add2", (request, response) => {
  response.render("add2", {
      id: "",
      name: "",
  });
});

router.post("/add2", (request, response) => {
  const {id, name} = request.body;
  let errors = false;
  let errorMessages;

  if(id.length === 0 || name.length === 0){
      errors = true;
      if (id.length === 0){
          errorMessages = "Please enter ur id";
      } else if (name.length === 0){
          errorMessages = "Please enter hero type"
      }

      request.flash("error", errorMessages);
      response.render("add2", {
        id,
        name,
      });
  }
  if(!errors){
      const formData = {
        id,
        name,
      };
      dbConn.query("INSERT INTO type_tb SET ?", formData, (error, result) => {
          if (error) {
              request.flash("error", error);
              response.render("add2", {
                id,
                name,
              });
          } else {
              request.flash("success", "Type successfully added");
              response.redirect("/heroes");
          }
      })
  }

});

router.post("/add", (request, response) => {
    const {name, type_id} = request.body;
    let errors = false;
    let errorMessages;

    if(name.length === 0 || type_id.length === 0){
        errors = true;
        if (name.length === 0){
            errorMessages = "Please enter ur name";
        } else if (type_id.length === 0){
            errorMessages = "Please enter hero type"
        }

        request.flash("error", errorMessages);
        response.render("add", {
            name,
            type_id,
        });
    }
    if(!errors){
        const formData = {
            name,
            type_id,
        };
        dbConn.query("INSERT INTO heroes_tb SET ?", formData, (error, result) => {
            if (error) {
                request.flash("error", error);
                response.render("add", {
                    name,
                    type_id,
                });
            } else {
                request.flash("success", "Hero successfully added");
                response.redirect("/heroes");
            }
        })
    }

});

router.get("/edit/(:id)", (request, response) => {
   const { id } = request.params;

   dbConn.query("SELECT * FROM heroes_tb WHERE id =" + id, (error, rows) => {
       if (error) throw error;

       if (rows.length <= 0) {
           request.flash("error", "Hero is not found");
           response.redirect("/heroes");
       } else {
           response.render("edit", {
               id: rows[0].id,
               name: rows[0].name,
               type_id: rows[0].type_id,
           })
       }
   })
    });

    router.post("/update/(:id)", (request, response) => {
        const { id } = request.params;
        const { name, type_id } = request.body;
        let error = false;
        if(name.length === 0 || type_id.length === 0){
            errors = true;
            if (name.length === 0){
                errorMessages = "Please enter ur name";
            } else if (type_id.length === 0){
                errorMessages = "Please enter hero type"
            }
    
            request.flash("error", errorMessages);
            response.render("edit", {
                id,
                name,
                type_id,
            });
        }

        if(!error){
            const formData = {
                name,
                type_id,
            }
            dbConn.query("UPDATE heroes_tb SET ? WHERE id =" + id, formData, (error, result) => {
                if (error) {
                    request.flash("error", error);
                    response.render("edit", {
                        id,
                        name,
                        type_id,
                    });
            } else {
                request.flash("success", "Hero is successfully updated");
                response.redirect("/heroes");
            }
            
       })
    }
});

router.get("/delete/(:id)", (request, response) => {
    const { id } = request.params;

    dbConn.query("DELETE FROM heroes_tb WHERE id =" + id, (error, result) => {
        if (error){
            request.flash("error", error);
           
        } else {
            request.flash("success", "Hero is successfully deleted");
           
        } 
        response.redirect("/heroes");
    });
});



module.exports = router;
