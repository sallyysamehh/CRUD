let title = document.getElementById("title");
let costInputs = document.querySelectorAll("#costInputs input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let createBtn = document.getElementById("createBtn");
let tbody = document.getElementById("tbody");
let removeAllBtn = document.querySelector("#removeAll");
let countElement = document.querySelector("#countElement")
let inputs = document.querySelector("input");
let validationMessage = document.querySelectorAll("#validationMessage");
let validationMessageNumber = document.querySelectorAll("#validationMessageNumber");

let validationStatus = false;

let checkValidaton = () =>{
    for(let index=0 ; index<inputs.length ; index++){
        if(inputs[index].value == ""){
           validationStatus = false;
           validationMessage[index].style.display= 'block';
    
        }else{
            validationStatus = true;
        }
    }
}

let checkValidatonCostInputs = () =>{
    for(let index=0 ; index<costInputs.length ; index++){
        if(costInputs[index].value <=0 ){
           validationStatus = false;
           validationMessageNumber[index].style.display = 'block';
    
        }else{
            validationStatus = true;
        }
    }
}


let allData;
let mood = "create";
let globalId

if(localStorage.products == null){
    allData = [];
}else{
    allData = JSON.parse(localStorage.products);

}

let getTotalPrice = ()=>{
    let price = costInputs[0].value;
    let tax = costInputs[1].value;
    let delivery = costInputs[2].value;
    let discount = costInputs[3].value;
    let taxCost = +price * +tax/100 ;
    let priceAfterTax = +taxCost + +price ;
    let priceAfterTaxAndDelivery = +priceAfterTax + +delivery ;
    let total = +priceAfterTaxAndDelivery - +discount ;
    costInputs[4].value = Math.ceil(total);
}

for(let i=0; i<costInputs.length; i++){
    costInputs[i].addEventListener("keyup",getTotalPrice);
}

let createProductObject = ()=>{
    let newProduct ={
        title : title.value,
        price : costInputs[0].value,
        tax : costInputs[1].value,
        delivery : costInputs[2].value,
        discount : costInputs[3].value,
        total : costInputs[4].value,
        count : count.value,
        department : department.value,

    }
    checkValidaton();
    checkValidatonCostInputs();

    if(validationStatus == true ){
        if(mood == "create"){
            if( newProduct.count > 1){
                for(let i=0; i<=newProduct.count ;i++){
                    allData.push(newProduct);
                }
            }else{
                allData.push(newProduct);
            }
           }else{
              allData[globalId] = newProduct;
              mood = "create";
              count.classList.remove("none");
           }

           console.log(allData);
           localStorage.setItem("products", JSON.stringify(allData));
           showData();
           clearInputs();
    }
}

createBtn.addEventListener("click", createProductObject);

let showData = ()=>{
    let trs ="";

    for(let i=0; i<allData.length; i++){
        trs +=`
        <tr>
            <td> ${i + 1}</td>
            <td> ${allData[i].title} </td>
            <td> ${allData[i].price} </td>
            <td> ${allData[i].tax} </td>
            <td> ${allData[i].delivery} </td>
            <td> ${allData[i].discount} </td>
            <td> ${allData[i].total} </td>
            <td> ${allData[i].department} </td>
            <td> <i onclick="removeOneItem(${i})" class=" text-danger fa-solid fa-trash"></i> </td>
            <td> <i onclick="editOneItem(${i})" class=" text-warning fa-solid fa-pen-to-square"></i> </td> 

        </tr>

        `
    }
    countElement.innerHTML = allData.length;
    if(allData.length >0){
        removeAllBtn.classList.remove("none");
    
    }else{
        removeAllBtn.classList.add("none");
    }

    tbody.innerHTML =trs;
};

showData();

let clearInputs = () =>{
     title.value =''
     costInputs[0].value =''
     costInputs[1].value =''
     costInputs[2].value =''
     costInputs[3].value =''
     costInputs[4].value =''
     count.value =''
     department.value =''
}

let removeAllFunction = () =>{
    if(confirm("Are You Sure")){
        localStorage.clear();
        allData.splice(0);
        showData();
    }
    
}

removeAllBtn.addEventListener("click", removeAllFunction);

let removeOneItem = (i) =>{
    allData.splice(i,1);
    localStorage.products = JSON.stringify(allData);
    showData();
}


let editOneItem = (i) =>{
    mood = "update";
    title.value = allData[i].title;
    costInputs[0].value = allData[i].price;
    costInputs[1].value = allData[i].tax;
    costInputs[2].value = allData[i].delivery;
    costInputs[3].value = allData[i].discount;
    costInputs[4].value = allData[i].total;
    department.value = allData[i].department;
    globalId = i;
    count.classList.add("none");
    createBtn.innerHTML = ` update Product Now ${i+1}`;

}

