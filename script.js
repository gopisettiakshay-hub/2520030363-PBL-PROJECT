
// Event Handling
document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Form submitted successfully!");

});

// Array Methods Example

function showNumbers(){

let numbers=[10,20,30,40];

let sum=numbers.reduce((a,b)=>a+b);

document.getElementById("output").innerHTML=
"Numbers: "+numbers.join(", ")+"<br>Sum = "+sum;

}

// DOM Manipulation

function addSkill(){

let skill=prompt("Enter new skill");

if(skill){

let li=document.createElement("li");

li.textContent=skill;

document.getElementById("skillList").appendChild(li);

}

}

// Objects Example

let student={

name:"Akshay",
roll:2520030363,
course:"Web Technologies"

};

console.log(student);

// Local Storage

localStorage.setItem("studentName",student.name);

// Async Example

function asyncExample(){

return new Promise(resolve=>{

setTimeout(()=>{

resolve("Async Task Completed");

},2000);

});

}

asyncExample().then(console.log);