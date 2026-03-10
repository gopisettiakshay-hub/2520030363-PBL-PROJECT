let transactions=[]

let budget=0

// LOGIN SESSION

window.onload=function(){

if(localStorage.getItem("sessionUser")){

showDashboard()

}

}

function login(){

let u=document.getElementById("loginUser").value
let p=document.getElementById("loginPass").value

if(u==localStorage.getItem("user") && p==localStorage.getItem("pass")){

localStorage.setItem("sessionUser",u)

showDashboard()

}else{

alert("Invalid login")

}

}

function signup(){

let u=document.getElementById("signupUser").value
let p=document.getElementById("signupPass").value

localStorage.setItem("user",u)
localStorage.setItem("pass",p)

alert("Account created")

showLogin()

}

function logout(){

localStorage.removeItem("sessionUser")

location.reload()

}

function showSignup(){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("signupPage").classList.remove("hidden")

}

function showLogin(){

document.getElementById("signupPage").classList.add("hidden")
document.getElementById("loginPage").classList.remove("hidden")

}

function showDashboard(){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("dashboard").classList.remove("hidden")

}


// ADD TRANSACTION

function addTransaction(){

let desc=document.getElementById("desc").value
let amount=parseFloat(document.getElementById("amount").value)
let type=document.getElementById("type").value
let category=document.getElementById("category").value
let date=document.getElementById("date").value

transactions.push({desc,amount,type,category,date})

updateUI()

}


// UPDATE UI

function updateUI(){

let table=document.getElementById("tableData")

table.innerHTML=""

let income=0
let expense=0

transactions.forEach((t,i)=>{

if(t.type=="income") income+=t.amount
else expense+=t.amount

table.innerHTML+=`

<tr>

<td>${t.desc}</td>
<td>${t.amount}</td>
<td>${t.type}</td>
<td>${t.category}</td>
<td>${t.date}</td>

<td>

<button onclick="deleteTransaction(${i})">Delete</button>

</td>

</tr>

`

})

document.getElementById("income").innerText=income
document.getElementById("expense").innerText=expense
document.getElementById("balance").innerText=income-expense

budgetCheck(expense)

updateCharts(income,expense)

aiInsight(income,expense)

}


// DELETE

function deleteTransaction(i){

transactions.splice(i,1)

updateUI()

}


// BUDGET

function setBudget(){

budget=parseFloat(document.getElementById("budgetInput").value)

}

function budgetCheck(expense){

if(expense>budget && budget>0){

document.getElementById("budgetAlert").innerText="⚠ Budget exceeded"

}

}


// AI INSIGHT

function aiInsight(income,expense){

let msg=""

if(expense>income) msg="⚠ Spending exceeds income"

else if(expense>income*0.7) msg="⚠ Spending is very high"

else msg="✅ Spending is healthy"

document.getElementById("insightText").innerText=msg

}


// CHARTS

let chart1
let chart2
let chart3

function updateCharts(income,expense){

if(chart1) chart1.destroy()

chart1=new Chart(

document.getElementById("financeChart"),

{

type:"doughnut",

data:{
labels:["Income","Expense"],
datasets:[{data:[income,expense]}]
}

})

}


// SEARCH

function searchTransaction(){

let q=document.getElementById("searchInput").value.toLowerCase()

let result=transactions.filter(t=>t.desc.toLowerCase().includes(q))

let list=document.getElementById("searchResult")

list.innerHTML=""

result.forEach(t=>{

list.innerHTML+=`<li>${t.desc} ₹${t.amount}</li>`

})

}


// DARK MODE

function toggleTheme(){

document.body.classList.toggle("dark")

}


// EXPORT CSV

function exportCSV(){

let csv="Description,Amount,Type,Category,Date\n"

transactions.forEach(t=>{

csv+=`${t.desc},${t.amount},${t.type},${t.category},${t.date}\n`

})

let blob=new Blob([csv],{type:"text/csv"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="finance_report.csv"

a.click()

}