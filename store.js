// ===== State Control =====
let currentState = "000";

function setState(state) {
  currentState = state;
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  if(state==="000") document.getElementById("home").classList.add("active");
  if(state==="100") document.getElementById("contact").classList.add("active");
  if(state==="010") document.getElementById("shop").classList.add("active");
  if(state==="001") document.getElementById("upcoming").classList.add("active");
  if(state==="BUY") document.getElementById("checkout").classList.add("active");
}

// ===== Navigation Buttons =====
document.getElementById("btnContact").onclick = () => setState("100");
document.getElementById("btnShop").onclick = () => setState("010");
document.getElementById("btnUpcoming").onclick = () => setState("001");

// ===== Home Orders Loader =====
function loadOrders() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  if(orders.length===0){orderList.innerHTML="<p>No orders placed yet.</p>"; return;}
  orders.forEach(o=>{
    const div=document.createElement("div"); div.classList.add("order-item");
    div.innerHTML=`<strong>${o.product}</strong><p>Name: ${o.name}</p><p>Phone: ${o.phone}</p><p>Address: ${o.address}</p><small>${o.date}</small>`;
    orderList.appendChild(div);
  });
}

// ===== Buy Product =====
function buyProduct(name){
  setState("BUY");
  document.getElementById("selectedProduct").innerText = name;
}

// ===== Place Order =====
function placeOrder(){
  const name=document.getElementById("name").value;
  const phone=document.getElementById("phone").value;
  const address=document.getElementById("address").value;
  const product=document.getElementById("selectedProduct").innerText;
  if(!name||!phone||!address){alert("Please fill all fields."); return;}
  const order={name,phone,address,product,date:new Date().toLocaleString()};
  let orders=JSON.parse(localStorage.getItem("orders"))||[];
  orders.push(order); localStorage.setItem("orders",JSON.stringify(orders));
  alert("Order Placed Successfully!"); 
  document.getElementById("name").value=""; document.getElementById("phone").value="";
  document.getElementById("address").value=""; setState("000"); loadOrders();
}

// ===== Reviews =====
function toggleReviewForm(){ const form=document.getElementById("reviewForm"); form.style.display=(form.style.display==="none")?"block":"none";}
function submitReview(){
  const name=document.getElementById("reviewName").value;
  const text=document.getElementById("reviewText").value;
  if(name===""||text===""){alert("Please fill all fields"); return;}
  const review={name,text}; let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
  reviews.push(review); localStorage.setItem("reviews",JSON.stringify(reviews));
  document.getElementById("reviewName").value=""; document.getElementById("reviewText").value="";
  loadReviews();
}
function loadReviews(){
  const reviewList=document.getElementById("reviewList"); reviewList.innerHTML="";
  let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
  reviews.forEach(r=>{
    const div=document.createElement("div"); div.classList.add("review-item");
    div.innerHTML=`<strong>${r.name}</strong><p>${r.text}</p>`; reviewList.appendChild(div);
  });
}

// ===== Show Products Toggle =====
function showProducts(type){alert(type+" products would show here!");}

// ===== Load Orders & Reviews on Page Load =====
window.onload=function(){loadOrders(); loadReviews();}