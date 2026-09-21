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
  const authName = document.getElementById("authName");
  const submitBtn = document.getElementById("authSubmitBtn");
  const authAlert = document.getElementById("authAlert");
  const authAlertMsg = document.getElementById("authAlertMsg");

  let currentMode = "login";

  function switchTab(mode) {
    currentMode = mode;
    authTabs.forEach(tab => {
      const tabTarget = tab.getAttribute("data-tab");
      if (tabTarget === mode) {
        tab.classList.add("active");
        tab.style.background = "var(--primary)";
        tab.style.color = "#090d16";
      } else {
        tab.classList.remove("active");
        tab.style.background = "transparent";
        tab.style.color = "var(--text-muted)";
      }
    });

    if (mode === "register") {
      if (fullNameGroup) fullNameGroup.style.display = "flex";
      if (authName) authName.required = true;
      if (submitBtn) submitBtn.textContent = "Create Account";
    } else {
      if (fullNameGroup) fullNameGroup.style.display = "none";
      if (authName) authName.required = false;
      if (submitBtn) submitBtn.textContent = "Sign In to Account";
    }
  }

  // Tab Switching (Login vs Register)
  authTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetMode = tab.getAttribute("data-tab");
      if (authAlert) authAlert.style.display = "none";
      switchTab(targetMode);
    });
  });

  // Handle Form Submission
  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const selectedRole = document.querySelector('input[name="userRole"]:checked')?.value || "client";
      const email = document.getElementById("authEmail")?.value || "user@swiftcourier.com";
      const nameInput = authName?.value || "";
      const passwordInput = document.getElementById("authPassword");

      if (currentMode === "register") {
        // Register mode: save user registration and switch to Sign In tab
        const registeredUser = {
          name: nameInput.trim() || (selectedRole === "admin" ? "Alex Vance" : "John Doe"),
          email: email,
          role: selectedRole
        };
        localStorage.setItem("swiftRegisteredUser", JSON.stringify(registeredUser));

        if (passwordInput) passwordInput.value = "";

        // Show registration success banner
        if (authAlert) {
          if (authAlertMsg) {
            authAlertMsg.textContent = "Registration successful! Please sign in with your credentials.";
          }
          authAlert.style.display = "flex";
        }

        // Move to Sign In page / tab
        switchTab("login");
        return;
      }

      // Sign In mode: navigate to respective dashboard
      const defaultName = selectedRole === "admin" ? "Alex Vance (Fleet Ops)" : "John Doe (Valued Client)";
      let userName = defaultName;
      
      const savedUser = localStorage.getItem("swiftRegisteredUser");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.email === email) {
            userName = parsed.name;
          }
        } catch (err) {}
      }

      // Save session info
      const userSession = {
        email: email,
        role: selectedRole,
        name: userName,
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
