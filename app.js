import {
    initializeApp,
    firebaseConfig,
    getFirestore,
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from './fireConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var quoteCollRef = collection(db, 'Quotes_App');
let currenEditId = null;

let addQuoted = document.getElementById('addQuote');
addQuoted.addEventListener('submit', addQuote);

// Add Quote Function
async function addQuote(e) {
    e.preventDefault();

    let quoteText = document.getElementById('quoteInput').value;
    let authName = document.getElementById('author_name').value;
    let category = document.getElementById('category').value;

    try {
       if(currenEditId){
           await updateDoc(doc(db,'Quotes_App',currenEditId),{
                text: quoteText,
                autherName: authName,
                category: category
            });  
            console.log('Quote Updated Successfully');
            currenEditId = null;
       }else{
            await addDoc(quoteCollRef, {
            text: document.getElementById('quoteInput').value,
            autherName: document.getElementById('author_name').value,
            category: document.getElementById('category').value,
            time: serverTimestamp()
        })
        console.log('Quote Added Successfully');
       }
        document.getElementById('quoteInput').value = '';
        document.getElementById('author_name').value = '';
        document.getElementById('category').value = '';
        getQuote();
    } catch (error) {
        console.log("Error is=>" + error.code)
        console.log("Error is=>" + error.message)
        document.getElementById('quoteInput').value = '';
        document.getElementById('author_name').value = '';
    }
}


// get Quote Function
async function getQuote() {
    let quoteCont = document.getElementById('quoteContainer');
    quoteCont.innerHTML = ""; 
    const querySnapshot = await getDocs(quoteCollRef);
    querySnapshot.forEach((doc) => {
        let quoteCont = document.getElementById('quoteContainer');
        let data = doc.data();
        let div1 = document.createElement('div');
        div1.classList = ('w-[90%] h-20 border pl-[10px] rounded-lg mx-auto mt-2 flex justify-between items-center shadow-lg');
        let div2 = document.createElement('div');
        div2.classList = 'w-[380px]  py-2';
        let p = document.createElement('p');
        p.classList = 'text-sm mb-[2px]'
        p.textContent = `"${data.text}"`;
        let spanAuther = document.createElement('span');
        spanAuther.classList = 'ml-2 text-sm';
        spanAuther.textContent = ` --${data.autherName}`;
        let category = document.createElement('span');
        category.classList = 'text-sm bg-purple-400/60 px-[7px] ml-2 rounded-full';
        category.textContent = data.category;
        let div3 = document.createElement('div');
        div3.classList = 'px-3 flex gap-2 py-2';

        let editBtn = document.createElement('i');
        editBtn.classList = 'ri-pencil-fill bg-gray-300/70 hover:bg-gray-300/80 px-[7px] py-[3px] rounded-lg text-black cursor-pointer';

        editBtn.addEventListener('click',()=>{
            editQuote(doc.id,data);
        })

        let deleteBtn = document.createElement('i');
        deleteBtn.classList = 'ri-delete-bin-line bg-red-600/80 hover:bg-red-600/90 px-[7px] py-[3px] rounded-lg text-white cursor-pointer';

        deleteBtn.addEventListener('click',()=>{
            deleteQuote(doc.id)
        })


        div2.appendChild(p)
        div2.appendChild(spanAuther);
        div2.appendChild(category)
        div1.appendChild(div2);
        div3.appendChild(editBtn);
        div3.appendChild(deleteBtn);
        div1.appendChild(div3)
        quoteCont.appendChild(div1); 
    })
}
getQuote()


async function editQuote(id,oldata){
    document.getElementById('quoteInput').value = oldata.text;
    document.getElementById('author_name').value = oldata.autherName;
    document.getElementById('category').value = oldata.category;
    
    currenEditId = id;

}

async function deleteQuote(id) {
    if(confirm('Are your sure you want to delete this Quote')){
        await  deleteDoc(doc(db,'Quotes_App',id))
    }else{
        console.log('Quote is not delete');
    }
    getQuote();
}