/* SwiftCourier - Authentication & Role Redirection Logic */

document.addEventListener("DOMContentLoaded", () => {
  initAuthForm();
});

function initAuthForm() {
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForm = document.getElementById("authForm");
  const demoClientBtn = document.getElementById("demoClientBtn");
  const demoAdminBtn = document.getElementById("demoAdminBtn");
  const fullNameGroup = document.getElementById("fullNameGroup");
  const submitBtn = document.getElementById("authSubmitBtn");

  let currentMode = "login";

  // Tab Switching (Login vs Register)
  authTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      authTabs.forEach(t => {
        t.classList.remove("active");
        t.style.background = "transparent";
        t.style.color = "var(--text-muted)";
      });
      tab.classList.add("active");
      tab.style.background = "var(--primary)";
      tab.style.color = "#090d16";
      
      currentMode = tab.getAttribute("data-tab");
      if (currentMode === "register") {
        if (fullNameGroup) fullNameGroup.style.display = "flex";
        if (submitBtn) submitBtn.textContent = "Create Account & Sign In";
      } else {
        if (fullNameGroup) fullNameGroup.style.display = "none";
        if (submitBtn) submitBtn.textContent = "Sign In to Account";
      }
    });
  });

  // Handle Form Submission
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const selectedRole = document.querySelector('input[name="userRole"]:checked')?.value || "client";
      const email = document.getElementById("authEmail")?.value || "user@swiftcourier.com";
      const nameInput = document.getElementById("authName")?.value || "";
      
      const defaultName = selectedRole === "admin" ? "Alex Vance (Fleet Ops)" : "John Doe (Valued Client)";
      const userName = (currentMode === "register" && nameInput.trim()) ? nameInput.trim() : defaultName;

      // Save session info
      const userSession = {
        email: email,
        role: selectedRole,
        name: userName,
        mode: currentMode,
        isLoggedIn: true
      };
      
      localStorage.setItem("swiftUserSession", JSON.stringify(userSession));
      
      // Redirect based on selected role!
      if (selectedRole === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "client-dashboard.html";
      }
    });
  }

  // Quick Demo Buttons
  if (demoClientBtn) {
    demoClientBtn.addEventListener("click", () => {
      const userSession = {
        email: "john.doe@client.com",
        role: "client",
        name: "John Doe (Client)",
        isLoggedIn: true
      };
      localStorage.setItem("swiftUserSession", JSON.stringify(userSession));
      window.location.href = "client-dashboard.html";
    });
  }

  if (demoAdminBtn) {
    demoAdminBtn.addEventListener("click", () => {
      const userSession = {
        email: "alex.vance@swiftadmin.com",
        role: "admin",
        name: "Alex Vance (Ops Admin)",
        isLoggedIn: true
      };
      localStorage.setItem("swiftUserSession", JSON.stringify(userSession));
      window.location.href = "admin-dashboard.html";
    });
  }
}
