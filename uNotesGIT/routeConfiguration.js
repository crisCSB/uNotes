function routesConfiguration(mySQL_action){ 
    this.app.get('/', (req, res) => {
    mySQL_action.homeCheckIfLogedIn(req,res);
        });
             
        this.app.get('/signUp', (req, res) => {
                res.render("SignUp",{accountAlreadyExist:'false'});
                }); 

                this.app.get('/SubmitSignUp', (req, res) => {
                 res.render("SignUp",{accountAlreadyExist:'false'});
              }); 

        this.app.post('/SubmitSignUp', (req, res) => {
            let {name, password} = req.body;
            mySQL_action.SubmitSignUp(name, password, res, req);
        }); 
        
        this.app.get('/logIn', (req, res) => {
            res.render("LogIn", {inValidInputs:"false"});
            });   
          
            this.app.get('/SubmitLogIn',   (req, res) => {
              res.render("LogIn", {inValidInputs:"false"});
            }); 
        
       this.app.post('/SubmitLogIn',   (req, res) => {
          let {name, password} = req.body;
          mySQL_action.SubmitLogIn(name, password,req, res);
        }); 
        
        
          this.app.get("/createNote",(req,res)=>{
            let {userId} = req.query;
            let userIdCookie = req.cookies.userID;

            if(userId){ 
              res.render("createNote",{userId:`${userId}`});
            } else if(userIdCookie){
              res.render("createNote",{userId:`${userIdCookie}`});
            }else {
              res.render("home");
            }


        });
      
        this.app.get("/createNoteSubmit",(req,res)=>{
          mySQL_action.CatchCreateNoteSubmitGet(req,res);
        });

        this.app.post("/createNoteSubmit",(req,res)=>{
          let {noteTitle, noteBody, userId} = req.body;
          mySQL_action.CreateNoteSubmit(noteTitle, noteBody, userId, res);
        });

        this.app.get("/editNote",(req,res)=>{
          mySQL_action.CatchEditNoteGet(req, res);
         });

        this.app.post("/editNote",(req,res)=>{
         let {noteNumber} = req.body;
         mySQL_action.editNotePage(noteNumber, req, res);
        });

        this.app.get("/editNoteUpdate",(req,res)=>{
          mySQL_action.CatchEditNoteGet(req, res);
         });

        this.app.post("/editNoteUpdate",(req,res)=>{
         let {userID, noteNumber,noteTitle, noteBody} = req.body;
        mySQL_action.EditNote(userID,noteNumber, noteTitle, noteBody ,req,res);
        });

        this.app.get("/deleteNote",(req,res)=>{
        mySQL_action.CatchDeleteNoteGet(req,res);
        });

        this.app.post("/deleteNote",(req,res)=>{
          let {noteID} = req.body;
          mySQL_action.DeleteNote(noteID, req,res);
          });

        this.app.get("/logOut",(req,res)=>{
          res.clearCookie();
          res.render("home");
        });
}


module.exports = routesConfiguration