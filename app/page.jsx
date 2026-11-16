 "use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign,
  Clock3, Droplet, Edit3, Filter, Heart, HeartHandshake, Home, Hospital,
  LayoutDashboard, LogIn, LogOut, MapPin, Menu, MessageCircle, MoreHorizontal,
  Plus, Search, ShieldCheck, SlidersHorizontal, Sparkles, Stethoscope, Trash2,
  TrendingUp, User, UserCheck, UserCog, Users, Wallet, X, Zap
} from "lucide-react";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const DISTRICTS = [
  "Dhaka", "Chattogram", "Gazipur", "Narayanganj", "Sylhet", "Rajshahi",
  "Khulna", "Cumilla", "Mymensingh", "Barishal", "Rangpur", "Bogura"
];

const seedUsers = [
  { id: "u-admin", name: "Ayesha Rahman", email: "admin@vitaflow.demo", password: "demo1234", role: "Admin", status: "active", bloodGroup: "A+", district: "Dhaka", upazila: "Dhanmondi", avatar: "", createdAt: "2026-01-10" },
  { id: "u-donor", name: "Nafis Ahmed", email: "donor@vitaflow.demo", password: "demo1234", role: "Donor", status: "active", bloodGroup: "O+", district: "Dhaka", upazila: "Mirpur", avatar: "", createdAt: "2026-02-04" },
  { id: "u-volunteer", name: "Sadia Islam", email: "volunteer@vitaflow.demo", password: "demo1234", role: "Volunteer", status: "active", bloodGroup: "B+", district: "Gazipur", upazila: "Tongi", avatar: "", createdAt: "2026-02-18" },
  { id: "u-4", name: "Tanvir Hasan", email: "tanvir@example.com", password: "demo1234", role: "Donor", status: "active", bloodGroup: "B-", district: "Chattogram", upazila: "Pahartali", avatar: "", createdAt: "2026-03-02" },
  { id: "u-5", name: "Maliha Noor", email: "maliha@example.com", password: "demo1234", role: "Donor", status: "active", bloodGroup: "AB+", district: "Dhaka", upazila: "Uttara", avatar: "", createdAt: "2026-03-12" },
  { id: "u-6", name: "Fahim Chowdhury", email: "fahim@example.com", password: "demo1234", role: "Volunteer", status: "active", bloodGroup: "O-", district: "Sylhet", upazila: "Zindabazar", avatar: "", createdAt: "2026-03-21" },
  { id: "u-7", name: "Nusrat Jahan", email: "nusrat@example.com", password: "demo1234", role: "Donor", status: "blocked", bloodGroup: "A-", district: "Rajshahi", upazila: "Boalia", avatar: "", createdAt: "2026-04-01" },
  { id: "u-8", name: "Rafiul Karim", email: "rafiul@example.com", password: "demo1234", role: "Donor", status: "active", bloodGroup: "AB-", district: "Narayanganj", upazila: "Siddhirganj", avatar: "", createdAt: "2026-04-12" }
];

const seedRequests = [
  { id: "r-1001", requesterName: "Nafis Ahmed", requesterEmail: "donor@vitaflow.demo", recipientName: "Rahima Begum", recipientDistrict: "Dhaka", recipientUpazila: "Dhanmondi", hospitalName: "Popular Medical College Hospital", fullAddress: "Dhanmondi, Dhaka", bloodGroup: "O+", donationDate: "2026-11-19", donationTime: "10:30", requestMessage: "Urgent blood needed for a scheduled operation.", status: "pending", donorInfo: null, createdAt: "2026-11-15" },
  { id: "r-1002", requesterName: "Tanvir Hasan", requesterEmail: "tanvir@example.com", recipientName: "Mohammad Ali", recipientDistrict: "Chattogram", recipientUpazila: "Pahartali", hospitalName: "Chattogram Medical College Hospital", fullAddress: "Pahartali, Chattogram", bloodGroup: "B-", donationDate: "2026-11-18", donationTime: "14:00", requestMessage: "One bag required. Please contact the family before arriving.", status: "inprogress", donorInfo: { name: "Sadia Islam", email: "volunteer@vitaflow.demo" }, createdAt: "2026-11-14" },
  { id: "r-1003", requesterName: "Maliha Noor", requesterEmail: "maliha@example.com", recipientName: "Sajid Hossain", recipientDistrict: "Dhaka", recipientUpazila: "Uttara", hospitalName: "Kuwait Bangladesh Friendship Hospital", fullAddress: "Uttara, Dhaka", bloodGroup: "AB+", donationDate: "2026-11-20", donationTime: "09:00", requestMessage: "A family member needs support. Thank you for helping.", status: "pending", donorInfo: null, createdAt: "2026-11-13" },
  { id: "r-1004", requesterName: "Nafis Ahmed", requesterEmail: "donor@vitaflow.demo", recipientName: "Shirin Akter", recipientDistrict: "Gazipur", recipientUpazila: "Tongi", hospitalName: "Tongi General Hospital", fullAddress: "Tongi, Gazipur", bloodGroup: "A+", donationDate: "2026-11-12", donationTime: "16:00", requestMessage: "Thank you to everyone who shared this request.", status: "done", donorInfo: { name: "Ayesha Rahman", email: "admin@vitaflow.demo" }, createdAt: "2026-11-08" },
  { id: "r-1005", requesterName: "Fahim Chowdhury", requesterEmail: "fahim@example.com", recipientName: "Jamal Uddin", recipientDistrict: "Sylhet", recipientUpazila: "Zindabazar", hospitalName: "Sylhet MAG Osmani Medical College Hospital", fullAddress: "Medical Road, Sylhet", bloodGroup: "O-", donationDate: "2026-11-21", donationTime: "11:00", requestMessage: "Rare blood group. Any help will be appreciated.", status: "pending", donorInfo: null, createdAt: "2026-11-16" }
];

const seedFundings = [
  { id: "f-201", donorName: "Ayesha Rahman", userEmail: "admin@vitaflow.demo", amount: 50, status: "completed", transactionId: "vf_demo_82K1", createdAt: "2026-11-10" },
  { id: "f-202", donorName: "Nafis Ahmed", userEmail: "donor@vitaflow.demo", amount: 25, status: "completed", transactionId: "vf_demo_91L4", createdAt: "2026-11-12" },
  { id: "f-203", donorName: "Maliha Noor", userEmail: "maliha@example.com", amount: 10, status: "completed", transactionId: "vf_demo_35P8", createdAt: "2026-11-14" }
];

const money = (n) => `$${Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
const initials = (name = "VitaFlow") => name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
const dateLabel = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const statusLabel = (s) => ({ pending: "Pending", inprogress: "In progress", done: "Completed", canceled: "Cancelled" }[s] || s);
const statusClass = (s) => ({ pending: "status-pending", inprogress: "status-progress", done: "status-done", canceled: "status-canceled" }[s] || "status-pending");
const newId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark"><Droplet size={23} fill="currentColor" strokeWidth={1.7} /></span>
      {!compact && <span className="brand-word">vita<span>flow</span><small>DONATION NETWORK</small></span>}
    </div>
  );
}

function Avatar({ name, size = "md", image }) {
  return <span className={`avatar avatar-${size}`}>{image ? <img src={image} alt={name} /> : initials(name)}</span>;
}

function Status({ value }) {
  return <span className={`status-pill ${statusClass(value)}`}><i />{statusLabel(value)}</span>;
}

function Field({ label, children, hint }) {
  return <label className="field"><span className="field-label">{label}</span>{children}{hint && <small className="field-hint">{hint}</small>}</label>;
}

function EmptyState({ title, text, action, onAction }) {
  return <div className="empty-state"><span className="empty-icon"><Droplet size={24} /></span><h3>{title}</h3><p>{text}</p>{action && <button className="btn btn-primary btn-sm" onClick={onAction}>{action}</button>}</div>;
}

function Modal({ title, subtitle, onClose, children, wide = false }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className={`modal ${wide ? "modal-wide" : ""}`}><div className="modal-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={19} /></button></div>{children}</div></div>;
}

export default function HomePage() {
  const [users, setUsers] = useState(seedUsers);
  const [requests, setRequests] = useState(seedRequests);
  const [fundings, setFundings] = useState(seedFundings);
  const [sessionId, setSessionId] = useState("");
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("home");
  const [authMode, setAuthMode] = useState("signin");
  const [authOpen, setAuthOpen] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", role: "Donor", bloodGroup: "O+", district: "Dhaka", upazila: "" });
  const [requestModal, setRequestModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [requestForm, setRequestForm] = useState({ recipientName: "", recipientDistrict: "Dhaka", recipientUpazila: "", hospitalName: "", fullAddress: "", bloodGroup: "O+", donationDate: "", donationTime: "", requestMessage: "" });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notice, setNotice] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [requestSearch, setRequestSearch] = useState("");
  const [requestFilter, setRequestFilter] = useState({ bloodGroup: "All groups", district: "All districts", status: "All status" });
  const [donorFilter, setDonorFilter] = useState({ bloodGroup: "All groups", district: "All districts", query: "" });
  const [fundAmount, setFundAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentBusy, setPaymentBusy] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", bloodGroup: "O+", district: "Dhaka", upazila: "" });
  const [page, setPage] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All roles");

  const currentUser = users.find((u) => u.id === sessionId) || null;
  const isAdmin = currentUser?.role === "Admin";
  const isVolunteer = currentUser?.role === "Volunteer";
  const isDonor = currentUser?.role === "Donor";

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("vitaflow_users");
      const storedRequests = localStorage.getItem("vitaflow_requests");
      const storedFundings = localStorage.getItem("vitaflow_fundings");
      const storedSession = localStorage.getItem("vitaflow_session");
      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedRequests) setRequests(JSON.parse(storedRequests));
      if (storedFundings) setFundings(JSON.parse(storedFundings));
      if (storedSession) setSessionId(storedSession);
    } catch (e) {
      console.warn("Could not restore demo data", e);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("vitaflow_users", JSON.stringify(users));
    localStorage.setItem("vitaflow_requests", JSON.stringify(requests));
    localStorage.setItem("vitaflow_fundings", JSON.stringify(fundings));
    if (sessionId) localStorage.setItem("vitaflow_session", sessionId);
    else localStorage.removeItem("vitaflow_session");
  }, [ready, users, requests, fundings, sessionId]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3600);
    return () => clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({ name: currentUser.name, bloodGroup: currentUser.bloodGroup || "O+", district: currentUser.district || "Dhaka", upazila: currentUser.upazila || "" });
    }
  }, [sessionId]);

  const totalFunding = fundings.reduce((sum, f) => sum + Number(f.amount || 0), 0);
  const activeRequests = requests.filter((r) => ["pending", "inprogress"].includes(r.status));
  const publicRequests = requests.filter((r) => r.status === "pending" || r.status === "inprogress");
  const donors = users.filter((u) => u.role === "Donor" && u.status === "active");

  const showNotice = (message, type = "success") => setNotice({ message, type });
  const navigate = (next) => { setView(next); setMobileNav(false); setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openAuth = (mode = "signin") => { setAuthMode(mode); setAuthOpen(true); setMobileNav(false); };

  const signIn = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email.toLowerCase() === authForm.email.toLowerCase() && u.password === authForm.password);
    if (!user) return showNotice("Email or password is incorrect. Try a demo account.", "error");
    if (user.status === "blocked") return showNotice("This account is currently blocked.", "error");
    setSessionId(user.id);
    setAuthOpen(false);
    navigate("dashboard");
    showNotice(`Welcome back, ${user.name.split(" ")[0]}!`);
  };

  const signUp = (e) => {
    e.preventDefault();
    if (users.some((u) => u.email.toLowerCase() === authForm.email.toLowerCase())) return showNotice("An account with this email already exists.", "error");
    const user = { id: newId("u"), name: authForm.name.trim(), email: authForm.email.trim(), password: authForm.password, role: "Donor", status: "active", bloodGroup: authForm.bloodGroup, district: authForm.district, upazila: authForm.upazila.trim(), avatar: "", createdAt: new Date().toISOString().slice(0, 10) };
    setUsers((prev) => [...prev, user]);
    setSessionId(user.id);
    setAuthOpen(false);
    navigate("dashboard");
    showNotice("Your donor account has been created.");
  };

  const quickLogin = (role) => {
    const email = role === "Admin" ? "admin@vitaflow.demo" : role === "Volunteer" ? "volunteer@vitaflow.demo" : "donor@vitaflow.demo";
    const user = users.find((u) => u.email === email);
    if (!user) return;
    setSessionId(user.id);
    setAuthOpen(false);
    navigate("dashboard");
    showNotice(`Demo ${role.toLowerCase()} account opened.`);
  };

  const signOut = () => {
    setSessionId("");
    navigate("home");
    showNotice("You have been signed out.");
  };

  const openCreateRequest = (request = null) => {
    setEditingRequest(request);
    setRequestForm(request ? {
      recipientName: request.recipientName, recipientDistrict: request.recipientDistrict, recipientUpazila: request.recipientUpazila,
      hospitalName: request.hospitalName, fullAddress: request.fullAddress, bloodGroup: request.bloodGroup,
      donationDate: request.donationDate, donationTime: request.donationTime, requestMessage: request.requestMessage
    } : { recipientName: "", recipientDistrict: currentUser?.district || "Dhaka", recipientUpazila: currentUser?.upazila || "", hospitalName: "", fullAddress: "", bloodGroup: currentUser?.bloodGroup || "O+", donationDate: "", donationTime: "", requestMessage: "" });
    setRequestModal(true);
  };

  const saveRequest = (e) => {
    e.preventDefault();
    if (!currentUser) return openAuth("signin");
    if (editingRequest) {
      setRequests((prev) => prev.map((r) => r.id === editingRequest.id ? { ...r, ...requestForm } : r));
      showNotice("Request details updated.");
    } else {
      const item = { id: newId("r"), ...requestForm, requesterName: currentUser.name, requesterEmail: currentUser.email, status: "pending", donorInfo: null, createdAt: new Date().toISOString().slice(0, 10) };
      setRequests((prev) => [item, ...prev]);
      showNotice("Your blood request has been published.");
    }
    setRequestModal(false);
    navigate(isAdmin || isVolunteer ? "all-requests" : "my-requests");
  };

  const deleteRequest = (id) => {
    if (!window.confirm("Delete this blood request?")) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showNotice("Request deleted.");
  };

  const updateStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    showNotice(`Request marked as ${statusLabel(status).toLowerCase()}.`);
  };

  const donateToRequest = (request) => {
    if (!currentUser) return openAuth("signin");
    if (request.status !== "pending") return showNotice("This request is no longer available.", "error");
    setRequests((prev) => prev.map((r) => r.id === request.id ? { ...r, status: "inprogress", donorInfo: { name: currentUser.name, email: currentUser.email } } : r));
    setSelectedRequest(null);
    showNotice("Thank you! You are now connected with the requester.");
  };

  const makePayment = (e) => {
    e.preventDefault();
    if (!currentUser) return openAuth("signin");
    const amount = fundAmount === "custom" ? Number(customAmount) : Number(fundAmount);
    if (!amount || amount < 1 || amount > 10000) return showNotice("Enter an amount between $1 and $10,000.", "error");
    setPaymentBusy(true);
    setTimeout(() => {
      const item = { id: newId("f"), donorName: currentUser.name, userEmail: currentUser.email, amount, status: "completed", transactionId: `vf_demo_${Math.random().toString(36).slice(2, 8).toUpperCase()}`, createdAt: new Date().toISOString().slice(0, 10) };
      setFundings((prev) => [item, ...prev]);
      setPaymentBusy(false);
      setCustomAmount("");
      showNotice(`Thank you for your ${money(amount)} demo contribution!`);
    }, 850);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setUsers((prev) => prev.map((u) => u.id === currentUser.id ? { ...u, ...profileForm } : u));
    showNotice("Your profile has been updated.");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return showNotice("Please choose an image file.", "error");
    if (file.size > 1024 * 1024) return showNotice("Please choose an image smaller than 1 MB.", "error");
    const reader = new FileReader();
    reader.onload = () => {
      setUsers((prev) => prev.map((u) => u.id === currentUser.id ? { ...u, avatar: reader.result } : u));
      showNotice("Profile photo updated.");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
    showNotice("User status updated.");
  };

  const changeRole = (id, role) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
    showNotice("User role updated.");
  };

  const filteredRequests = useMemo(() => requests.filter((r) => {
    const q = requestSearch.toLowerCase();
    const matchesText = !q || [r.recipientName, r.hospitalName, r.recipientDistrict, r.recipientUpazila, r.requesterName].join(" ").toLowerCase().includes(q);
    const matchesGroup = requestFilter.bloodGroup === "All groups" || r.bloodGroup === requestFilter.bloodGroup;
    const matchesDistrict = requestFilter.district === "All districts" || r.recipientDistrict === requestFilter.district;
    const matchesStatus = requestFilter.status === "All status" || r.status === requestFilter.status;
    return matchesText && matchesGroup && matchesDistrict && matchesStatus;
  }), [requests, requestSearch, requestFilter]);

  const filteredDonors = useMemo(() => donors.filter((u) => {
    const q = donorFilter.query.toLowerCase();
    return (donorFilter.bloodGroup === "All groups" || u.bloodGroup === donorFilter.bloodGroup) &&
      (donorFilter.district === "All districts" || u.district === donorFilter.district) &&
      (!q || [u.name, u.district, u.upazila].join(" ").toLowerCase().includes(q));
  }), [donors, donorFilter]);

  const filteredUsers = useMemo(() => users.filter((u) => {
    const q = userSearch.toLowerCase();
    return (!q || [u.name, u.email, u.district].join(" ").toLowerCase().includes(q)) &&
      (userRoleFilter === "All roles" || u.role === userRoleFilter);
  }), [users, userSearch, userRoleFilter]);

  const myRequests = requests.filter((r) => r.requesterEmail === currentUser?.email);
  const pageSize = 5;
  const paginatedMyRequests = myRequests.slice((page - 1) * pageSize, page * pageSize);

  const navPublic = [
    ["home", "Home"], ["requests", "Blood requests"], ["donors", "Find donors"], ["funding", "Funding"]
  ];
  const dashboardNav = [
    { title: "Workspace", items: [
      { id: "dashboard", label: "Overview", icon: LayoutDashboard },
      ...(isDonor ? [{ id: "my-requests", label: "My requests", icon: Droplet, count: myRequests.length }] : []),
      ...(isDonor ? [{ id: "create-request", label: "Create request", icon: Plus }] : []),
      ...((isAdmin || isVolunteer) ? [{ id: "all-requests", label: "All requests", icon: HeartHandshake, count: activeRequests.length }] : []),
      ...(isAdmin ? [{ id: "users", label: "User management", icon: Users }] : []),
      ...(isAdmin ? [{ id: "funding-admin", label: "Funding records", icon: Wallet }] : []),
    ]},
    { title: "Account", items: [{ id: "profile", label: "My profile", icon: User }] }
  ];

  const RequestCard = ({ item, compact = false }) => (
    <article className={`request-card ${compact ? "request-card-compact" : ""}`}>
      <div className="request-card-top">
        <span className="blood-chip">{item.bloodGroup}</span>
        <Status value={item.status} />
      </div>
      <h3>{item.recipientName}</h3>
      <p className="request-hospital"><Hospital size={15} />{item.hospitalName}</p>
      <div className="request-meta"><span><MapPin size={14} />{item.recipientUpazila}, {item.recipientDistrict}</span><span><CalendarDays size={14} />{dateLabel(item.donationDate)}</span></div>
      {!compact && <p className="request-message">{item.requestMessage}</p>}
      <div className="request-card-bottom">
        <span className="request-by">Requested by <b>{item.requesterName}</b></span>
        <button className="text-btn" onClick={() => setSelectedRequest(item)}>View details <ArrowRight size={15} /></button>
      </div>
    </article>
  );

  const RequestTable = ({ rows, adminMode = false }) => (
    <div className="table-wrap"><table><thead><tr><th>Recipient</th><th>Blood group</th><th>Location</th><th>Required date</th><th>Status</th><th>Action</th></tr></thead><tbody>
      {rows.map((r) => <tr key={r.id}><td><div className="table-person"><span className="table-avatar"><Droplet size={15} /></span><div><b>{r.recipientName}</b><small>{r.hospitalName}</small></div></div></td><td><span className="blood-chip blood-chip-sm">{r.bloodGroup}</span></td><td>{r.recipientDistrict}, {r.recipientUpazila}</td><td>{dateLabel(r.donationDate)}</td><td><Status value={r.status} /></td><td><div className="table-actions">
        <button className="icon-btn icon-btn-small" title="View details" onClick={() => setSelectedRequest(r)}><Search size={15} /></button>
        {adminMode && <select className="mini-select" value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)} aria-label="Update request status"><option value="pending">Pending</option><option value="inprogress">In progress</option><option value="done">Done</option><option value="canceled">Cancelled</option></select>}
        {!adminMode && currentUser?.email === r.requesterEmail && <><button className="icon-btn icon-btn-small" title="Edit" onClick={() => openCreateRequest(r)}><Edit3 size={15} /></button><button className="icon-btn icon-btn-small danger-icon" title="Delete" onClick={() => deleteRequest(r.id)}><Trash2 size={15} /></button></>}
      </div></td></tr>)}
      {!rows.length && <tr><td colSpan="6"><EmptyState title="No requests found" text="Try changing the filters or create a new request." action={isDonor ? "Create request" : null} onAction={() => openCreateRequest()} /></td></tr>}
    </tbody></table></div>
  );

  const PublicHeader = () => (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="brand-button" onClick={() => navigate("home")}><Brand /></button>
        <nav className={`public-nav ${mobileNav ? "public-nav-open" : ""}`}>
          {navPublic.map(([id, label]) => <button key={id} className={view === id ? "nav-link active" : "nav-link"} onClick={() => navigate(id)}>{label}</button>)}
        </nav>
        <div className="header-actions">
          {currentUser ? <button className="btn btn-primary btn-sm" onClick={() => navigate("dashboard")}><LayoutDashboard size={16} /> Dashboard</button> : <><button className="btn btn-ghost btn-sm login-btn" onClick={() => openAuth("signin")}>Log in</button><button className="btn btn-primary btn-sm" onClick={() => openAuth("signup")}>Become a donor <ArrowRight size={15} /></button></>}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">{mobileNav ? <X /> : <Menu />}</button>
      </div>
    </header>
  );

  const StatCard = ({ icon: Icon, label, value, trend, tone = "red", note }) => (
    <div className="stat-card"><span className={`stat-icon stat-${tone}`}><Icon size={19} /></span><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{trend && <em><ArrowUpRight size={12} />{trend}</em>} {note}</small></div></div>
  );

  const HomeView = () => (
    <>
      <section className="hero-section">
        <div className="hero-bg-orb orb-one" /><div className="hero-bg-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> THE GIFT THAT KEEPS SOMEONE ALIVE</div>
            <h1>Every drop brings <span>hope.</span></h1>
            <p className="hero-lead">A little kindness can make the biggest difference. Find blood donors, respond to urgent requests, and help families when every second matters.</p>
            <div className="hero-buttons"><button className="btn btn-primary btn-lg" onClick={() => navigate("requests")}>Find blood now <ArrowRight size={17} /></button><button className="btn btn-outline btn-lg" onClick={() => currentUser ? openCreateRequest() : openAuth("signup")}><Heart size={17} /> Become a donor</button></div>
            <div className="hero-trust"><div className="trust-avatars"><Avatar name="Ayesha" size="xs" /><Avatar name="Nafis" size="xs" /><Avatar name="Sadia" size="xs" /><span>+2k</span></div><div><b>People helping people</b><small>One community. Countless lives.</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <div className="hero-card-head"><span className="live-tag"><i /> LIVE REQUEST</span><span className="hero-card-time">Just now</span></div>
              <div className="hero-blood-row"><span className="hero-blood">O+</span><div><b>Urgent blood needed</b><small>For a patient at Popular Hospital</small></div></div>
              <div className="hero-card-line"><MapPin size={15} /> Dhanmondi, Dhaka <span>•</span> <CalendarDays size={15} /> 19 Nov</div>
              <div className="hero-card-progress"><span /><span /><span /></div>
              <div className="hero-card-footer"><span>Help someone today</span><button onClick={() => navigate("requests")}>Respond <ArrowRight size={14} /></button></div>
            </div>
            <div className="floating-stat floating-stat-top"><span className="floating-icon"><HeartHandshake size={18} /></span><div><b>2,450+</b><small>Lives supported</small></div><span className="floating-trend"><TrendingUp size={14} /></span></div>
            <div className="floating-stat floating-stat-bottom"><span className="floating-icon green"><UserCheck size={18} /></span><div><b>1,280+</b><small>Verified donors</small></div></div>
            <div className="hero-decoration"><div className="deco-ring ring-a" /><div className="deco-ring ring-b" /><div className="deco-drop"><Droplet size={65} fill="currentColor" /></div><span className="deco-spark spark-a">✦</span><span className="deco-spark spark-b">✧</span></div>
          </div>
        </div>
      </section>
      <section className="impact-strip"><div className="container impact-grid"><div><strong>2.4k<span>+</span></strong><small>Lives supported</small></div><div><strong>1.2k<span>+</span></strong><small>Active donors</small></div><div><strong>860<span>+</span></strong><small>Requests fulfilled</small></div><div><strong>64<span>+</span></strong><small>Districts reached</small></div></div></section>
      <section className="section-pad"><div className="container"><div className="section-heading"><div><span className="section-kicker">HOW VITAFLOW WORKS</span><h2>Small steps. <span>Big impact.</span></h2><p>Getting help or becoming someone's hero is easier than you think.</p></div><button className="text-btn desktop-only" onClick={() => navigate("requests")}>Explore requests <ArrowRight size={16} /></button></div><div className="steps-grid">
        <div className="step-card"><span className="step-number">01</span><div className="step-icon"><Search size={22} /></div><h3>Find a match</h3><p>Search blood requests or donors by blood group and location.</p></div>
        <div className="step-card"><span className="step-number">02</span><div className="step-icon"><HeartHandshake size={22} /></div><h3>Connect & respond</h3><p>Reach out to the requester and coordinate a safe donation.</p></div>
        <div className="step-card"><span className="step-number">03</span><div className="step-icon"><Sparkles size={22} /></div><h3>Make an impact</h3><p>Track the request and celebrate the difference you made.</p></div>
      </div></div></section>
      <section className="section-pad section-tint"><div className="container"><div className="section-heading"><div><span className="section-kicker">HELP NEEDED RIGHT NOW</span><h2>Urgent blood <span>requests.</span></h2><p>Every response brings a patient one step closer to care.</p></div><button className="btn btn-outline btn-sm" onClick={() => navigate("requests")}>View all requests <ArrowRight size={15} /></button></div><div className="request-grid">{publicRequests.slice(0, 3).map((r) => <RequestCard key={r.id} item={r} />)}</div></div></section>
      <section className="section-pad"><div className="container cta-panel"><div className="cta-icon"><Heart size={28} fill="currentColor" /></div><div><span className="section-kicker">BE SOMEONE'S REASON TO SMILE</span><h2>Your one decision can save a life.</h2><p>Join the VitaFlow community and be ready when someone needs you.</p></div><button className="btn btn-white btn-lg" onClick={() => currentUser ? navigate("dashboard") : openAuth("signup")}>Join our donor network <ArrowRight size={17} /></button><div className="cta-watermark"><Droplet size={160} /></div></div></section>
    </>
  );

  const RequestsView = () => (
    <div className="container page-container"><div className="page-heading"><div><span className="section-kicker">COMMUNITY NEEDS</span><h1>Blood donation requests</h1><p>Find a request near you and be the reason someone gets another chance.</p></div><button className="btn btn-primary" onClick={() => currentUser ? openCreateRequest() : openAuth("signup")}><Plus size={17} /> Create a request</button></div>
      <div className="filter-panel"><div className="search-field"><Search size={17} /><input value={requestSearch} onChange={(e) => setRequestSearch(e.target.value)} placeholder="Search hospital, recipient or location..." /></div><div className="filter-controls"><select value={requestFilter.bloodGroup} onChange={(e) => setRequestFilter({ ...requestFilter, bloodGroup: e.target.value })}><option>All groups</option>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select><select value={requestFilter.district} onChange={(e) => setRequestFilter({ ...requestFilter, district: e.target.value })}><option>All districts</option>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select><select value={requestFilter.status} onChange={(e) => setRequestFilter({ ...requestFilter, status: e.target.value })}><option>All status</option><option value="pending">Pending</option><option value="inprogress">In progress</option><option value="done">Completed</option></select></div></div>
      <div className="results-bar"><span><b>{filteredRequests.length}</b> requests found</span><span><SlidersHorizontal size={14} /> Updated just now</span></div>
      <div className="request-grid">{filteredRequests.map((r) => <RequestCard key={r.id} item={r} />)}</div>
      {!filteredRequests.length && <EmptyState title="No matching requests" text="Try another blood group or district." />}
    </div>
  );

  const DonorsView = () => (
    <div className="container page-container"><div className="page-heading"><div><span className="section-kicker">DONOR DIRECTORY</span><h1>Find a blood donor</h1><p>Search our community of generous donors by blood group and location.</p></div><div className="verified-note"><ShieldCheck size={18} /><span>Community donor network</span></div></div>
      <div className="donor-search-panel"><div className="donor-search-title"><div><h3>Find your match</h3><p>Choose a blood group and location to narrow your search.</p></div><span className="search-panel-icon"><Search size={20} /></span></div><div className="donor-filter-grid"><Field label="Blood group"><select value={donorFilter.bloodGroup} onChange={(e) => setDonorFilter({ ...donorFilter, bloodGroup: e.target.value })}><option>All groups</option>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></Field><Field label="District"><select value={donorFilter.district} onChange={(e) => setDonorFilter({ ...donorFilter, district: e.target.value })}><option>All districts</option>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></Field><Field label="Name or area"><input value={donorFilter.query} onChange={(e) => setDonorFilter({ ...donorFilter, query: e.target.value })} placeholder="e.g. Mirpur, Nafis" /></Field></div></div>
      <div className="results-bar"><span><b>{filteredDonors.length}</b> active donors found</span><span><UserCheck size={14} /> Active profiles only</span></div>
      <div className="donor-grid">{filteredDonors.map((u) => <div className="donor-card" key={u.id}><div className="donor-card-top"><Avatar name={u.name} size="lg" image={u.avatar} /><span className="online-dot" /></div><h3>{u.name}</h3><p><MapPin size={14} />{u.upazila}, {u.district}</p><div className="donor-card-bottom"><span className="blood-chip">{u.bloodGroup}</span><button className="btn btn-outline btn-sm" onClick={() => currentUser ? showNotice(`Demo contact: ${u.email}`) : openAuth("signin")}><MessageCircle size={14} /> Contact</button></div></div>)}</div>
      {!filteredDonors.length && <EmptyState title="No donors found" text="Try a different blood group or location." />}
    </div>
  );

  const FundingView = () => (
    <div className="container page-container funding-page"><div className="funding-hero"><div><span className="section-kicker">FUEL THE MISSION</span><h1>Give a little. <span>Save a lot.</span></h1><p>Your contribution helps us keep the network running, support outreach, and connect more people to life-saving blood donations.</p><div className="funding-trust"><ShieldCheck size={17} /> Secure contribution experience <span>•</span> Transparent records</div></div><div className="funding-visual"><div className="funding-heart"><Heart size={58} fill="currentColor" /></div><div className="funding-orbit orbit-1" /><div className="funding-orbit orbit-2" /><span className="funding-float float-1"><HeartHandshake size={18} /></span><span className="funding-float float-2"><Droplet size={18} /></span></div></div>
      <div className="funding-content-grid"><form className="panel funding-form" onSubmit={makePayment}><div className="panel-heading"><div><h2>Make a contribution</h2><p>Choose an amount that feels right for you.</p></div><span className="panel-icon"><Wallet size={19} /></span></div><div className="amount-grid">{["5", "10", "25", "50", "100"].map((v) => <button type="button" key={v} className={`amount-option ${fundAmount === v ? "selected" : ""}`} onClick={() => setFundAmount(v)}>{money(v)}</button>)}</div><button type="button" className={`custom-amount ${fundAmount === "custom" ? "selected" : ""}`} onClick={() => setFundAmount("custom")}>Enter a custom amount <ArrowRight size={15} /></button>{fundAmount === "custom" && <Field label="Custom amount (USD)"><input type="number" min="1" max="10000" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder="Enter amount" required /></Field>}<div className="demo-payment-note"><Zap size={16} /><span><b>Showcase demo:</b> payment is simulated locally. No real money is charged.</span></div><button className="btn btn-primary btn-block btn-lg" type="submit" disabled={paymentBusy}>{paymentBusy ? "Processing demo payment..." : <>Continue to contribution <ArrowRight size={17} /></>}</button></form>
      <div className="funding-side"><div className="funding-impact-card"><span className="section-kicker">COMMUNITY IMPACT</span><h2>{money(totalFunding)}</h2><p>Total contributions recorded in this demo.</p><div className="impact-progress"><span style={{ width: `${Math.min(100, (totalFunding / 500) * 100)}%` }} /></div><div className="impact-progress-label"><span>Community goal</span><b>$500</b></div></div><div className="panel recent-funding"><div className="panel-heading"><div><h3>Recent contributions</h3><p>People making a difference.</p></div><CircleDollarSign size={20} /></div>{fundings.slice(0, 4).map((f) => <div className="funding-row" key={f.id}><Avatar name={f.donorName} size="sm" /><div><b>{f.donorName}</b><small>{dateLabel(f.createdAt)}</small></div><strong>{money(f.amount)}</strong></div>)}</div></div></div>
    </div>
  );

  const DashboardView = () => {
    if (!currentUser) return <div className="container page-container"><EmptyState title="Sign in to continue" text="Your personalized workspace is available after signing in." action="Log in" onAction={() => openAuth("signin")} /></div>;
    const myTotal = myRequests.length;
    const myCompleted = myRequests.filter((r) => r.status === "done").length;
    const myPending = myRequests.filter((r) => r.status === "pending").length;
    const dashboardStats = isAdmin ? [
      { icon: Users, label: "Total users", value: users.length.toLocaleString(), trend: "+12.8%", tone: "red", note: "vs. last month" },
      { icon: Droplet, label: "Active requests", value: activeRequests.length, trend: "+8.2%", tone: "orange", note: "need attention" },
      { icon: HeartHandshake, label: "Completed requests", value: requests.filter((r) => r.status === "done").length, trend: "+16.4%", tone: "green", note: "successfully matched" },
      { icon: Wallet, label: "Total funding", value: money(totalFunding), trend: "+5.6%", tone: "blue", note: "demo contributions" }
    ] : isVolunteer ? [
      { icon: Droplet, label: "Open requests", value: activeRequests.length, tone: "red", note: "across the network" },
      { icon: Clock3, label: "Pending requests", value: requests.filter((r) => r.status === "pending").length, tone: "orange", note: "awaiting response" },
      { icon: CheckCircle2, label: "Completed", value: requests.filter((r) => r.status === "done").length, tone: "green", note: "successfully fulfilled" },
      { icon: Users, label: "Active donors", value: donors.length, tone: "blue", note: "in the community" }
    ] : [
      { icon: ClipboardIcon, label: "My requests", value: myTotal, tone: "red", note: "all time" },
      { icon: Clock3, label: "Awaiting help", value: myPending, tone: "orange", note: "pending requests" },
      { icon: CheckCircle2, label: "Completed", value: myCompleted, tone: "green", note: "fulfilled requests" },
      { icon: Heart, label: "Donor network", value: donors.length, tone: "blue", note: "active donors" }
    ];
    const recent = (isAdmin || isVolunteer ? requests : myRequests).slice(0, 5);
    const chartBars = [
      { label: "Mon", value: 42 }, { label: "Tue", value: 64 }, { label: "Wed", value: 48 },
      { label: "Thu", value: 78 }, { label: "Fri", value: 57 }, { label: "Sat", value: 88 }, { label: "Sun", value: 69 }
    ];
    return <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${mobileNav ? "sidebar-open" : ""}`}><div className="sidebar-brand"><button onClick={() => navigate("home")}><Brand /></button><button className="sidebar-close" onClick={() => setMobileNav(false)}><X size={18} /></button></div><div className="workspace-label">WORKSPACE</div>{dashboardNav.map((group) => <div className="sidebar-group" key={group.title}><span className="sidebar-group-title">{group.title}</span>{group.items.map((item) => <button key={item.id} className={`sidebar-link ${view === item.id ? "selected" : ""}`} onClick={() => item.id === "create-request" ? openCreateRequest() : navigate(item.id)}><item.icon size={18} /><span>{item.label}</span>{item.count > 0 && <small>{item.count}</small>}</button>)}</div>)}<div className="sidebar-bottom"><div className="help-card"><span><MessageCircle size={16} /></span><b>Need a hand?</b><small>Our community is here for you.</small><button onClick={() => showNotice("Support: support@vitaflow.com")}>Get support <ArrowRight size={13} /></button></div><button className="sidebar-link" onClick={signOut}><LogOut size={18} /><span>Sign out</span></button></div></aside>
      <div className="dashboard-main"><header className="dashboard-topbar"><button className="mobile-menu-btn dashboard-mobile-menu" onClick={() => setMobileNav(!mobileNav)}><Menu /></button><div className="breadcrumb">Workspace <ChevronRight size={14} /> <b>{view === "dashboard" ? "Overview" : view.replace("-", " ")}</b></div><div className="topbar-right"><span className="demo-mode-badge"><i /> DEMO MODE</span><button className="icon-btn notification-btn" onClick={() => showNotice("You're all caught up. No new notifications.")}><Bell size={18} /><i /></button><div className="topbar-user"><Avatar name={currentUser.name} size="sm" image={currentUser.avatar} /><div><b>{currentUser.name}</b><small>{currentUser.role}</small></div><ChevronDown size={14} /></div></div></header>
        <main className="dashboard-content">
          {view === "dashboard" && <><div className="dashboard-welcome"><div><span className="section-kicker">YOUR VITAFLOW SPACE</span><h1>Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {currentUser.name.split(" ")[0]} <span>👋</span></h1><p>Here's what's happening in your donation community today.</p></div>{isDonor && <button className="btn btn-primary" onClick={() => openCreateRequest()}><Plus size={17} /> New blood request</button>}</div><div className="stats-grid">{dashboardStats.map((s) => <StatCard key={s.label} {...s} />)}</div><div className="dashboard-grid-main"><div className="panel performance-panel"><div className="panel-heading"><div><h2>Community activity</h2><p>Donation request activity over the week</p></div><button className="period-select">This week <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i /> Request activity</span><small>Illustrative demo data</small></div><div className="bar-chart">{chartBars.map((b) => <div className="bar-column" key={b.label}><div className="bar-track"><span style={{ height: `${b.value}%` }} /></div><small>{b.label}</small></div>)}</div></div><div className="panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Get things done faster</p></div><Zap size={19} /></div><button className="quick-action" onClick={() => navigate("requests")}><span className="quick-action-icon red-bg"><Search size={17} /></span><span><b>Find blood requests</b><small>Browse open requests</small></span><ArrowRight size={16} /></button><button className="quick-action" onClick={() => navigate("donors")}><span className="quick-action-icon green-bg"><Users size={17} /></span><span><b>Find a donor</b><small>Search by blood group</small></span><ArrowRight size={16} /></button><button className="quick-action" onClick={() => navigate("funding")}><span className="quick-action-icon blue-bg"><Heart size={17} /></span><span><b>Support the mission</b><small>Make a contribution</small></span><ArrowRight size={16} /></button></div></div><div className="panel dashboard-table-panel"><div className="panel-heading"><div><h2>{isDonor ? "Your recent requests" : "Recent blood requests"}</h2><p>Keep track of the latest activity.</p></div><button className="text-btn" onClick={() => navigate(isDonor ? "my-requests" : "all-requests")}>View all <ArrowRight size={15} /></button></div><RequestTable rows={recent} adminMode={isAdmin || isVolunteer} /></div></>}
          {view === "my-requests" && <><div className="dashboard-welcome"><div><span className="section-kicker">YOUR ACTIVITY</span><h1>My blood requests</h1><p>Track and manage the requests you've created.</p></div><button className="btn btn-primary" onClick={() => openCreateRequest()}><Plus size={17} /> Create request</button></div><div className="stats-grid compact-stats"><StatCard icon={Droplet} label="Total requests" value={myTotal} tone="red" /><StatCard icon={Clock3} label="Pending" value={myPending} tone="orange" /><StatCard icon={CheckCircle2} label="Completed" value={myCompleted} tone="green" /></div><div className="panel dashboard-table-panel"><div className="panel-heading"><div><h2>All your requests</h2><p>Update or remove a request when needed.</p></div></div><RequestTable rows={paginatedMyRequests} /></div><div className="pagination"><span>Showing {myRequests.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, myRequests.length)} of {myRequests.length}</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /></button><button disabled={page * pageSize >= myRequests.length} onClick={() => setPage(page + 1)}><ChevronRight size={16} /></button></div></div></>}
          {view === "all-requests" && (isAdmin || isVolunteer) && <><div className="dashboard-welcome"><div><span className="section-kicker">REQUEST OPERATIONS</span><h1>All blood requests</h1><p>Review requests and keep their status up to date.</p></div></div><div className="filter-panel dashboard-filter"><div className="search-field"><Search size={17} /><input value={requestSearch} onChange={(e) => setRequestSearch(e.target.value)} placeholder="Search recipient or hospital..." /></div><div className="filter-controls"><select value={requestFilter.bloodGroup} onChange={(e) => setRequestFilter({ ...requestFilter, bloodGroup: e.target.value })}><option>All groups</option>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select><select value={requestFilter.status} onChange={(e) => setRequestFilter({ ...requestFilter, status: e.target.value })}><option>All status</option><option value="pending">Pending</option><option value="inprogress">In progress</option><option value="done">Completed</option><option value="canceled">Cancelled</option></select></div></div><div className="panel dashboard-table-panel"><RequestTable rows={filteredRequests} adminMode /></div></>}
          {view === "users" && isAdmin && <><div className="dashboard-welcome"><div><span className="section-kicker">ADMINISTRATION</span><h1>User management</h1><p>Manage community members, access and roles.</p></div><div className="admin-total"><b>{users.length}</b><small>registered users</small></div></div><div className="filter-panel dashboard-filter"><div className="search-field"><Search size={17} /><input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Search name, email or district..." /></div><div className="filter-controls"><select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)}><option>All roles</option><option>Admin</option><option>Donor</option><option>Volunteer</option></select></div></div><div className="panel dashboard-table-panel"><div className="table-wrap"><table><thead><tr><th>User</th><th>Blood group</th><th>Location</th><th>Role</th><th>Status</th><th>Manage</th></tr></thead><tbody>{filteredUsers.map((u) => <tr key={u.id}><td><div className="table-person"><Avatar name={u.name} size="sm" image={u.avatar} /><div><b>{u.name}</b><small>{u.email}</small></div></div></td><td><span className="blood-chip blood-chip-sm">{u.bloodGroup}</span></td><td>{u.district}, {u.upazila}</td><td><select className="mini-select" value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}><option>Donor</option><option>Volunteer</option><option>Admin</option></select></td><td><span className={`user-status ${u.status}`}>{u.status}</span></td><td><button className={`btn btn-xs ${u.status === "active" ? "btn-danger-soft" : "btn-success-soft"}`} onClick={() => toggleUserStatus(u.id)}>{u.status === "active" ? "Block" : "Unblock"}</button></td></tr>)}</tbody></table>{!filteredUsers.length && <EmptyState title="No users found" text="Try a different search." />}</div></div></>}
          {view === "funding-admin" && isAdmin && <><div className="dashboard-welcome"><div><span className="section-kicker">FINANCIAL OVERVIEW</span><h1>Funding records</h1><p>Review contributions recorded in the showcase demo.</p></div><div className="admin-total"><b>{money(totalFunding)}</b><small>total contributions</small></div></div><div className="panel dashboard-table-panel"><div className="table-wrap"><table><thead><tr><th>Contributor</th><th>Email</th><th>Amount</th><th>Transaction ID</th><th>Date</th><th>Status</th></tr></thead><tbody>{fundings.map((f) => <tr key={f.id}><td><b>{f.donorName}</b></td><td>{f.userEmail}</td><td><b>{money(f.amount)}</b></td><td><code>{f.transactionId}</code></td><td>{dateLabel(f.createdAt)}</td><td><span className="status-pill status-done"><i />Completed</span></td></tr>)}</tbody></table></div></div></>}
          {view === "profile" && <><div className="dashboard-welcome"><div><span className="section-kicker">YOUR ACCOUNT</span><h1>My profile</h1><p>Keep your information up to date so people can reach you.</p></div></div><div className="profile-layout"><div className="panel profile-card"><Avatar name={currentUser.name} size="2xl" image={currentUser.avatar} /><h2>{currentUser.name}</h2><p>{currentUser.email}</p><span className="role-pill">{currentUser.role}</span><label className="avatar-upload-btn">Change profile photo<input type="file" accept="image/*" onChange={handleAvatarUpload} /></label><div className="profile-detail"><span>Blood group</span><b>{currentUser.bloodGroup}</b></div><div className="profile-detail"><span>Location</span><b>{currentUser.upazila}, {currentUser.district}</b></div><div className="profile-detail"><span>Member since</span><b>{dateLabel(currentUser.createdAt)}</b></div></div><form className="panel profile-form" onSubmit={saveProfile}><div className="panel-heading"><div><h2>Personal information</h2><p>Update your donor profile details.</p></div><UserCog size={20} /></div><Field label="Full name"><input required value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} /></Field><Field label="Blood group"><select value={profileForm.bloodGroup} onChange={(e) => setProfileForm({ ...profileForm, bloodGroup: e.target.value })}>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></Field><div className="form-row"><Field label="District"><select value={profileForm.district} onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></Field><Field label="Upazila / Area"><input value={profileForm.upazila} onChange={(e) => setProfileForm({ ...profileForm, upazila: e.target.value })} placeholder="Your area" /></Field></div><button className="btn btn-primary" type="submit"><Check size={16} /> Save changes</button></form></div></>}
        </main>
      </div>
    </div>;
  };

  return (
    <div className="app-shell">
      {view === "dashboard" || ["my-requests", "all-requests", "users", "funding-admin", "profile"].includes(view) ? <DashboardView /> : <><PublicHeader />{view === "home" && <HomeView />}{view === "requests" && <RequestsView />}{view === "donors" && <DonorsView />}{view === "funding" && <FundingView />}<footer className="site-footer"><div className="container footer-top"><div><Brand /><p>Connecting people, creating hope, and making every drop count.</p></div><div className="footer-links"><div><b>Explore</b><button onClick={() => navigate("requests")}>Blood requests</button><button onClick={() => navigate("donors")}>Find donors</button><button onClick={() => navigate("funding")}>Funding</button></div><div><b>Account</b><button onClick={() => currentUser ? navigate("dashboard") : openAuth("signin")}>Dashboard</button><button onClick={() => openAuth("signup")}>Become a donor</button><button onClick={() => showNotice("Contact us at support@vitaflow.com")}>Contact support</button></div></div></div><div className="container footer-bottom"><span>© 2026 VitaFlow. Made with care for every life.</span><span><ShieldCheck size={14} /> Community-first donation network</span></div></footer></>}
      {authOpen && <Modal title={authMode === "signin" ? "Welcome back" : "Join the VitaFlow community"} subtitle={authMode === "signin" ? "Sign in to continue to your workspace." : "Create your donor account in just a moment."} onClose={() => setAuthOpen(false)}>
        <div className="auth-tabs"><button className={authMode === "signin" ? "active" : ""} onClick={() => setAuthMode("signin")}>Log in</button><button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Create account</button></div>
        <form className="modal-form" onSubmit={authMode === "signin" ? signIn : signUp}>
          {authMode === "signup" && <><Field label="Full name"><input required value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Your full name" /></Field><div className="form-row"><Field label="Blood group"><select value={authForm.bloodGroup} onChange={(e) => setAuthForm({ ...authForm, bloodGroup: e.target.value })}>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></Field><Field label="District"><select value={authForm.district} onChange={(e) => setAuthForm({ ...authForm, district: e.target.value })}>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></Field></div><Field label="Upazila / Area"><input value={authForm.upazila} onChange={(e) => setAuthForm({ ...authForm, upazila: e.target.value })} placeholder="Your area" /></Field></>}
          <Field label="Email address"><input type="email" required value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="you@example.com" /></Field>
          <Field label="Password"><input type="password" required minLength="6" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="At least 6 characters" /></Field>
          <button className="btn btn-primary btn-block btn-lg" type="submit">{authMode === "signin" ? "Sign in to VitaFlow" : "Create my account"} <ArrowRight size={16} /></button>
        </form>
        {authMode === "signin" && <div className="demo-login"><div className="demo-login-heading"><Sparkles size={15} /> Explore with a demo account</div><div className="demo-login-buttons"><button onClick={() => quickLogin("Admin")}><ShieldCheck size={14} /> Admin</button><button onClick={() => quickLogin("Donor")}><Droplet size={14} /> Donor</button><button onClick={() => quickLogin("Volunteer")}><HeartHandshake size={14} /> Volunteer</button></div><small>Password for all demo accounts: <b>demo1234</b></small></div>}
        <p className="auth-legal">By continuing, you agree to help build a safer and kinder donation community.</p>
      </Modal>}
      {requestModal && <Modal title={editingRequest ? "Edit blood request" : "Create a blood request"} subtitle="Share the details so nearby donors can respond." onClose={() => setRequestModal(false)} wide><form className="modal-form request-form" onSubmit={saveRequest}><div className="form-row"><Field label="Recipient name"><input required value={requestForm.recipientName} onChange={(e) => setRequestForm({ ...requestForm, recipientName: e.target.value })} placeholder="Patient's name" /></Field><Field label="Blood group"><select value={requestForm.bloodGroup} onChange={(e) => setRequestForm({ ...requestForm, bloodGroup: e.target.value })}>{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></Field></div><div className="form-row"><Field label="District"><select value={requestForm.recipientDistrict} onChange={(e) => setRequestForm({ ...requestForm, recipientDistrict: e.target.value })}>{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select></Field><Field label="Upazila / Area"><input required value={requestForm.recipientUpazila} onChange={(e) => setRequestForm({ ...requestForm, recipientUpazila: e.target.value })} placeholder="e.g. Dhanmondi" /></Field></div><Field label="Hospital name"><input required value={requestForm.hospitalName} onChange={(e) => setRequestForm({ ...requestForm, hospitalName: e.target.value })} placeholder="Hospital or clinic name" /></Field><Field label="Full address"><input required value={requestForm.fullAddress} onChange={(e) => setRequestForm({ ...requestForm, fullAddress: e.target.value })} placeholder="Street, area, city" /></Field><div className="form-row"><Field label="Required date"><input type="date" required min={new Date().toISOString().slice(0, 10)} value={requestForm.donationDate} onChange={(e) => setRequestForm({ ...requestForm, donationDate: e.target.value })} /></Field><Field label="Required time"><input type="time" required value={requestForm.donationTime} onChange={(e) => setRequestForm({ ...requestForm, donationTime: e.target.value })} /></Field></div><Field label="Additional message"><textarea rows="3" value={requestForm.requestMessage} onChange={(e) => setRequestForm({ ...requestForm, requestMessage: e.target.value })} placeholder="Tell donors anything important they should know." /></Field><div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setRequestModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">{editingRequest ? "Save changes" : "Publish request"} <ArrowRight size={15} /></button></div></form></Modal>}
      {selectedRequest && <Modal title="Blood request details" subtitle="Review the information before responding." onClose={() => setSelectedRequest(null)}><div className="detail-blood-head"><span className="detail-blood">{selectedRequest.bloodGroup}</span><div><h3>{selectedRequest.recipientName}</h3><Status value={selectedRequest.status} /></div></div><div className="detail-list"><div><Hospital size={16} /><span><small>Hospital</small><b>{selectedRequest.hospitalName}</b></span></div><div><MapPin size={16} /><span><small>Location</small><b>{selectedRequest.fullAddress}, {selectedRequest.recipientDistrict}</b></span></div><div><CalendarDays size={16} /><span><small>Required date & time</small><b>{dateLabel(selectedRequest.donationDate)} at {selectedRequest.donationTime}</b></span></div><div><User size={16} /><span><small>Requested by</small><b>{selectedRequest.requesterName}</b></span></div></div><div className="detail-message"><b>Message from requester</b><p>{selectedRequest.requestMessage || "No additional message provided."}</p></div>{selectedRequest.donorInfo && <div className="connected-donor"><CheckCircle2 size={17} /><span>Connected donor: <b>{selectedRequest.donorInfo.name}</b></span></div>}<div className="modal-actions">{currentUser?.email === selectedRequest.requesterEmail && <button className="btn btn-outline" onClick={() => { setSelectedRequest(null); openCreateRequest(selectedRequest); }}>Edit request</button>}{selectedRequest.status === "pending" && currentUser?.email !== selectedRequest.requesterEmail && <button className="btn btn-primary btn-block" onClick={() => donateToRequest(selectedRequest)}><HeartHandshake size={16} /> I can donate</button>}{selectedRequest.status !== "pending" && <button className="btn btn-ghost btn-block" onClick={() => setSelectedRequest(null)}>Close</button>}</div></Modal>}
      {notice && <div className={`toast toast-${notice.type}`}><span>{notice.type === "error" ? <X size={17} /> : <CheckCircle2 size={17} />}</span>{notice.message}<button onClick={() => setNotice(null)}><X size={15} /></button></div>}
      {!ready && <div className="loading-screen"><Brand /><span>Preparing your VitaFlow experience…</span></div>}
    </div>
  );
}

function ClipboardIcon(props) {
  return <Activity {...props} />;
}
