import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  onSnapshot,
  collection,
  where,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from 'firebase/storage';
import { useState } from 'react'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA85yJ2NczTK-9Ff4gpi_j2pLT1uQiWdrU",
  authDomain: "gbfireblog.firebaseapp.com",
  projectId: "gbfireblog",
  storageBucket: "gbfireblog.appspot.com",
  messagingSenderId: "416288932079",
  appId: "1:416288932079:web:d86e0465927d6c72fe5b1a",
  measurementId: "G-FL4TV73HZD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      });
    }
  }
  catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  }
  catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("password reset link sent");
  }
  catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const submitBlogToFirestore = (newBlogState, setUploadingImage) => {
  const blog = {
    ...newBlogState,
    posted: serverTimestamp()
  }

  const { visible, submitted, image, imageURL, ...blogDoc } = blog
  console.log(blogDoc)

  addDoc(collection(db, "testBlogs"), blogDoc)
  .then(result => {
      console.log(`document ${result.id} has been added`);
      if (blog.blogMeta.hasBlogImage && image) {
          addDroppedImageToStorageWithFilename(image, `images/${result.id}.${image.path.substr(image.path.lastIndexOf('.') + 1)}`, setUploadingImage)
      }
  })
  .catch((err) => {
    console.log(`Error when adding fireStore document: ${err.message}`)
  })
  

};

const addDroppedImageToStorageWithFilename = ((file, filename, setUploadingImage) => {
  setUploadingImage(filename)
  
    const storage = getStorage();

    const storageRef = ref(storage, filename);

    console.log("Debugging image upload");
    console.log(storageRef);
    console.log(file);

    const uploadTask = uploadBytesResumable(storageRef, file);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
    (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            setUploadingImage(filename);
            break;
        }
    }, 
    (error) => {
        // Handle unsuccessful uploads
        setUploadingImage(null)
    }, 
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        });

        setUploadingImage(null)
    }
    );
});

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  submitBlogToFirestore
};