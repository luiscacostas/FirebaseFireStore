const firebaseConfig = {
    apiKey: "AIzaSyBI_OLNWgWJeRrHpGC1xbu9nXo2Nvn0gqg",
    authDomain: "proyectofirebase-97196.firebaseapp.com",
    projectId: "proyectofirebase-97196",
    storageBucket: "proyectofirebase-97196.appspot.com",
    messagingSenderId: "174699399615",
    appId: "1:174699399615:web:2a55b877b99cdb6311b90a"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const divDatos = document.querySelector('main div')

document.getElementById("#form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    let user = {
        name: ev.target.name.value,
        email: ev.target.email.value,
        mensaje: ev.target.mensaje.value,
        url: ev.target.img.value
    }
    almacenarBBDD(user)
    paintDocument(user)
  })

const almacenarBBDD = (user) => {
    db.collection("users")
      .add(user)
      .then((docRef) => console.log("Document written with ID: ", docRef.id))
      .catch((error) => console.error("Error adding document: ", error));
};

const paintDocument = (user)=>{
    
    const nombre = document.createElement('P')
    const mail = document.createElement('P')
    const mensaje = document.createElement('P')
    const imagen = document.createElement('IMG')
    nombre.textContent = user.name;
    mail.textContent = user.email;
    mensaje.textContent = user.mensaje;
    imagen.setAttribute('src', user.url)
    divDatos.append(nombre, mail, mensaje, imagen)
}

const readAll = () => {
  db.collection("users")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              paintDocument(doc.data());
          });
      })
      .catch((error) => console.log('Error reading documents:', error));
};
//Elminiar Todos los usuarios de Firebase
const deleteAllUsers = () => {

    db.collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc)=> {
        doc.ref.delete();
        
      });
      divDatos.innerHTML = "";
    });
}

document.getElementById('deleteAll').addEventListener('click', () => {
    deleteAllUsers();
  });

//Eliminar un solo usuario
const deleteUser = () => {
  const id = prompt('Introduce el ID del usuario a borrar');
  if (id) {
      db.collection('users').doc(id).get().then((doc) => {
          if (doc.exists) {
              doc.ref.delete().then(() => {
                  alert(`Usuario ${id} ha sido borrado`);
                  divDatos.innerHTML = "";
              }).catch(() => console.log('Error borrando Usuario'));
          } else {
              alert(`No se encontró ningún usuario con el ID ${id}`);
          }
      }).catch((error) => {
          console.log('Error obteniendo documento:', error);
      });
  }
};
  
document.getElementById('delete').addEventListener('click', () => {
    deleteUser();
  });

