//NodeJS: localhost:3080
const express = require('express');
const app =express();
const cors=require('cors');
const {FieldValue} = require('firebase-admin/firestore')
app.use(cors())
app.use(express.json());

port =3080;

app.listen(port,()=>{
  console.log(`el port::${port} funciona`)
})

  var serviceAccount = require("./usuari-firebase-pbotiga-firebase-adminsdk-o5ll7-e4e3cb3af7.json");
  var admin = require("firebase-admin");
  const {getFirestore} = require("firebase-admin/firestore");
  const {firestore}=require ("firebase-admin")

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = getFirestore();

dbConnection();
async function dbConnection(){
  const conn = db.collection("ChampOfWhine").doc("Clients");
  const doc = await conn.get();
  if (!doc.exists){
    console.log("El document no existeix!")
  }else{
    app.get('/api/firebase',(req,res)=>{
      const document = doc.data();
      res.json(document);
    })
  }
}
app.post('/signup', async (req, res) =>{
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.json(userResponse);
})
app.post('/datausers',(req, res) => {
  db.collection("ChampOfWhine").doc("Clients").set({
    clients: FieldValue.arrayUnion({
      Adreça: req.body.direccio,
      Cognoms: req.body.cognoms,
      Correu: req.body.correu,
      Nom: req.body.nom,
      Telèfon: req.body.telèfon,
      Data_naixement: FieldValue.arrayUnion({
        dia: req.body.dia_naixement,
        mes: req.body.mes_naixement,
        year: req.body.any_naixement
      })
    })
  },{merge:true})
})




 /* db.collection('ChampOfWhine').doc('Clients').get().then(al2 =>{
    console.log(al2);
    res.json(al2)
  });*/




















/*
app.get('/api/registre', (req,res)=>{
  var serviceAccount2 = require("./usuari-firebase-pbotiga-firebase-adminsdk-o5ll7-e4e3cb3af7.json");
  var admin2 = require("firebase-admin");
  const {getFirestore} = require("firebase-admin/firestore");

  const app=admin2.initializeApp({
    credential: admin2.credential.cert(serviceAccount2)
  });

  const db = getFirestore(app);

  db.collection('ChampOfWhine').doc('Clients').get().then(al2 =>{
    console.log(al2);
    res.json(al2)
  0});

});
*/
