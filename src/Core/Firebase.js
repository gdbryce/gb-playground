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
  serverTimestamp,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from 'firebase/storage';

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

const pageLimit = 5

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  // Attempt to get google auth to allow accounts to be selected
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });

  signInWithPopup(auth, googleProvider)
    .then((res) => {
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.docs.length === 0) {
            addDoc(collection(db, "users"), {
              uid: user.uid,
              name: user.displayName,
              authProvider: "google",
              email: user.email
            })
            .catch((err) => {
              console.log(err);
              alert(err.message);
            })
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
  
};

const logInWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .catch ((err) => {
    console.log(err);
    alert(err.message);
  });
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

function getQuery(blogs, lastBlog) {
  if(!blogs) return query(collection(db, "testBlogs"),
                          orderBy("posted", "desc"),
                          limit(pageLimit))

  return query(collection(db, "testBlogs"),
                orderBy("posted", "desc"),
                startAfter(lastBlog),
                limit(pageLimit))
}

const getFireblogResults = (blogs, lastBlog) => {
  return new Promise((resolve, reject) => {
  const q = getQuery(blogs, lastBlog)

  console.log("Sending query to Firestore")
  getDocs(q)
    .then((querySnapshot) => {
      const newBlogs = querySnapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
      
      const returnBlogs = blogs ? [...blogs, ...newBlogs] : newBlogs;
      const returnLastBlog = querySnapshot.docs[pageLimit-1];
      const returnHasMore = !querySnapshot.docs.length < pageLimit

      resolve( [ returnBlogs, returnLastBlog, returnHasMore ] )
      })
      .catch((err) => {
        console.log(`Error retrieving blogs = ${err.message}`)
        reject(Error("Something went wrong with getFireblogResults"))
      })
  }) 
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  submitBlogToFirestore,
  getFireblogResults
};