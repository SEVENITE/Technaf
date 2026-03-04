// Hardcoded Admin Credentials
const ADMIN_EMAIL = "playerthesigma@gmail.com";
const ADMIN_PASSWORD = "TechnaF2026"; // change as needed

// Login Function
function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;
  const errorMsg = document.getElementById("loginError");

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin-panel.html"; // redirect to dashboard
  } else {
    errorMsg.textContent = "Incorrect Email or Password!";
  }
}

// ===== Admin Panel Functionality =====
if (window.location.pathname.includes("admin-panel.html")) {
  // Check if admin is logged in
  if (localStorage.getItem("isAdmin") !== "true") {
    window.location.href = "admin.html";
  }

  // Logout function
  window.logout = function() {
    localStorage.removeItem("isAdmin");
    window.location.href = "admin.html";
  }

  // Load Orders
  function loadAdminOrders() {
    const orderList = document.getElementById("adminOrderList");
    orderList.innerHTML = "";

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
      orderList.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    orders.forEach(o => {
      const div = document.createElement("div");
      div.classList.add("order-item");
      div.innerHTML = `
        <strong>${o.product}</strong>
        <p>Name: ${o.name}</p>
        <p>Phone: ${o.phone}</p>
        <p>Address: ${o.address}</p>
        <small>${o.date}</small>
      `;
      orderList.appendChild(div);
    });
  }

  // Load orders on page load
  window.onload = function() {
    loadAdminOrders();
  };
}