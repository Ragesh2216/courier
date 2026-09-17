/* SwiftCourier - Admin Dashboard Logic */

document.addEventListener("DOMContentLoaded", () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  renderUserSession();
  renderAdminTable();
  renderDriverList();
  initAdminCharts();

  // Search filter
  const searchInput = document.getElementById("adminSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      renderAdminTable(q);
    });
  }
}

function renderUserSession() {
  const sessionRaw = localStorage.getItem("swiftUserSession");
  if (!sessionRaw) return;

  try {
    const session = JSON.parse(sessionRaw);
    if (session && session.email) {
      const email = session.email;
      const name = session.name || "Alex Vance";

      const emailTextEl = document.getElementById("adminEmailText");
      const pillEmailEl = document.getElementById("adminPillEmail");
      const nameDisplayEl = document.getElementById("adminUserNameDisplay");
      const avatarEl = document.getElementById("adminAvatarDisplay");

      if (emailTextEl) emailTextEl.textContent = email;
      if (pillEmailEl) pillEmailEl.textContent = email;
      if (nameDisplayEl) nameDisplayEl.textContent = name;
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

function renderAdminTable(query = "") {
  const tbody = document.getElementById("adminShipmentsTbody");
  if (!tbody) return;

  const filtered = SwiftData.shipments.filter(s => 
    s.id.toLowerCase().includes(query) ||
    s.sender.toLowerCase().includes(query) ||
    s.recipient.toLowerCase().includes(query) ||
    s.status.toLowerCase().includes(query)
  );

  tbody.innerHTML = filtered.map(s => {
    let badgeClass = "badge-warning";
    if (s.status === "Delivered") badgeClass = "badge-success";
    if (s.status === "Out for Delivery") badgeClass = "badge-info";
    if (s.status === "Pending Pickup") badgeClass = "badge-primary";

    return `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td>${s.sender}</td>
        <td>${s.recipient}</td>
        <td>${s.type}</td>
        <td><span class="badge ${badgeClass}">${s.status}</span></td>
        <td>${s.estimatedDelivery}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openAdminModal('${s.id}')">
            <i class="fas fa-edit"></i> Manage
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderDriverList() {
  const driverContainer = document.getElementById("adminDriversList");
  if (!driverContainer) return;

  driverContainer.innerHTML = SwiftData.drivers.map(d => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 8px; margin-bottom: 0.75rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 700;">
          <i class="fas fa-truck"></i>
        </div>
        <div>
          <h4 style="font-size: 0.9rem;">${d.name} (${d.id})</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted);">${d.vehicle} • ${d.region}</p>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="badge badge-success">${d.status}</span>
        <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">${d.activeDeliveries} Active Parcels</p>
      </div>
    </div>
  `).join("");
}

function openAdminModal(shipmentId) {
  const shipment = SwiftData.shipments.find(s => s.id === shipmentId);
  if (!shipment) return;

  const modal = document.getElementById("adminModal");
  const modalContent = document.getElementById("adminModalContent");

  if (modal && modalContent) {
    modalContent.innerHTML = `
      <h3>Update Shipment Status — ${shipment.id}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">Recipient: ${shipment.recipient}</p>
      
      <div class="form-group">
        <label class="form-label">Current Status</label>
        <select id="modalStatusSelect" class="form-select">
          <option value="Pending Pickup" ${shipment.status === 'Pending Pickup' ? 'selected' : ''}>Pending Pickup</option>
          <option value="In Transit" ${shipment.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
          <option value="Out for Delivery" ${shipment.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
          <option value="Delivered" ${shipment.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Assign Driver / Fleet Vehicle</label>
        <select class="form-select">
          <option>Robert Miller (Ford Transit EV #12)</option>
          <option>Elena Rostova (Mercedes Sprinter #04)</option>
          <option>Marcus Vance (Cargo Drone #02)</option>
        </select>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn btn-outline btn-sm" onclick="closeAdminModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="saveStatus('${shipment.id}')">Save Changes</button>
      </div>
    `;
    modal.classList.add("active");
  }
}

function saveStatus(shipmentId) {
  const newStatus = document.getElementById("modalStatusSelect")?.value;
  const shipment = SwiftData.shipments.find(s => s.id === shipmentId);
  if (shipment && newStatus) {
    shipment.status = newStatus;
    if (newStatus === "Delivered") shipment.currentStep = 5;
    if (newStatus === "Out for Delivery") shipment.currentStep = 4;
    if (newStatus === "In Transit") shipment.currentStep = 3;
    renderAdminTable();
  }
  closeAdminModal();
}

function closeAdminModal() {
  const modal = document.getElementById("adminModal");
  if (modal) modal.classList.remove("active");
}

function initAdminCharts() {
  const ctx = document.getElementById("adminRevenueChart");
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Daily Deliveries Completed',
          data: [1200, 1450, 1320, 1680, 1950, 1540, 1890],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Express Air Cargo',
          data: [420, 510, 480, 610, 720, 580, 690],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
}
