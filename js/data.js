/* SwiftCourier - Data Store (Mock Data) */

const SwiftData = {
  shipments: [
    {
      id: "TRK-8849-NY",
      sender: "TechCorp Logistics Inc",
      recipient: "John Doe (Manhattan, NY)",
      origin: "New York Hub A",
      destination: "104 5th Ave, New York, NY",
      status: "In Transit",
      type: "Express Air Freight",
      weight: "4.2 kg",
      estimatedDelivery: "Today, 4:30 PM",
      currentStep: 3,
      timeline: [
        { title: "Order Created", time: "Sep 16, 08:30 AM", location: "New York HQ" },
        { title: "Picked Up by Courier", time: "Sep 16, 11:15 AM", location: "Driver #104 (Mark)" },
        { title: "Arrived at Sorting Hub", time: "Sep 16, 04:00 PM", location: "Central JFK Hub" },
        { title: "Out for Local Delivery", time: "Sep 17, 09:00 AM", location: "Manhattan Van #12" },
        { title: "Delivered to Doorstep", time: "Pending", location: "Destination" }
      ]
    },
    {
      id: "TRK-9921-LA",
      sender: "Glow Beauty Cosmetics",
      recipient: "Sarah Jenkins (Los Angeles, CA)",
      origin: "Chicago Hub B",
      destination: "742 Evergreen Terrace, LA",
      status: "Out for Delivery",
      type: "Same-Day Courier",
      weight: "1.8 kg",
      estimatedDelivery: "Today, 2:15 PM",
      currentStep: 4,
      timeline: [
        { title: "Order Created", time: "Sep 17, 06:00 AM", location: "Chicago Store" },
        { title: "Picked Up by Courier", time: "Sep 17, 07:30 AM", location: "Express Van #04" },
        { title: "Arrived at Sorting Hub", time: "Sep 17, 09:45 AM", location: "LA Regional Hub" },
        { title: "Out for Local Delivery", time: "Sep 17, 11:30 AM", location: "LA Courier Fleet" },
        { title: "Delivered to Doorstep", time: "Pending", location: "Destination" }
      ]
    },
    {
      id: "TRK-3045-LDN",
      sender: "Apex Global Pharma",
      recipient: "St. Thomas Medical Center (London)",
      origin: "Frankfurt Hub C",
      destination: "Westminster, London UK",
      status: "Delivered",
      type: "Cold-Chain Medical",
      weight: "12.5 kg",
      estimatedDelivery: "Sep 16, 03:00 PM",
      currentStep: 5,
      timeline: [
        { title: "Order Created", time: "Sep 15, 10:00 AM", location: "Frankfurt Bio-Park" },
        { title: "Picked Up by Courier", time: "Sep 15, 01:20 PM", location: "Refrigerated Truck #09" },
        { title: "Arrived at Sorting Hub", time: "Sep 15, 07:00 PM", location: "Frankfurt Air Hub" },
        { title: "Out for Local Delivery", time: "Sep 16, 08:30 AM", location: "London Van #88" },
        { title: "Delivered to Doorstep", time: "Sep 16, 02:45 PM", location: "Signed by Nurse Reception" }
      ]
    },
    {
      id: "TRK-5510-TK",
      sender: "Nexus Electronics",
      recipient: "Kenji Sato (Shinjuku, Tokyo)",
      origin: "Taipei Port",
      destination: "Shinjuku-ku, Tokyo, JP",
      status: "In Transit",
      type: "International Ocean Cargo",
      weight: "85.0 kg",
      estimatedDelivery: "Sep 20, 10:00 AM",
      currentStep: 2,
      timeline: [
        { title: "Order Created", time: "Sep 14, 09:00 AM", location: "Taipei Warehouse" },
        { title: "Picked Up by Courier", time: "Sep 14, 02:00 PM", location: "Container Port" },
        { title: "Arrived at Sorting Hub", time: "Sep 16, 08:00 AM", location: "Pacific Cargo Vessel" },
        { title: "Out for Local Delivery", time: "Pending", location: "Tokyo Hub" },
        { title: "Delivered to Doorstep", time: "Pending", location: "Destination" }
      ]
    },
    {
      id: "TRK-1102-DB",
      sender: "Desert Gold Trading",
      recipient: "Al Maktoum Tower (Dubai, UAE)",
      origin: "Dubai Airport Hub",
      destination: "Downtown Dubai, UAE",
      status: "Pending Pickup",
      type: "V.I.P Security Courier",
      weight: "0.5 kg",
      estimatedDelivery: "Today, 6:00 PM",
      currentStep: 1,
      timeline: [
        { title: "Order Created", time: "Sep 17, 12:15 PM", location: "Dubai Online Portal" },
        { title: "Picked Up by Courier", time: "Pending", location: "Armored Vehicle #01" },
        { title: "Arrived at Sorting Hub", time: "Pending", location: "Dubai Hub" },
        { title: "Out for Local Delivery", time: "Pending", location: "Downtown Fleet" },
        { title: "Delivered to Doorstep", time: "Pending", location: "Destination" }
      ]
    }
  ],

  drivers: [
    { name: "Robert Miller", id: "DRV-101", vehicle: "Ford Transit EV #12", status: "En Route", activeDeliveries: 14, battery: "88%", region: "New York Downtown" },
    { name: "Elena Rostova", id: "DRV-108", vehicle: "Mercedes Sprinter #04", status: "Delivering", activeDeliveries: 8, battery: "64%", region: "Manhattan Midtown" },
    { name: "Marcus Vance", id: "DRV-205", vehicle: "Electric Cargo Drone #02", status: "In Transit", activeDeliveries: 3, battery: "92%", region: "Brooklyn Air Zone" },
    { name: "David Chen", id: "DRV-312", vehicle: "Volvo Cargo Truck #99", status: "Idle at Hub", activeDeliveries: 0, battery: "100%", region: "JFK Airport Hub" }
  ],

  blogPosts: [
    {
      id: 1,
      title: "How AI-Driven Route Optimization Cuts Delivery Times by 40%",
      category: "Logistics Tech",
      date: "Sep 14, 2026",
      readTime: "5 min read",
      author: "Dr. Aris Vance",
      summary: "Explore how machine learning algorithms calculate traffic, weather, and dynamic road conditions to ensure same-day parcel delivery.",
      image: "tech"
    },
    {
      id: 2,
      title: "The Zero-Emission Fleet Transformation: Delivering Green in 2026",
      category: "Sustainability",
      date: "Sep 10, 2026",
      readTime: "4 min read",
      author: "Samantha Thorne",
      summary: "Our commitment to transitioning 100% of urban delivery vans to electric and drone technology by the end of this decade.",
      image: "green"
    },
    {
      id: 3,
      title: "Cold-Chain Logistics Best Practices for High-Value Pharmaceuticals",
      category: "Specialized Freight",
      date: "Sep 04, 2026",
      readTime: "7 min read",
      author: "Marcus Brody",
      summary: "Real-time temperature telemetry and automated alert triggers that safeguard life-saving vaccines and bio-tech shipments.",
      image: "pharma"
    }
  ],

  faqs: [
    {
      q: "How fast is SwiftCourier Express Same-Day Delivery?",
      a: "Our Same-Day Express service guarantees pickup within 30 minutes of booking and delivery within 2 to 4 hours across major metropolitan coverage zones."
    },
    {
      q: "What happens if my package is delayed or damaged?",
      a: "Every shipment booked via SwiftCourier includes automatic baseline coverage up to $500 with option for 100% full-value insurance add-on."
    },
    {
      q: "Can I integrate SwiftCourier shipping API into my e-commerce store?",
      a: "Yes! We provide turnkey RESTful API integrations, Webhooks, and official plugins for Shopify, WooCommerce, Magento, and custom React applications."
    },
    {
      q: "How can I switch between Customer and Admin modes?",
      a: "Navigate to the Login page and click on either the Customer or Admin radio pill before signing in with demo credentials."
    }
  ]
};
