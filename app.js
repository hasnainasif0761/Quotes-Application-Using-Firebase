import {
    initializeApp,
    firebaseConfig,
    getFirestore,
    addDoc,
    collection,
    doc,
    getDocs,
    serverTimestamp
} from './fireConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var quoteCollRef = collection(db, 'Quotes_App');

let addQuoted = document.getElementById('addQuote');
addQuoted.addEventListener('submit', addQuote);

// Add Quote Function
async function addQuote(e) {
    e.preventDefault();
    try {
        await addDoc(quoteCollRef, {
            text: document.getElementById('quoteInput').value,
            autherName: document.getElementById('author_name').value,
            category: document.getElementById('category').value,
            time: serverTimestamp()
        })
        console.log('Quote Added Successfully');
        document.getElementById('quoteInput').value = '';
        document.getElementById('author_name').value = '';
        document.getElementById('category').value = '';
    } catch (error) {
        console.log("Error is=>" + error.code)
        console.log("Error is=>" + error.message)
        document.getElementById('quoteInput').value = '';
        document.getElementById('author_name').value = '';
        document.getElementById('category').value = '';
    }
}


// get Quote Function
async function getQuote() {
    const querySnapshot = await getDocs(quoteCollRef);
    querySnapshot.forEach((doc) => {
        document.getElementById('quoteContainer').innerHTML = `
    <h1 class="ml-7 text-xl text-gray-600 mb-2">All Quotes</h1>
    <div class="w-[90%] h-20 border pl-[10px] rounded-lg mx-auto mt-2 flex justify-between items-center shadow-lg">
                    <div class="w-[380px]  py-2">   
                        <p class="text-sm mb-[2px]">"Believe you can add you're halfway there."</p>
                        <span class="text-sm">-- Theodore Roosevelt</span>
                        <span class="text-sm bg-purple-400/60 px-[7px] rounded-full">Motivation</span>
                    </div>
                    <div class="px-3 flex gap-2 py-2">
                        <i class="ri-pencil-fill bg-gray-300/70 hover:bg-gray-300/80 px-[7px] py-[3px] rounded-lg text-black cursor-pointer"></i>
                        <i class="ri-delete-bin-line bg-red-600/80 hover:bg-red-600/90 px-[7px] py-[3px] rounded-lg text-white cursor-pointer"></i>
                    </div>
                    <div></div>
            </div>
    `
    })
}
getQuote()