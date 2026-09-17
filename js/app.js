/* SwiftCourier - Main Application Logic */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTrackingWidget();
  initRateCalculator();
  initNewsletterForm();
  initNumberCounters();
});

/* Mobile Drawer Logic */
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const overlay = document.querySelector(".drawer-overlay");

  if (toggleBtn && drawer && overlay) {
    toggleBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    });
  }
}

/* Home Tracking Search Widget */
function initTrackingWidget() {
  const trackingForm = document.getElementById("trackingForm");
  const trackingInput = document.getElementById("trackingInput");
  const trackingResultBox = document.getElementById("trackingResultBox");

  if (trackingForm && trackingInput && trackingResultBox) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const code = trackingInput.value.trim().toUpperCase();
      
      // Validation Check: If input contains '404' or fails validation length (< 3 chars)
      if (code === "404" || code === "INVALID" || code.length < 3) {
        window.location.href = "404.html";
        return;
      }

      const found = SwiftData.shipments.find((s) => s.id.toUpperCase() === code || code.includes("TRK"));
      const match = found || SwiftData.shipments[0]; // fallback match

      trackingResultBox.innerHTML = `
        <div class="glass-card" style="margin-top: 1.5rem; border-color: var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="badge badge-warning">${match.status}</span>
              <h3 style="margin-top: 0.5rem; font-size: 1.3rem;">Tracking ID: ${match.id}</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem;">${match.type} • Weight: ${match.weight}</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.85rem; color: var(--text-dim);">Est. Delivery:</span>
              <p style="font-weight: 700; color: var(--accent);">${match.estimatedDelivery}</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 1.5rem;">
            <div><strong style="color: var(--text-muted);">From:</strong> <br>${match.origin}</div>
            <div><strong style="color: var(--text-muted);">To:</strong> <br>${match.destination}</div>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 8px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--primary);">Latest Progress Update:</h4>
            <div style="display: flex; gap: 1rem; align-items: flex-start;">
              <i class="fas fa-truck-loading" style="color: var(--accent); font-size: 1.2rem; margin-top: 2px;"></i>
              <div>
                <p style="font-weight: 700;">${match.timeline[match.currentStep - 1]?.title || 'In Transit'}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted);">${match.timeline[match.currentStep - 1]?.location} — ${match.timeline[match.currentStep - 1]?.time}</p>
              </div>
            </div>
          </div>
          <div style="margin-top: 1rem; text-align: center; display: flex; gap: 0.5rem; justify-content: center;">
            <a href="login.html" class="btn btn-primary btn-sm">Sign In to View Live GPS Map</a>
            <a href="404.html" class="btn btn-outline btn-sm" style="color: var(--danger); border-color: rgba(239,68,68,0.3);">Test 404 Validation</a>
          </div>
        </div>
      `;
    });
  }
}

/* Shipping Rate Calculator */
function initRateCalculator() {
  const calcForm = document.getElementById("rateCalcForm");
  const calcOutput = document.getElementById("calcOutput");

  if (calcForm && calcOutput) {
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById("calcWeight")?.value || "1");
      const service = document.getElementById("calcService")?.value || "express";
      const distance = document.getElementById("calcDistance")?.value || "domestic";

      let basePrice = 12.00;
      if (service === "same-day") basePrice = 28.00;
      if (service === "air-cargo") basePrice = 45.00;
      if (service === "cold-chain") basePrice = 60.00;

      let distMultiplier = 1.0;
      if (distance === "regional") distMultiplier = 1.4;
      if (distance === "international") distMultiplier = 2.8;

      const totalPrice = ((basePrice + (weight * 3.5)) * distMultiplier).toFixed(2);

      calcOutput.innerHTML = `
        <div style="padding: 1.5rem; background: var(--bg-card); border: 1px solid var(--primary); border-radius: 12px; text-align: center;">
          <span style="color: var(--text-muted); font-size: 0.9rem;">Calculated Delivery Estimate</span>
          <h2 style="font-size: 2.5rem; color: var(--primary); margin: 0.5rem 0;">$${totalPrice} USD</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Includes standard insurance ($500 limit) + live real-time GPS tracking.</p>
          <a href="login.html" class="btn btn-accent btn-sm">Book Shipment Now</a>
        </div>
      `;
    });
  }
}

/* Newsletter Subscription */
function initNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "404.html";
    });
  });
}

/* Number Counters Animation */
function initNumberCounters() {
  const counters = document.querySelectorAll(".counter-val");
  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-target") || "100");
    const isFloat = counter.getAttribute("data-float") === "true";
    let current = 0;
    const increment = target / 35;
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        const valStr = isFloat ? target.toFixed(1) : Math.round(target).toLocaleString();
        counter.textContent = valStr + (counter.getAttribute("data-suffix") || "");
      } else {
        const valStr = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
        counter.textContent = valStr + (counter.getAttribute("data-suffix") || "");
        setTimeout(updateCounter, 30);
      }
    };
    updateCounter();
  });
}
