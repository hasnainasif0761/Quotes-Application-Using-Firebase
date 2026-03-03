import {
    initializeApp,
    firebaseConfig,
    getFirestore,
    addDoc,
    collection,
    serverTimestamp
} from './fireConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let addQuoted = document.getElementById('addQuote');
addQuoted.addEventListener('submit',addQuote);

// Add Quote Function
async function addQuote(e) {
    e.preventDefault();
    let quoteCollRef =  collection(db,'Quotes_App');
    try {
        await addDoc(quoteCollRef,{
        text:document.getElementById('quoteInput').value,
        autherName:document.getElementById('author_name').value,
        category: document.getElementById('category').value,
        time: serverTimestamp()
    })
    console.log('Quote Added Successfully');
    document.getElementById('quoteInput').value = '';
    document.getElementById('author_name').value = '';
    document.getElementById('category').value = '';
    } catch (error) {
        console.log("Error is=>"+error.code)
        console.log("Error is=>"+error.message)
        document.getElementById('quoteInput').value = '';
        document.getElementById('author_name').value = '';
        document.getElementById('category').value = '';
    }
}


// get Quote Function