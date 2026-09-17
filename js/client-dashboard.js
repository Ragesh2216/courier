/* SwiftCourier - Client Dashboard Logic */

document.addEventListener("DOMContentLoaded", () => {
  initClientDashboard();
});

function initClientDashboard() {
  renderUserSession();
  renderClientTimeline();
  renderClientShipments();
  initBookingForm();
}

function renderUserSession() {
  const sessionRaw = localStorage.getItem("swiftUserSession");
  if (!sessionRaw) return;

  try {
    const session = JSON.parse(sessionRaw);
    if (session && session.email) {
      const email = session.email;
      const name = session.name || "Valued Client";

      const emailTextEl = document.getElementById("clientEmailText");
      const topEmailEl = document.getElementById("clientTopEmail");
      const pillEmailEl = document.getElementById("clientPillEmail");
      const welcomeNameEl = document.getElementById("clientWelcomeName");
      const nameDisplayEl = document.getElementById("clientUserNameDisplay");
      const avatarEl = document.getElementById("clientAvatarDisplay");

      if (emailTextEl) emailTextEl.textContent = email;
      if (topEmailEl) topEmailEl.textContent = email;
      if (pillEmailEl) pillEmailEl.textContent = email;
      if (nameDisplayEl) nameDisplayEl.textContent = name;
      if (welcomeNameEl) welcomeNameEl.textContent = name.split(" ")[0] || "Client";
      if (avatarEl && name) {
        const parts = name.split(" ");
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
        avatarEl.textContent = initials;
      }
    }
  } catch (err) {
    console.error("Failed to parse user session:", err);
  }
}

function renderClientTimeline() {
  const activePackage = SwiftData.shipments[0]; // Active package for current user
  if (!activePackage) return;

  const pkgIdEl = document.getElementById("clientActivePkgId");
  const pkgEstEl = document.getElementById("clientActivePkgEst");
  const timelineBar = document.getElementById("clientTimelineProgressBar");
  const stepsContainer = document.getElementById("clientTimelineSteps");

  if (pkgIdEl) pkgIdEl.textContent = activePackage.id;
  if (pkgEstEl) pkgEstEl.textContent = activePackage.estimatedDelivery;

  // Set progress width percentage based on step
  const pct = ((activePackage.currentStep - 1) / (activePackage.timeline.length - 1)) * 100;
  if (timelineBar) timelineBar.style.width = pct + "%";

  if (stepsContainer) {
    stepsContainer.innerHTML = activePackage.timeline.map((step, idx) => {
      const isCompleted = idx + 1 < activePackage.currentStep;
      const isActive = idx + 1 === activePackage.currentStep;
      let stateClass = "";
      if (isCompleted) stateClass = "completed";
      if (isActive) stateClass = "active";

      return `
        <div class="timeline-step ${stateClass}">
          <div class="step-node">
            ${isCompleted ? '<i class="fas fa-check"></i>' : isActive ? '<i class="fas fa-shipping-fast"></i>' : (idx + 1)}
          </div>
          <div class="step-label">${step.title}</div>
          <div class="step-time">${step.time}</div>
        </div>
      `;
    }).join("");
  }
}

function renderClientShipments() {
  const tbody = document.getElementById("clientShipmentsTbody");
  if (!tbody) return;

  tbody.innerHTML = SwiftData.shipments.map(s => {
    let badgeClass = "badge-warning";
    if (s.status === "Delivered") badgeClass = "badge-success";
    if (s.status === "Out for Delivery") badgeClass = "badge-info";

    return `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td>${s.recipient}</td>
        <td>${s.type}</td>
        <td><span class="badge ${badgeClass}">${s.status}</span></td>
        <td>${s.estimatedDelivery}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="showReceiptModal('${s.id}')">
            <i class="fas fa-file-invoice"></i> Receipt
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function openBookModal() {
  const modal = document.getElementById("bookModal");
  if (modal) modal.classList.add("active");
}

function closeBookModal() {
  const modal = document.getElementById("bookModal");
  if (modal) modal.classList.remove("active");
}

function initBookingForm() {
  const form = document.getElementById("clientBookForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newId = "TRK-" + Math.floor(1000 + Math.random() * 9000) + "-EX";
      const recipient = document.getElementById("bookRecipient")?.value || "Jane Smith";
      const address = document.getElementById("bookAddress")?.value || "San Francisco, CA";
      const type = document.getElementById("bookType")?.value || "Express Courier";

      const newShipment = {
        id: newId,
        sender: "John Doe (Client)",
        recipient: `${recipient} (${address})`,
        origin: "Client Local Hub",
        destination: address,
        status: "Pending Pickup",
        type: type,
        weight: "2.0 kg",
        estimatedDelivery: "Tomorrow, 2:00 PM",
        currentStep: 1,
        timeline: [
          { title: "Order Created", time: "Just Now", location: "Online Portal" },
          { title: "Picked Up by Courier", time: "Pending", location: "Assigned Driver" },
          { title: "Arrived at Sorting Hub", time: "Pending", location: "Local Hub" },
          { title: "Out for Local Delivery", time: "Pending", location: "Courier Fleet" },
          { title: "Delivered to Doorstep", time: "Pending", location: "Destination" }
        ]
      };

      SwiftData.shipments.unshift(newShipment);
      renderClientShipments();
      closeBookModal();
      window.location.href = "404.html";
    });
  }
}

function showReceiptModal(id) {
  const shipment = SwiftData.shipments.find(s => s.id === id);
  if (!shipment) return;

  const modal = document.getElementById("receiptModal");
  const content = document.getElementById("receiptModalContent");

  if (modal && content) {
    content.innerHTML = `
      <div style="text-align: center; border-bottom: 1px dashed var(--border-glass); padding-bottom: 1rem; margin-bottom: 1rem;">
        <i class="fas fa-box" style="font-size: 2rem; color: var(--primary);"></i>
        <h3 style="margin-top: 0.5rem;">Official Shipping Receipt</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Invoice #${shipment.id}</p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span style="color: var(--text-muted);">Sender:</span>
        <strong>${shipment.sender}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span style="color: var(--text-muted);">Recipient:</span>
        <strong>${shipment.recipient}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
        <span style="color: var(--text-muted);">Service Type:</span>
        <strong>${shipment.type}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 1.25rem;">
        <span style="color: var(--text-muted);">Amount Paid:</span>
        <strong style="color: var(--primary); font-size: 1.2rem;">$48.50 USD</strong>
      </div>

      <a href="404.html" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; display: inline-block;">Download PDF Copy</a>
    `;
    modal.classList.add("active");
  }
}

function closeReceiptModal() {
  const modal = document.getElementById("receiptModal");
  if (modal) modal.classList.remove("active");
}
