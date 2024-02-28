const loadPhone = async (search='13',isShowAll) => {
const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
const data = await res.json();
const phones = data.data;
displayPhones(phones,isShowAll);

} 


const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

 const showAllBtn = document.getElementById('show-all-btn');
if(phones.length > 12 && !isShowAll){
    showAllBtn.classList.remove('hidden')
}else{
    showAllBtn.classList.add('hidden')
}

console.log('isShowAll',isShowAll);
if (!isShowAll){
    phones = phones.slice(0,12);
}



phones.forEach(phone => {
console.log(phone)
const newDiv = document.createElement('div');
newDiv.classList = `card p-5 bg-white shadow-xl`;
newDiv.innerHTML = `
       <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.brand}</p>
          <div class="card-actions justify-center">
            <button onClick ="showDetailsButton('${phone.slug}');" class="btn btn-primary mt-3">Show Details  </button>
          </div>
        </div>`;
        phoneContainer.appendChild(newDiv)
});
loadingSpinner(false)

}



const buttonHandler = (isShowAll) =>{
    loadingSpinner(true)
const inputField = document.getElementById('input-field');
const inputValue = inputField.value;

console.log(inputValue)
loadPhone(inputValue,isShowAll) 
} ;




const loadingSpinner = (isLoading) => {
const spinner = document.getElementById('loading-spinner');
if(isLoading){
    spinner.classList.remove('hidden')  
}else{
    spinner.classList.add('hidden')
}

} 



const handleShowAll = () => {
    buttonHandler(true);
}




const showDetailsButton = async (id) => {
    console.log('click', id)
const res = await fetch(`https://openapi.programming-hero.com/api/phones?${id}`);
const data = await res.json();
const phone = data.data
showPhoneDetails(phone)
    
}


const showPhoneDetails = (phone) => {
    const showDetailPhone = document.getElementById('show-detail-phone-name');
    showDetailPhone.innerText = phone.name;
 
    
    
    show_details_modal.showModal()

}


loadPhone();