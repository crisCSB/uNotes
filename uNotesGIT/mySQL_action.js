class mySQL_action{ 

    constructor(mySQL){ 
       this.action = mySQL; 
    }

    homeCheckIfLogedIn(req,res){ 
    let getUserId =  req.cookies.userID;
    if(getUserId){ 

      let getNotesQuery = `SELECT * FROM note WHERE note_id =${getUserId}`;
      this.action.query(getNotesQuery,(err, notes)=>{
      if(err){
       console.log("There was a error");
       } 
   let userNoteNumber = getUserId;
   let Notes = JSON.parse(JSON.stringify(notes));
   res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
     });

       }else{ 
         res.render("home");
       }
    }

    

    SubmitSignUp(name, password, res, req){
      let query = `SELECT * FROM userAcount WHERE username = "${name}" OR password = "${password}"`;
      this.action.query(query,(err, result)=>{
        if(err){
          console.log(err);
        }
        if(result.length > 0){
         res.render("SignUp",{accountAlreadyExist:'true'});
        } else {
          let query = `INSERT INTO userAcount (username, password) VALUES ('${name}', '${password}')`;  
          this.action.query(query, (err, rows) => {
            if(err){ 
                throw err;
            }
              let getNotesQuery = `SELECT * FROM note WHERE note_id =${rows.insertId}`;
              this.action.query(getNotesQuery,(err, notes)=>{
              if(err){
               console.log("There was a error");
               } 
           res.cookie(`userID`,`${rows.insertId}`);
           let userNoteNumber = rows.insertId;
           let Notes = JSON.parse(JSON.stringify(notes));
           res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
             });
        });
        }
      }); 
  
    }

    CatchSubmitSignUpGet(req,res){ 
      let userID = req.cookies.userID;

      if(userID){
        let getNotesQuery = `SELECT * FROM note WHERE note_id =${userID}`;
        this.action.query(getNotesQuery,(err, notes)=>{
     if(err){
       console.log("There was a error");
     } 
     let userNoteNumber = userID;
     let Notes = JSON.parse(JSON.stringify(notes));
     res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
       });
              
      }else { 
        res.render("signUp");
      }

    }

    CatchSubmitLogInGet(req,res){ 
      let userID = req.cookies.userID;
      console.log(req.cookies);
      console.log(userID);
      console.log("------------------------------------------------------------------------------");
      if(userID){
        let getNotesQuery = `SELECT * FROM note WHERE note_id =${userID}`;
        this.action.query(getNotesQuery,(err, notes)=>{
     if(err){
       console.log("There was a error");
     } 
     let userNoteNumber = userID;
     let Notes = JSON.parse(JSON.stringify(notes));
     res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
       });
              
      }else { 
        res.render("LogIn", {inValidInputs:"true"});
      }

    }

    SubmitLogIn(name, password, req, res ){
        let query = `SELECT * FROM userAcount WHERE username = '${name}' AND password = '${password}'`;
        console.log(req.body);
        console.log("--------------------------------------------------------------------------------------");
        this.action.query(query, (err, results)=>{
           if(err){
             console.log(err);
           }

           if(results.length > 0){
             console.log(1);
            res.cookie(`userID`,`${results[0].note_id}`);
            let getNotesQuery = `SELECT * FROM note WHERE note_id =${results[0].note_id}`;
            this.action.query(getNotesQuery,(err, notes)=>{
         if(err){
           console.log("There was a error");
         } 
         let userNoteNumber = results[0].note_id;
         let Notes = JSON.parse(JSON.stringify(notes));
         res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
           });
           }else { 
             console.log(2);
             res.render("LogIn", {inValidInputs:"true"});
     }
   })
} 

CatchCreateNoteSubmitGet(req,res){ 
  let userID = req.cookies.userID;

  if(userID){
    let getNotesQuery = `SELECT * FROM note WHERE note_id =${userID}`;
    this.action.query(getNotesQuery,(err, notes)=>{
 if(err){
   console.log("There was a error");
 } 
 let userNoteNumber = userID;
 let Notes = JSON.parse(JSON.stringify(notes));
 res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
   });
          
  }else { 
    res.render("home");
  }

}

    CreateNoteSubmit(noteTitle, noteBody, userId, res){ 
      let query = `INSERT INTO note (note_id, note_title, note_text) VALUES (${userId}, "${noteTitle}",
      "${noteBody}")`;
      this.action.query(query,(err, result)=>{
      if(err){ 
        console.log(err);
      }
      if(result.affectedRows > 0){
        let queryGetUserNotes = `SELECT * FROM note WHERE note_id=${userId}`;
       this.action.query(queryGetUserNotes,(err,getNotes)=>{
         if(err){
          console.log(err);  
        }
       let notes =JSON.parse( JSON.stringify(getNotes));
       res.render("noteList",{ usernameIdSend:`${userId}`,allUserNotes:notes});
      }
      );  
         }
     });
    }

    CatchEditNoteGet(req, res){
      let userID = req.cookies.userID;
      if(userID){
        let getNotesQuery = `SELECT * FROM note WHERE note_id =${userID}`;
        this.action.query(getNotesQuery,(err, notes)=>{
     if(err){
       console.log("There was a error");
     } 
     let userNoteNumber = userID;
     let Notes = JSON.parse(JSON.stringify(notes));
     res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
       });
              
      }else { 
        res.render("home");
      }  
    }

    editNotePage(noteNumber, req, res){
      let getNotesQuery = `SELECT * FROM note WHERE note_number =${noteNumber}`;
      this.action.query(getNotesQuery,(err, notes)=>{
       if(err){
        console.log("There was a error");
        } 
    let Notes = JSON.parse(JSON.stringify(notes));
    res.render("editNote",{allUserNotes:Notes});
      });
    }


    EditNote(userID,noteNumber, noteTitle, noteBody ,req,res){
     let query = `UPDATE note SET note_title='${noteTitle}', note_text='${noteBody}' WHERE note_number=${noteNumber}`;
     this.action.query(query,(err,result)=>{
     if(err){
       console.log(err);
     }
     let getNotesQuery = `SELECT * FROM note WHERE note_id =${userID}`;
     this.action.query(getNotesQuery,(err, notes)=>{
      if(err){
       console.log("There was a error");
       } 
   let Notes = JSON.parse(JSON.stringify(notes));
   res.render("noteList",{usernameIdSend:userID,allUserNotes:Notes});
     });
     });
    }

     CatchDeleteNoteGet(req,res)  {
      let getUserId = req.cookies.userID;
      let getNotesQuery = `SELECT * FROM note WHERE note_id =${getUserId}`;
      this.action.query(getNotesQuery,(err, notes)=>{
      if(err){
       console.log("There was a error");
       } 
   let userNoteNumber = getUserId;
   let Notes = JSON.parse(JSON.stringify(notes));
   res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
     });
       }

    DeleteNote(noteID,req, res){ 
     if(noteID){ 
      let query =  `DELETE FROM note WHERE note_number = ${noteID}`;
      this.action.query(query,(err,result)=>{
      if(err){ 
       console.log(err);
       }
       let getUserId = req.cookies.userID;
       let getNotesQuery = `SELECT * FROM note WHERE note_id =${getUserId}`;
       this.action.query(getNotesQuery,(err, notes)=>{
       if(err){
        console.log("There was a error");
        } 
    let userNoteNumber = getUserId;
    let Notes = JSON.parse(JSON.stringify(notes));
    res.render("noteList",{usernameIdSend:`${userNoteNumber}`,allUserNotes:Notes});
      });
      });     
     }else { 
       res.render("home");
     }
    }
}

const SQLaction = new mySQL_action(mySQL);

module.exports = SQLaction