// ============================================================
//  TOOLBOX — React App (CodePen JS panel)
//  CodePen JS Settings → Preprocessor: Babel
//  External JS (Settings > JS):
//    https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js
//    https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js
//  External CSS (Settings > CSS):
//    https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css
//  Created by Marjory D Marquez
//  GitHub: https://github.com/marjorydmarquez
// ============================================================

const { useState } = React;

// ── REAL UNSPLASH IMAGES ──────────────────────────────────
// All images from Unsplash (free, no auth needed)
const IMG = {
  // Hero
  hero: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=80",
  // Products
  drill: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&q=80",
  saw: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
  hammer: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=500&q=80",
  tape: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80",
  ladder: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  jigsaw: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80",
  compressor: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=500&q=80",
  wrench: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80",
  glasses: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
  level: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&q=80",
  multitool: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&q=80",
  gloves: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
  socketset: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80",
  laser: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80",
  mixer: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80",
  knife: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80",
  // Categories
  cat_power: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&q=70",
  cat_hand: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=300&q=70",
  cat_measure: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&q=70",
  cat_safety: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70",
  cat_plumb: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=70",
  cat_elec: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&q=70",
  cat_const: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=70",
  cat_air: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=300&q=70",
  // How-To thumbnails
  ht_frame: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=75",
  ht_plumb: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=75",
  ht_lighting: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=75",
  ht_concrete: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&q=75",
  ht_tile: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=75",
  ht_deck: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75",
  ht_saw: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=75",
  ht_drywall: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=75",
  ht_fan: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75",
  // Info / About
  about_hero: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=1200&q=80",
  store: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=75" };


// ── DATA ─────────────────────────────────────────────────
const PRODUCTS = [
{ id: 1, name: "20V MAX Drill Kit", brand: "DeWalt", price: 129.99, oldPrice: 159.99, rating: 4.8, reviews: 2140, img: IMG.drill, category: "Power Tools", badge: "SALE" },
{ id: 2, name: "18V Circular Saw", brand: "Ryobi", price: 89.99, oldPrice: null, rating: 4.5, reviews: 876, img: IMG.saw, category: "Power Tools", badge: "NEW" },
{ id: 3, name: "Framing Hammer 22oz", brand: "Estwing", price: 34.99, oldPrice: null, rating: 4.9, reviews: 3201, img: IMG.hammer, category: "Hand Tools", badge: null },
{ id: 4, name: "16ft Tape Measure", brand: "Stanley", price: 19.99, oldPrice: 24.99, rating: 4.7, reviews: 5402, img: IMG.tape, category: "Measuring", badge: "SALE" },
{ id: 5, name: "6-ft Fiberglass Ladder", brand: "Werner", price: 74.99, oldPrice: null, rating: 4.6, reviews: 1220, img: IMG.ladder, category: "Safety", badge: null },
{ id: 6, name: "Cordless Jigsaw", brand: "Bosch", price: 119.00, oldPrice: 140.00, rating: 4.7, reviews: 609, img: IMG.jigsaw, category: "Power Tools", badge: "SALE" },
{ id: 7, name: "Air Compressor 6-Gal", brand: "Craftsman", price: 149.99, oldPrice: null, rating: 4.5, reviews: 481, img: IMG.compressor, category: "Air Tools", badge: "NEW" },
{ id: 8, name: "Pipe Wrench 14-in", brand: "Ridgid", price: 44.99, oldPrice: null, rating: 4.8, reviews: 792, img: IMG.wrench, category: "Plumbing", badge: null },
{ id: 9, name: "Safety Glasses 3-Pack", brand: "3M", price: 12.99, oldPrice: null, rating: 4.6, reviews: 1800, img: IMG.glasses, category: "Safety", badge: null },
{ id: 10, name: "Digital Level 48-in", brand: "DeWalt", price: 64.99, oldPrice: 79.99, rating: 4.7, reviews: 341, img: IMG.level, category: "Measuring", badge: "SALE" },
{ id: 11, name: "Oscillating Multi-Tool", brand: "Milwaukee", price: 99.99, oldPrice: null, rating: 4.8, reviews: 527, img: IMG.multitool, category: "Power Tools", badge: "NEW" },
{ id: 12, name: "Heavy-Duty Work Gloves", brand: "Ironclad", price: 22.99, oldPrice: null, rating: 4.5, reviews: 1120, img: IMG.gloves, category: "Safety", badge: null },
{ id: 13, name: "120-Pc Socket Set", brand: "Craftsman", price: 59.99, oldPrice: 79.99, rating: 4.9, reviews: 4200, img: IMG.socketset, category: "Hand Tools", badge: "SALE" },
{ id: 14, name: "Laser Distance Measurer", brand: "Bosch", price: 54.99, oldPrice: 69.99, rating: 4.7, reviews: 695, img: IMG.laser, category: "Measuring", badge: "SALE" },
{ id: 15, name: "Concrete Mixer 1.5 Cu Ft", brand: "TomoCat", price: 229.99, oldPrice: null, rating: 4.4, reviews: 88, img: IMG.mixer, category: "Construction", badge: "NEW" },
{ id: 16, name: "Utility Knife 10-Pack", brand: "Stanley", price: 18.99, oldPrice: null, rating: 4.6, reviews: 2900, img: IMG.knife, category: "Hand Tools", badge: null }];


const HOWTOS = [
{ id: 1, title: "How to Frame a Wall", level: "beginner", dur: "22 min", steps: 8, img: IMG.ht_frame, desc: "Lay out, cut, and nail a stud wall from scratch." },
{ id: 2, title: "Fix a Leaky Pipe", level: "beginner", dur: "14 min", steps: 5, img: IMG.ht_plumb, desc: "Identify, gather parts, and seal a leak permanently." },
{ id: 3, title: "Install Recessed Lighting", level: "intermediate", dur: "35 min", steps: 12, img: IMG.ht_lighting, desc: "Wire and mount recessed cans in an existing ceiling." },
{ id: 4, title: "Pour a Concrete Slab", level: "advanced", dur: "1h 10m", steps: 15, img: IMG.ht_concrete, desc: "Formwork to finish — a pro-level concrete guide." },
{ id: 5, title: "Tile a Bathroom Floor", level: "intermediate", dur: "45 min", steps: 11, img: IMG.ht_tile, desc: "Layout, mortar, grout, and seal step by step." },
{ id: 6, title: "Build a Deck – Post & Beam", level: "advanced", dur: "2h 00m", steps: 20, img: IMG.ht_deck, desc: "Dig footings, set posts, and frame your deck." },
{ id: 7, title: "Use a Circular Saw Safely", level: "beginner", dur: "10 min", steps: 4, img: IMG.ht_saw, desc: "Blade guards, cutting technique, kickback prevention." },
{ id: 8, title: "Drywall Patching & Finishing", level: "intermediate", dur: "28 min", steps: 9, img: IMG.ht_drywall, desc: "Patch, tape, mud, and sand for an invisible repair." },
{ id: 9, title: "Install a Ceiling Fan", level: "intermediate", dur: "30 min", steps: 10, img: IMG.ht_fan, desc: "Wire and mount a ceiling fan from start to spin." }];


const CATEGORIES = [
{ name: "Power Tools", img: IMG.cat_power, icon: "fa-bolt" },
{ name: "Hand Tools", img: IMG.cat_hand, icon: "fa-screwdriver" },
{ name: "Measuring", img: IMG.cat_measure, icon: "fa-ruler" },
{ name: "Safety Gear", img: IMG.cat_safety, icon: "fa-helmet-safety" },
{ name: "Plumbing", img: IMG.cat_plumb, icon: "fa-droplet" },
{ name: "Electrical", img: IMG.cat_elec, icon: "fa-plug" },
{ name: "Construction", img: IMG.cat_const, icon: "fa-building" },
{ name: "Air Tools", img: IMG.cat_air, icon: "fa-wind" },
{ name: "Storage", img: null, icon: "fa-box" },
{ name: "Outdoor", img: null, icon: "fa-tree" }];


const SETTINGS_LINKS = [
{ key: "account", label: "Account", icon: "fa-user" },
{ key: "notif", label: "Notifications", icon: "fa-bell" },
{ key: "privacy", label: "Privacy", icon: "fa-shield-halved" },
{ key: "display", label: "Display", icon: "fa-display" },
{ key: "shipping", label: "Shipping", icon: "fa-truck" },
{ key: "payment", label: "Payment", icon: "fa-credit-card" },
{ key: "orders", label: "Order History", icon: "fa-receipt" },
{ key: "security", label: "Security", icon: "fa-lock" },
{ key: "language", label: "Language & Region", icon: "fa-globe" },
{ key: "help", label: "Help & Support", icon: "fa-circle-question" }];


// ── HELPERS ──────────────────────────────────────────────
const fmt = p => `$${p.toFixed(2)}`;
const pct = (o, n) => Math.round((1 - n / o) * 100);
const strs = n => "★".repeat(Math.floor(n)) + (n % 1 >= .5 ? "⯨" : "") + "☆".repeat(5 - Math.ceil(n));

// ── TOAST ────────────────────────────────────────────────
function Toasts({ list }) {
  return /*#__PURE__*/React.createElement("div", { className: "toast-wrap" }, list.map(t => /*#__PURE__*/React.createElement("div", { key: t.id, className: "toast" }, t.msg)));
}

// ── TOP BAR ──────────────────────────────────────────────
function TopBar() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "topbar" }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-map-marker-alt" }), " Deliver to ", /*#__PURE__*/React.createElement("strong", null, "ZIP 10001"), " \xB7 ", /*#__PURE__*/React.createElement("span", { style: { color: "#5FD98A" } }, "\u2714 In Stock: Same-Day Available")), /*#__PURE__*/
    React.createElement("div", { className: "topbar-right" }, /*#__PURE__*/
    React.createElement("a", { href: "#" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-tag" }), "Deals"), /*#__PURE__*/
    React.createElement("a", { href: "#" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-phone" }), "1-800-TOOLBOX"), /*#__PURE__*/
    React.createElement("a", { href: "#" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-store" }), "Find a Store"), /*#__PURE__*/
    React.createElement("a", { href: "#" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-circle-question" }), "Help"))));



}

// ── NAVBAR ───────────────────────────────────────────────
function Navbar({ setPage, cartCount, favCount }) {
  const [q, setQ] = useState("");
  return /*#__PURE__*/(
    React.createElement("nav", { className: "navbar" }, /*#__PURE__*/
    React.createElement("div", { className: "logo", onClick: () => setPage("home") }, /*#__PURE__*/React.createElement("div", { className: "logo-icon" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-toolbox" })), "ToolBox"), /*#__PURE__*/
    React.createElement("div", { className: "search-bar" }, /*#__PURE__*/
    React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Search tools, brands, part numbers\u2026", onKeyDown: e => e.key === "Enter" && setQ("") }), /*#__PURE__*/
    React.createElement("button", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-search" }))), /*#__PURE__*/

    React.createElement("div", { className: "nav-actions" }, /*#__PURE__*/
    React.createElement("button", { className: "nav-btn", onClick: () => setPage("favorites") }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-heart" }), /*#__PURE__*/React.createElement("span", null, "Saved"),
    favCount > 0 && /*#__PURE__*/React.createElement("span", { className: "nav-badge" }, favCount)), /*#__PURE__*/

    React.createElement("button", { className: "nav-btn", onClick: () => setPage("cart") }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-shopping-cart" }), /*#__PURE__*/React.createElement("span", null, "Cart"),
    cartCount > 0 && /*#__PURE__*/React.createElement("span", { className: "nav-badge" }, cartCount)), /*#__PURE__*/

    React.createElement("button", { className: "nav-btn", onClick: () => setPage("settings") }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-gear" }), /*#__PURE__*/React.createElement("span", null, "Settings")))));




}

// ── NAV TABS ─────────────────────────────────────────────
function NavTabs({ page, setPage }) {
  const tabs = [
  { key: "home", label: "Home" },
  { key: "shop", label: "Shop All" },
  { key: "howto", label: "How-To's" },
  { key: "info", label: "Information" },
  { key: "contact", label: "Contact" },
  { key: "favorites", label: "Saved / Favs" },
  { key: "cart", label: "Cart / Checkout" },
  { key: "settings", label: "Settings" }];

  return /*#__PURE__*/(
    React.createElement("div", { className: "navtabs" },
    tabs.map(t => /*#__PURE__*/React.createElement("button", { key: t.key, className: page === t.key ? "active" : "", onClick: () => setPage(t.key) }, t.label))));


}

// ── PRODUCT CARD ─────────────────────────────────────────
function ProductCard({ p, onCart, onFav, isFav }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "product-card" }, /*#__PURE__*/
    React.createElement("div", { className: "product-img" },
    p.badge && /*#__PURE__*/React.createElement("span", { className: `product-badge ${p.badge === "SALE" ? "sale" : "new"}` }, p.badge),
    p.img ? /*#__PURE__*/
    React.createElement("img", { src: p.img, alt: p.name, onError: e => {e.target.style.display = "none";e.target.nextSibling.style.display = "flex";} }) :
    null, /*#__PURE__*/
    React.createElement("div", { className: "product-img-fallback", style: { display: "none" } }, "\uD83D\uDD27"), /*#__PURE__*/
    React.createElement("div", { className: "card-actions-top" }, /*#__PURE__*/
    React.createElement("button", { className: `icon-btn ${isFav ? "active" : ""}`, title: "Save", onClick: () => onFav(p) }, /*#__PURE__*/
    React.createElement("i", { className: `fa${isFav ? "s" : "r"} fa-heart` })), /*#__PURE__*/

    React.createElement("button", { className: "icon-btn", title: "Compare" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-code-compare" })))), /*#__PURE__*/


    React.createElement("div", { className: "product-info" }, /*#__PURE__*/
    React.createElement("div", { className: "product-brand" }, p.brand), /*#__PURE__*/
    React.createElement("div", { className: "product-name" }, p.name), /*#__PURE__*/
    React.createElement("div", { className: "product-rating" }, /*#__PURE__*/
    React.createElement("span", { className: "stars" }, strs(p.rating)), /*#__PURE__*/
    React.createElement("span", { className: "rating-val" }, p.rating), /*#__PURE__*/
    React.createElement("span", { className: "rating-count" }, "(", p.reviews.toLocaleString(), ")")), /*#__PURE__*/

    React.createElement("div", { className: "product-price" }, /*#__PURE__*/
    React.createElement("span", { className: "price-main" }, fmt(p.price)),
    p.oldPrice && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", { className: "price-old" }, fmt(p.oldPrice)), /*#__PURE__*/React.createElement("span", { className: "price-save" }, "\u2013", pct(p.oldPrice, p.price), "%"))), /*#__PURE__*/

    React.createElement("button", { className: "add-cart-btn", onClick: () => onCart(p) }, /*#__PURE__*/React.createElement("i", { className: "fas fa-cart-plus" }), "Add to Cart"))));



}

// ── HOME ─────────────────────────────────────────────────
function HomePage({ onCart, onFav, favorites, setPage }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/


    React.createElement("div", { className: "hero" }, /*#__PURE__*/
    React.createElement("div", { className: "hero-bg" }), /*#__PURE__*/
    React.createElement("div", { className: "hero-overlay" }), /*#__PURE__*/
    React.createElement("div", { className: "hero-content" }, /*#__PURE__*/
    React.createElement("div", { className: "hero-tag" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-hard-hat" }), "America's Construction Store"), /*#__PURE__*/
    React.createElement("h1", null, "BUILD", /*#__PURE__*/React.createElement("br", null), "SMARTER.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "WORK HARDER.")), /*#__PURE__*/
    React.createElement("p", null, "Professional-grade tools, equipment, and supplies for contractors and weekend warriors alike."), /*#__PURE__*/
    React.createElement("div", { className: "hero-btns" }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary btn-lg", onClick: () => setPage("shop") }, /*#__PURE__*/React.createElement("i", { className: "fas fa-store" }), "Shop Now"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline btn-lg", onClick: () => setPage("howto") }, /*#__PURE__*/React.createElement("i", { className: "fas fa-play" }), "How-To Guides"))), /*#__PURE__*/


    React.createElement("div", { className: "hero-stats" },
    [["150K+", "Products"], ["240+", "Store Locations"], ["4.9★", "Customer Rating"], ["20yrs", "In Business"]].map(([n, l]) => /*#__PURE__*/
    React.createElement("div", { className: "hero-stat", key: l }, /*#__PURE__*/React.createElement("div", { className: "hero-stat-num" }, n), /*#__PURE__*/React.createElement("div", { className: "hero-stat-label" }, l))))), /*#__PURE__*/





    React.createElement("div", { className: "promo-strip" },
    [
    { icon: "fa-truck", title: "Free Delivery", sub: "On orders over $49" },
    { icon: "fa-rotate-left", title: "Easy Returns", sub: "30-day hassle-free" },
    { icon: "fa-shield-halved", title: "Price Match", sub: "We beat any price" },
    { icon: "fa-headset", title: "Pro Support", sub: "7 days, 8AM–8PM" }].
    map((c) => /*#__PURE__*/
    React.createElement("div", { className: "promo-card", key: c.title }, /*#__PURE__*/
    React.createElement("div", { className: "pc-icon" }, /*#__PURE__*/React.createElement("i", { className: `fas ${c.icon}` })), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("p", null, c.sub))))), /*#__PURE__*/





    React.createElement("h2", { className: "sec-title" }, "Shop by Category"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Browse our full selection of professional tools and supplies"), /*#__PURE__*/
    React.createElement("div", { className: "cat-grid" },
    CATEGORIES.map((c) => /*#__PURE__*/
    React.createElement("div", { className: "cat-card", key: c.name, onClick: () => setPage("shop") },
    c.img ? /*#__PURE__*/
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", { className: "cat-img" }, /*#__PURE__*/React.createElement("img", { src: c.img, alt: c.name })), /*#__PURE__*/React.createElement("div", { className: "cat-label" }, c.name)) : /*#__PURE__*/
    React.createElement("div", { className: "cat-icon-only" }, /*#__PURE__*/React.createElement("i", { className: `fas ${c.icon}` }), /*#__PURE__*/React.createElement("span", null, c.name))))), /*#__PURE__*/






    React.createElement("h2", { className: "sec-title" }, "Featured Products"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Top-rated picks trusted by pros nationwide"), /*#__PURE__*/
    React.createElement("div", { className: "product-grid" },
    PRODUCTS.slice(0, 8).map(p => /*#__PURE__*/React.createElement(ProductCard, { key: p.id, p: p, onCart: onCart, onFav: onFav, isFav: favorites.some(f => f.id === p.id) }))), /*#__PURE__*/



    React.createElement("div", { style: { marginTop: 48, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 } }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { style: { fontFamily: "var(--font-head)", fontSize: "1.8rem", color: "var(--white)", marginBottom: 6, letterSpacing: 1 } }, "Join ToolBox Pro Today"), /*#__PURE__*/
    React.createElement("p", { style: { color: "var(--text-muted)", fontSize: 14, maxWidth: 440 } }, "Contractors save an average of 18% annually. Get bulk pricing, priority support, and early access to new products.")), /*#__PURE__*/

    React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary btn-lg" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-hard-hat" }), "Join Pro"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-ghost btn-lg", onClick: () => setPage("info") }, /*#__PURE__*/React.createElement("i", { className: "fas fa-circle-info" }), "Learn More")))));




}

// ── SHOP ─────────────────────────────────────────────────
function ShopPage({ onCart, onFav, favorites }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const filters = ["All", "Power Tools", "Hand Tools", "Measuring", "Safety", "Plumbing", "Air Tools"];
  let list = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "All Products"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, list.length, " items in catalog"), /*#__PURE__*/
    React.createElement("div", { className: "product-controls" }, /*#__PURE__*/
    React.createElement("div", { className: "filter-tabs" },
    filters.map(f => /*#__PURE__*/React.createElement("button", { key: f, className: `filter-tab ${filter === f ? "active" : ""}`, onClick: () => setFilter(f) }, f))), /*#__PURE__*/

    React.createElement("select", { className: "sort-select", value: sort, onChange: e => setSort(e.target.value) }, /*#__PURE__*/
    React.createElement("option", { value: "featured" }, "Featured"), /*#__PURE__*/
    React.createElement("option", { value: "price-asc" }, "Price: Low \u2192 High"), /*#__PURE__*/
    React.createElement("option", { value: "price-desc" }, "Price: High \u2192 Low"), /*#__PURE__*/
    React.createElement("option", { value: "rating" }, "Top Rated"))), /*#__PURE__*/


    React.createElement("div", { className: "product-grid" },
    list.map(p => /*#__PURE__*/React.createElement(ProductCard, { key: p.id, p: p, onCart: onCart, onFav: onFav, isFav: favorites.some(f => f.id === p.id) })))));



}

// ── HOW-TO ───────────────────────────────────────────────
function HowToPage() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "How-To Guides"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Step-by-step tutorials from our licensed Pro team"), /*#__PURE__*/
    React.createElement("div", { className: "howto-grid" },
    HOWTOS.map((h) => /*#__PURE__*/
    React.createElement("div", { className: "howto-card", key: h.id }, /*#__PURE__*/
    React.createElement("div", { className: "howto-thumb" }, /*#__PURE__*/
    React.createElement("img", { src: h.img, alt: h.title, onError: e => e.target.style.opacity = ".3" }), /*#__PURE__*/
    React.createElement("div", { className: "howto-play" }, /*#__PURE__*/React.createElement("div", { className: "howto-play-btn" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-play" })))), /*#__PURE__*/

    React.createElement("div", { className: "howto-body" }, /*#__PURE__*/
    React.createElement("span", { className: `howto-level level-${h.level}` }, h.level), /*#__PURE__*/
    React.createElement("h3", null, h.title), /*#__PURE__*/
    React.createElement("p", null, h.desc), /*#__PURE__*/
    React.createElement("div", { className: "howto-meta" }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-clock" }), " ", h.dur), /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-list-check" }), " ", h.steps, " steps"))))))));







}

// ── INFO ─────────────────────────────────────────────────
function InfoPage() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/

    React.createElement("div", { className: "info-hero" }, /*#__PURE__*/
    React.createElement("img", { src: IMG.about_hero, alt: "Construction site" }), /*#__PURE__*/
    React.createElement("div", { className: "info-hero-overlay" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "About ", /*#__PURE__*/React.createElement("span", null, "ToolBox")), /*#__PURE__*/
    React.createElement("p", null, "Your trusted source for professional construction tools and equipment since 2005.")))), /*#__PURE__*/




    React.createElement("div", { className: "info-grid" },
    [
    { icon: "fa-medal", title: "20 Years of Excellence", text: "Serving contractors, builders, and DIY enthusiasts with premium tools at unbeatable prices." },
    { icon: "fa-warehouse", title: "150,000+ Products", text: "Every trade covered — from framing hammers to heavy excavation equipment." },
    { icon: "fa-star", title: "Certified Pro Staff", text: "Our team includes licensed tradespeople who guide you to exactly the right tool." },
    { icon: "fa-leaf", title: "Sustainable Sourcing", text: "We partner with brands committed to responsible manufacturing and reducing waste." },
    { icon: "fa-store", title: "240+ Store Locations", text: "Find a ToolBox near you or shop online with same-day delivery in most metros." },
    { icon: "fa-hand-holding-dollar", title: "Pro Loyalty Rewards", text: "Earn points on every purchase, get exclusive discounts, and unlock Pro-tier pricing." }].
    map((c) => /*#__PURE__*/
    React.createElement("div", { className: "info-card", key: c.title }, /*#__PURE__*/
    React.createElement("div", { className: "info-card-icon" }, /*#__PURE__*/React.createElement("i", { className: `fas ${c.icon}` })), /*#__PURE__*/
    React.createElement("h3", null, c.title), /*#__PURE__*/React.createElement("p", null, c.text)))), /*#__PURE__*/




    React.createElement("h2", { className: "sec-title" }, "Trusted Brands We Carry"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Only the best in the industry \u2014 no compromises"), /*#__PURE__*/
    React.createElement("div", { className: "brand-strip" },
    ["DeWalt", "Milwaukee", "Bosch", "Stanley", "Ryobi", "Makita", "Ridgid", "Craftsman", "Werner", "3M", "Estwing", "Ironclad", "Hilti", "Klein Tools"].map((b) => /*#__PURE__*/
    React.createElement("div", { className: "brand-pill", key: b }, b))), /*#__PURE__*/



    React.createElement("div", { style: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" } }, /*#__PURE__*/
    React.createElement("div", { style: { padding: "36px 40px" } }, /*#__PURE__*/
    React.createElement("h3", { style: { fontFamily: "var(--font-head)", fontSize: "1.8rem", color: "var(--white)", marginBottom: 12, letterSpacing: 1 } }, "Pro Membership"), /*#__PURE__*/
    React.createElement("p", { style: { color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 22 } }, "Join thousands of contractors who save an average of 18% annually. Get bulk pricing, dedicated account manager, and early access to new products."),
    [["fa-tag", "Bulk Pricing on every order"], ["fa-headset", "Dedicated account manager"], ["fa-bolt", "Early access to new releases"], ["fa-receipt", "Itemized invoices for tax filing"]].map(([ic, txt]) => /*#__PURE__*/
    React.createElement("div", { key: txt, style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } }, /*#__PURE__*/
    React.createElement("i", { className: `fas ${ic}`, style: { color: "var(--orange)", width: 16 } }), /*#__PURE__*/
    React.createElement("span", { style: { fontSize: 13, color: "var(--text-secondary)" } }, txt))), /*#__PURE__*/


    React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" } }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-hard-hat" }), "Join Pro"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-ghost" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-circle-info" }), "Learn More"))), /*#__PURE__*/


    React.createElement("div", { style: { overflow: "hidden", minHeight: 300 } }, /*#__PURE__*/
    React.createElement("img", { src: IMG.store, alt: "ToolBox store", style: { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.7)" } })))));




}

// ── CONTACT ──────────────────────────────────────────────
function ContactPage({ onToast }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: "general", message: "" });
  const [sent, setSent] = useState(false);
  function submit() {
    if (!f.name || !f.email || !f.message) {onToast("⚠️ Please fill in all required fields.");return;}
    setSent(true);onToast("✅ Message sent! We'll reply within 24 hours.");
  }
  if (sent) return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/React.createElement("div", { className: "empty-state" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-circle-check", style: { color: "var(--success)" } }), /*#__PURE__*/
    React.createElement("h3", null, "Message Sent!"), /*#__PURE__*/React.createElement("p", null, "Our team will reply within 24 hours."), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary", style: { marginTop: 22 }, onClick: () => setSent(false) }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-left" }), "Send Another"))));


  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "Contact Us"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Our Pro team is here Monday\u2013Saturday, 8AM\u20138PM EST"), /*#__PURE__*/
    React.createElement("div", { className: "contact-layout" }, /*#__PURE__*/
    React.createElement("div", null,
    [
    { icon: "fa-phone", title: "Call Us", text: "1-800-TOOLBOX (1-800-866-5269)\nMon–Sat 8AM–8PM EST" },
    { icon: "fa-envelope", title: "Email", text: "support@toolbox.com\norders@toolbox.com" },
    { icon: "fa-map-pin", title: "Headquarters", text: "1234 Builder Way\nAtlanta, GA 30301" },
    { icon: "fa-comment-dots", title: "Live Chat", text: "Available on our website\nAvg wait under 2 minutes" }].
    map((c) => /*#__PURE__*/
    React.createElement("div", { className: "contact-detail", key: c.title }, /*#__PURE__*/
    React.createElement("div", { className: "ci" }, /*#__PURE__*/React.createElement("i", { className: `fas ${c.icon}` })), /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("p", null, c.text)))), /*#__PURE__*/


    React.createElement("div", { style: { marginTop: 20 } }, /*#__PURE__*/
    React.createElement("h4", { style: { fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--text-primary)", marginBottom: 12 } }, "Follow Us"), /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", gap: 8 } },
    ["fa-facebook", "fa-instagram", "fa-youtube", "fa-x-twitter", "fa-linkedin"].map((ic) => /*#__PURE__*/
    React.createElement("a", { className: "social-btn", key: ic, href: "#" }, /*#__PURE__*/React.createElement("i", { className: `fab ${ic}` }))))), /*#__PURE__*/




    React.createElement("div", { style: { marginTop: 24, borderRadius: 8, overflow: "hidden", height: 180, border: "1px solid var(--border)" } }, /*#__PURE__*/
    React.createElement("img", { src: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=70", alt: "Map", style: { width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.6) saturate(.5)" } }))), /*#__PURE__*/


    React.createElement("div", { className: "contact-form" }, /*#__PURE__*/
    React.createElement("h3", null, "Send a Message"), /*#__PURE__*/
    React.createElement("div", { className: "form-row" }, /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Name *"), /*#__PURE__*/React.createElement("input", { value: f.name, onChange: e => setF({ ...f, name: e.target.value }), placeholder: "Jane Smith" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Email *"), /*#__PURE__*/React.createElement("input", { type: "email", value: f.email, onChange: e => setF({ ...f, email: e.target.value }), placeholder: "jane@email.com" }))), /*#__PURE__*/

    React.createElement("div", { className: "form-row" }, /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Phone"), /*#__PURE__*/React.createElement("input", { value: f.phone, onChange: e => setF({ ...f, phone: e.target.value }), placeholder: "(555) 000-0000" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Subject"), /*#__PURE__*/
    React.createElement("select", { value: f.subject, onChange: e => setF({ ...f, subject: e.target.value }) }, /*#__PURE__*/
    React.createElement("option", { value: "general" }, "General Inquiry"), /*#__PURE__*/
    React.createElement("option", { value: "order" }, "Order Issue"), /*#__PURE__*/
    React.createElement("option", { value: "return" }, "Return / Refund"), /*#__PURE__*/
    React.createElement("option", { value: "product" }, "Product Question"), /*#__PURE__*/
    React.createElement("option", { value: "pro" }, "Pro Account")))), /*#__PURE__*/



    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Message *"), /*#__PURE__*/React.createElement("textarea", { value: f.message, onChange: e => setF({ ...f, message: e.target.value }), placeholder: "How can we help you today?" })), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary", style: { width: "100%", justifyContent: "center" }, onClick: submit }, /*#__PURE__*/React.createElement("i", { className: "fas fa-paper-plane" }), "Send Message")))));




}

// ── CART ─────────────────────────────────────────────────
function CartPage({ cart, setCart, onToast, setPage }) {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = sub >= 49 ? 0 : 7.99;
  const tax = sub * 0.07;
  const total = sub + shipping + tax - discount;
  function qty(id, d) {setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));}
  function remove(id) {setCart(c => c.filter(i => i.id !== id));onToast("🗑️ Item removed");}
  function applyPromo() {
    if (promo.toUpperCase() === "TOOLBOX15") {setDiscount(sub * .15);onToast("🎉 15% discount applied!");} else
    if (promo.toUpperCase() === "SAVE10") {setDiscount(10);onToast("✅ $10 discount applied!");} else
    onToast("❌ Invalid promo code");
  }
  if (!cart.length) return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/React.createElement("div", { className: "empty-state" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-cart-shopping" }), /*#__PURE__*/
    React.createElement("h3", null, "Your cart is empty"), /*#__PURE__*/React.createElement("p", null, "Browse our catalog and add some tools."), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary", style: { marginTop: 22 }, onClick: () => setPage("shop") }, /*#__PURE__*/React.createElement("i", { className: "fas fa-store" }), "Start Shopping"))));


  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "Shopping Cart"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, cart.reduce((s, i) => s + i.qty, 0), " item(s) in your cart"), /*#__PURE__*/
    React.createElement("div", { className: "cart-layout" }, /*#__PURE__*/
    React.createElement("div", null,
    cart.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "cart-item", key: item.id }, /*#__PURE__*/
    React.createElement("div", { className: "cart-thumb" }, /*#__PURE__*/
    React.createElement("img", { src: item.img, alt: item.name, onError: e => e.target.style.opacity = ".2" })), /*#__PURE__*/

    React.createElement("div", { className: "cart-item-info" }, /*#__PURE__*/
    React.createElement("div", { className: "cart-item-brand" }, item.brand), /*#__PURE__*/
    React.createElement("div", { className: "cart-item-name" }, item.name), /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", marginTop: 10, flexWrap: "wrap" } }, /*#__PURE__*/
    React.createElement("div", { className: "qty-ctrl" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => qty(item.id, -1) }, "\u2212"), /*#__PURE__*/
    React.createElement("span", null, item.qty), /*#__PURE__*/
    React.createElement("button", { onClick: () => qty(item.id, 1) }, "+")), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-sm btn-ghost", style: { color: "var(--danger)", borderColor: "var(--danger)" }, onClick: () => remove(item.id) }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-trash-can" }), "Remove"))), /*#__PURE__*/



    React.createElement("div", { className: "cart-item-price" }, fmt(item.price * item.qty))))), /*#__PURE__*/



    React.createElement("div", { className: "order-summary" }, /*#__PURE__*/
    React.createElement("h3", null, "Order Summary"), /*#__PURE__*/
    React.createElement("div", { className: "summary-row" }, /*#__PURE__*/React.createElement("span", null, "Subtotal"), /*#__PURE__*/React.createElement("span", null, fmt(sub))),
    discount > 0 && /*#__PURE__*/React.createElement("div", { className: "summary-row summary-discount" }, /*#__PURE__*/React.createElement("span", null, "Discount"), /*#__PURE__*/React.createElement("span", null, "\u2212", fmt(discount))), /*#__PURE__*/
    React.createElement("div", { className: "summary-row" }, /*#__PURE__*/React.createElement("span", null, "Shipping"), /*#__PURE__*/React.createElement("span", null, shipping === 0 ? "FREE ✓" : fmt(shipping))), /*#__PURE__*/
    React.createElement("div", { className: "summary-row" }, /*#__PURE__*/React.createElement("span", null, "Tax (7%)"), /*#__PURE__*/React.createElement("span", null, fmt(tax))), /*#__PURE__*/
    React.createElement("div", { className: "summary-row total" }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, fmt(total))), /*#__PURE__*/
    React.createElement("div", { className: "promo-input" }, /*#__PURE__*/
    React.createElement("input", { placeholder: "Promo code\u2026", value: promo, onChange: e => setPromo(e.target.value) }), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-outline btn-sm", onClick: applyPromo }, "Apply")), /*#__PURE__*/

    React.createElement("p", { className: "promo-hint" }, "Try: ", /*#__PURE__*/React.createElement("strong", null, "TOOLBOX15"), " or ", /*#__PURE__*/React.createElement("strong", null, "SAVE10")), /*#__PURE__*/
    React.createElement("button", { className: "checkout-btn", onClick: () => setCheckout(true) }, "CHECKOUT ", /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-right" })), /*#__PURE__*/
    React.createElement("div", { className: "secure-note" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-lock" }), "Secure 256-bit SSL Checkout"))),


    checkout && /*#__PURE__*/React.createElement(CheckoutModal, { total: fmt(total), onClose: () => setCheckout(false), onConfirm: () => {setCart([]);setCheckout(false);onToast("🎉 Order placed! Confirmation sent.");} })));


}

// ── CHECKOUT MODAL ───────────────────────────────────────
function CheckoutModal({ total, onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "", exp: "", cvv: "" });
  const u = (k, v) => setInfo(i => ({ ...i, [k]: v }));
  return /*#__PURE__*/(
    React.createElement("div", { className: "modal-overlay", onClick: onClose }, /*#__PURE__*/
    React.createElement("div", { className: "modal", onClick: e => e.stopPropagation() }, /*#__PURE__*/
    React.createElement("button", { className: "modal-close", onClick: onClose }, /*#__PURE__*/React.createElement("i", { className: "fas fa-xmark" })),
    step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Shipping Info"), /*#__PURE__*/React.createElement("p", null, "Where should we send your order?"), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Full Name"), /*#__PURE__*/React.createElement("input", { value: info.name, onChange: e => u("name", e.target.value), placeholder: "Jane Doe" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", { value: info.email, onChange: e => u("email", e.target.value), placeholder: "jane@email.com" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Address"), /*#__PURE__*/React.createElement("input", { value: info.address, onChange: e => u("address", e.target.value), placeholder: "123 Main St" })), /*#__PURE__*/
    React.createElement("div", { className: "form-row" }, /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "City"), /*#__PURE__*/React.createElement("input", { value: info.city, onChange: e => u("city", e.target.value), placeholder: "Atlanta" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "ZIP"), /*#__PURE__*/React.createElement("input", { value: info.zip, onChange: e => u("zip", e.target.value), placeholder: "30301" }))), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-primary", style: { width: "100%", justifyContent: "center" }, onClick: () => setStep(2) }, "Next: Payment ", /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-right" }))),

    step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Payment"), /*#__PURE__*/React.createElement("p", null, "Order total: ", /*#__PURE__*/React.createElement("strong", { style: { color: "var(--orange)" } }, total)), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Card Number"), /*#__PURE__*/React.createElement("input", { value: info.card, onChange: e => u("card", e.target.value), placeholder: "4111 1111 1111 1111" })), /*#__PURE__*/
    React.createElement("div", { className: "form-row" }, /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Expiry"), /*#__PURE__*/React.createElement("input", { value: info.exp, onChange: e => u("exp", e.target.value), placeholder: "MM/YY" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "CVV"), /*#__PURE__*/React.createElement("input", { value: info.cvv, onChange: e => u("cvv", e.target.value), placeholder: "123" }))), /*#__PURE__*/

    React.createElement("div", { style: { display: "flex", gap: 10 } }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-ghost", onClick: () => setStep(1) }, /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-left" }), "Back"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-primary", style: { flex: 1, justifyContent: "center" }, onClick: onConfirm }, /*#__PURE__*/React.createElement("i", { className: "fas fa-check" }), "Place Order"))))));





}

// ── FAVORITES ────────────────────────────────────────────
function FavoritesPage({ favorites, setFavorites, onCart, onToast }) {
  function remove(id) {setFavorites(f => f.filter(p => p.id !== id));onToast("💔 Removed from favorites");}
  if (!favorites.length) return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/React.createElement("div", { className: "empty-state" }, /*#__PURE__*/
    React.createElement("i", { className: "fas fa-heart-crack" }), /*#__PURE__*/
    React.createElement("h3", null, "No saved items yet"), /*#__PURE__*/React.createElement("p", null, "Tap \u2665 on any product to save it here."))));


  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "Saved / Favorites"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, favorites.length, " saved item(s)"), /*#__PURE__*/
    React.createElement("div", { className: "product-grid" },
    favorites.map(p => /*#__PURE__*/React.createElement(ProductCard, { key: p.id, p: p, onCart: onCart, onFav: () => remove(p.id), isFav: true })))));



}

// ── SETTINGS ─────────────────────────────────────────────
function SettingsPage() {
  const [active, setActive] = useState("account");
  const [tog, setTog] = useState({
    emailDeals: true, smsAlerts: false, pushNotif: true, orderEmails: true,
    analytics: false, publicWish: true, darkMode: true, compactCards: false,
    twoFactor: false, loginAlerts: true, saveHistory: true });

  const T = (k) => /*#__PURE__*/
  React.createElement("div", { className: `toggle-switch ${tog[k] ? "on" : ""}`, onClick: () => setTog(t => ({ ...t, [k]: !t[k] })) }, /*#__PURE__*/
  React.createElement("div", { className: "toggle-knob" }));


  const panels = {
    account: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Account"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Update your personal details and preferences"), /*#__PURE__*/
    React.createElement("div", { className: "form-row", style: { marginBottom: 14 } }, /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "First Name"), /*#__PURE__*/React.createElement("input", { defaultValue: "Jane" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Last Name"), /*#__PURE__*/React.createElement("input", { defaultValue: "Smith" }))), /*#__PURE__*/

    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Email Address"), /*#__PURE__*/React.createElement("input", { type: "email", defaultValue: "jane.smith@email.com" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Phone Number"), /*#__PURE__*/React.createElement("input", { defaultValue: "(555) 123-4567" })), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Account Type"), /*#__PURE__*/
    React.createElement("select", { defaultValue: "pro" }, /*#__PURE__*/React.createElement("option", { value: "standard" }, "Standard"), /*#__PURE__*/React.createElement("option", { value: "pro" }, "Pro Contractor"))), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-primary btn-sm" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-save" }), "Save Changes")),

    notif: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Notifications"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Choose how and when ToolBox contacts you"),
    [{ k: "emailDeals", title: "Email Deals & Promotions", sub: "Weekly deals and flash sales" }, { k: "smsAlerts", title: "SMS Order Alerts", sub: "Text message shipping updates" }, { k: "pushNotif", title: "Push Notifications", sub: "Browser and app alerts" }, { k: "orderEmails", title: "Order Confirmation Emails", sub: "Receipts and tracking info" }].map((r) => /*#__PURE__*/
    React.createElement("div", { className: "toggle-row", key: r.k }, /*#__PURE__*/React.createElement("div", { className: "toggle-info" }, /*#__PURE__*/React.createElement("h4", null, r.title), /*#__PURE__*/React.createElement("p", null, r.sub)), T(r.k)))),


    privacy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Privacy"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Control your data and what others can see"),
    [{ k: "analytics", title: "Usage Analytics", sub: "Share anonymous data to improve ToolBox" }, { k: "publicWish", title: "Public Wish Lists", sub: "Allow others to view your saved items" }, { k: "saveHistory", title: "Save Browse History", sub: "Keep track of recently viewed products" }].map((r) => /*#__PURE__*/
    React.createElement("div", { className: "toggle-row", key: r.k }, /*#__PURE__*/React.createElement("div", { className: "toggle-info" }, /*#__PURE__*/React.createElement("h4", null, r.title), /*#__PURE__*/React.createElement("p", null, r.sub)), T(r.k)))),


    display: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Display"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Customize how ToolBox looks and feels"),
    [{ k: "darkMode", title: "Dark Mode", sub: "Use the dark industrial theme (recommended)" }, { k: "compactCards", title: "Compact Product Cards", sub: "Smaller tiles — more products on screen" }].map((r) => /*#__PURE__*/
    React.createElement("div", { className: "toggle-row", key: r.k }, /*#__PURE__*/React.createElement("div", { className: "toggle-info" }, /*#__PURE__*/React.createElement("h4", null, r.title), /*#__PURE__*/React.createElement("p", null, r.sub)), T(r.k)))),


    shipping: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Shipping"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Manage your saved delivery addresses"),
    ["Home – 1234 Oak Ave, Atlanta, GA 30301", "Work – 5678 Builder Blvd, Atlanta, GA 30302"].map((addr, i) => /*#__PURE__*/
    React.createElement("div", { className: "saved-row", key: i }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-location-dot" }), addr), /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", gap: 8 } }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-sm btn-ghost" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-pen" })), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-sm btn-ghost", style: { color: "var(--danger)", borderColor: "var(--danger)" } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-trash" }))))), /*#__PURE__*/



    React.createElement("button", { className: "btn btn-outline btn-sm", style: { marginTop: 12 } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-plus" }), "Add New Address")),

    payment: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Payment"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Saved cards and billing information"),
    [{ c: "•••• •••• •••• 4242", t: "Visa", e: "09/27" }, { c: "•••• •••• •••• 1234", t: "Mastercard", e: "12/26" }].map((card, i) => /*#__PURE__*/
    React.createElement("div", { className: "saved-row", key: i }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-credit-card" }), card.c, " \xB7 ", card.t, " \xB7 Exp ", card.e), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-sm btn-ghost", style: { color: "var(--danger)", borderColor: "var(--danger)" } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-trash" })))), /*#__PURE__*/


    React.createElement("button", { className: "btn btn-outline btn-sm", style: { marginTop: 12 } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-plus" }), "Add New Card")),

    orders: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Order History"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Review your past purchases and invoices"),
    [{ id: "#TB-10042", date: "Feb 18, 2026", total: "$214.97", status: "Delivered", items: "DeWalt Drill Kit, Stanley Tape" }, { id: "#TB-09881", date: "Jan 5, 2026", total: "$89.99", status: "Delivered", items: "Ryobi Circular Saw" }, { id: "#TB-09210", date: "Dec 12, 2025", total: "$44.99", status: "Delivered", items: "Ridgid Pipe Wrench" }].map((o) => /*#__PURE__*/
    React.createElement("div", { className: "saved-row", key: o.id, style: { flexDirection: "column", alignItems: "flex-start", gap: 6 } }, /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", width: "100%" } }, /*#__PURE__*/
    React.createElement("span", { style: { fontFamily: "var(--font-cond)", fontWeight: 700, color: "var(--orange)" } }, o.id), /*#__PURE__*/
    React.createElement("span", { style: { fontSize: 12, color: "var(--success)", fontWeight: 700 } }, o.status)), /*#__PURE__*/

    React.createElement("span", { style: { fontSize: 13, color: "var(--text-primary)" } }, o.items), /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)" } }, /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("i", { className: "fas fa-calendar", style: { color: "var(--orange)", marginRight: 5 } }), o.date), /*#__PURE__*/
    React.createElement("span", { style: { color: "var(--text-primary)", fontWeight: 600 } }, o.total)), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-sm btn-ghost", style: { marginTop: 4 } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-download" }), "Download Invoice")))),



    security: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Security"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Protect your account with stronger security"),
    [{ k: "twoFactor", title: "Two-Factor Authentication", sub: "Require a code on new device sign-ins" }, { k: "loginAlerts", title: "Login Alerts", sub: "Email me when a new sign-in is detected" }].map((r) => /*#__PURE__*/
    React.createElement("div", { className: "toggle-row", key: r.k }, /*#__PURE__*/React.createElement("div", { className: "toggle-info" }, /*#__PURE__*/React.createElement("h4", null, r.title), /*#__PURE__*/React.createElement("p", null, r.sub)), T(r.k))), /*#__PURE__*/

    React.createElement("div", { style: { marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" } }, /*#__PURE__*/
    React.createElement("button", { className: "btn btn-ghost btn-sm" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-key" }), "Change Password"), /*#__PURE__*/
    React.createElement("button", { className: "btn btn-ghost btn-sm" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-right-from-bracket" }), "Sign Out All Devices"))),


    language: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Language & Region"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Set your language, currency, and timezone"), /*#__PURE__*/
    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Language"), /*#__PURE__*/
    React.createElement("select", { defaultValue: "en" }, /*#__PURE__*/React.createElement("option", { value: "en" }, "English (US)"), /*#__PURE__*/React.createElement("option", { value: "es" }, "Espa\xF1ol"), /*#__PURE__*/React.createElement("option", { value: "fr" }, "Fran\xE7ais"), /*#__PURE__*/React.createElement("option", { value: "pt" }, "Portugu\xEAs"))), /*#__PURE__*/

    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Currency"), /*#__PURE__*/
    React.createElement("select", { defaultValue: "usd" }, /*#__PURE__*/React.createElement("option", { value: "usd" }, "USD \u2013 US Dollar"), /*#__PURE__*/React.createElement("option", { value: "eur" }, "EUR \u2013 Euro"), /*#__PURE__*/React.createElement("option", { value: "gbp" }, "GBP \u2013 British Pound"))), /*#__PURE__*/

    React.createElement("div", { className: "form-group" }, /*#__PURE__*/React.createElement("label", null, "Timezone"), /*#__PURE__*/
    React.createElement("select", { defaultValue: "est" }, /*#__PURE__*/React.createElement("option", { value: "est" }, "Eastern Time (ET)"), /*#__PURE__*/React.createElement("option", { value: "cst" }, "Central Time (CT)"), /*#__PURE__*/React.createElement("option", { value: "mst" }, "Mountain Time (MT)"), /*#__PURE__*/React.createElement("option", { value: "pst" }, "Pacific Time (PT)"))), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-primary btn-sm" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-save" }), "Save Preferences")),

    help: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("h2", null, "Help & Support"), /*#__PURE__*/React.createElement("p", { className: "sdesc" }, "Find answers or get in touch with our team"),
    [{ icon: "fa-book-open", title: "FAQ / Knowledge Base", sub: "Browse hundreds of answers", link: "Browse FAQs" }, { icon: "fa-comment-dots", title: "Live Chat", sub: "Talk to a Pro — avg wait 2 min", link: "Start Chat" }, { icon: "fa-phone", title: "Call 1-800-TOOLBOX", sub: "Mon–Sat 8AM–8PM EST", link: "View Hours" }, { icon: "fa-envelope", title: "Email Support", sub: "support@toolbox.com", link: "Send Email" }, { icon: "fa-rotate-left", title: "Returns & Refunds", sub: "Start a return or track a refund", link: "Start Return" }].map((item) => /*#__PURE__*/
    React.createElement("div", { className: "toggle-row", key: item.title }, /*#__PURE__*/
    React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, /*#__PURE__*/
    React.createElement("i", { className: `fas ${item.icon}`, style: { color: "var(--orange)", width: 18 } }), /*#__PURE__*/
    React.createElement("div", { className: "toggle-info" }, /*#__PURE__*/React.createElement("h4", null, item.title), /*#__PURE__*/React.createElement("p", null, item.sub))), /*#__PURE__*/

    React.createElement("button", { className: "btn btn-outline btn-sm" }, item.link, " ", /*#__PURE__*/React.createElement("i", { className: "fas fa-arrow-right" }))))) };




  return /*#__PURE__*/(
    React.createElement("div", { className: "page" }, /*#__PURE__*/
    React.createElement("h2", { className: "sec-title" }, "Settings"), /*#__PURE__*/
    React.createElement("p", { className: "sec-subtitle" }, "Manage your ToolBox account and preferences"), /*#__PURE__*/
    React.createElement("div", { className: "settings-layout" }, /*#__PURE__*/
    React.createElement("div", { className: "settings-sidebar" }, /*#__PURE__*/
    React.createElement("div", { className: "settings-sidebar-header" }, "Account Settings"),
    SETTINGS_LINKS.map((link) => /*#__PURE__*/
    React.createElement("button", { key: link.key, className: `settings-link ${active === link.key ? "active" : ""}`, onClick: () => setActive(link.key) }, /*#__PURE__*/
    React.createElement("i", { className: `fas ${link.icon}` }), link.label))), /*#__PURE__*/



    React.createElement("div", { className: "settings-panel" }, panels[active]))));



}

// ── FOOTER (IMPROVED) ────────────────────────────────────
function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  function sub() {if (email) {setEmail("");alert("✅ Subscribed! Welcome to ToolBox deals.");}}
  return /*#__PURE__*/(
    React.createElement("footer", { className: "footer" }, /*#__PURE__*/


    React.createElement("div", { className: "footer-top" }, /*#__PURE__*/
    React.createElement("div", { className: "footer-top-text" }, /*#__PURE__*/
    React.createElement("h3", null, "\uD83D\uDD28 Get Exclusive Deals & Pro Tips"), /*#__PURE__*/
    React.createElement("p", null, "Join 180,000+ contractors and DIYers. Unsubscribe anytime.")), /*#__PURE__*/

    React.createElement("div", { className: "newsletter-form" }, /*#__PURE__*/
    React.createElement("input", { value: email, onChange: e => setEmail(e.target.value), placeholder: "Enter your email address\u2026", onKeyDown: e => e.key === "Enter" && sub() }), /*#__PURE__*/
    React.createElement("button", { onClick: sub }, "Subscribe"))), /*#__PURE__*/




    React.createElement("div", { className: "footer-main" }, /*#__PURE__*/


    React.createElement("div", { className: "footer-brand" }, /*#__PURE__*/
    React.createElement("div", { className: "logo" }, /*#__PURE__*/React.createElement("div", { className: "logo-icon" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-toolbox" })), "ToolBox"), /*#__PURE__*/
    React.createElement("p", null, "America's trusted source for professional construction tools, equipment, and expert know-how since 2005. Over 150,000 products in stock, ready to ship."), /*#__PURE__*/
    React.createElement("div", { className: "footer-rating" }, /*#__PURE__*/
    React.createElement("span", { className: "stars" }, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/
    React.createElement("span", null, "4.9/5 from 48,000+ reviews")), /*#__PURE__*/

    React.createElement("div", { className: "footer-social" },
    [["fa-facebook", "#"], ["fa-instagram", "#"], ["fa-youtube", "#"], ["fa-x-twitter", "#"], ["fa-pinterest", "#"], ["fa-linkedin", "#"]].map(([ic, href]) => /*#__PURE__*/
    React.createElement("a", { className: "social-btn", key: ic, href: href }, /*#__PURE__*/React.createElement("i", { className: `fab ${ic}` }))))), /*#__PURE__*/





    React.createElement("div", { className: "footer-col" }, /*#__PURE__*/
    React.createElement("h4", null, "Shop"), /*#__PURE__*/
    React.createElement("ul", null,
    ["Power Tools", "Hand Tools", "Measuring Tools", "Safety Equipment", "Plumbing Supplies", "Electrical", "Air & Pneumatic", "Construction", "Storage & Organizers", "Outdoor & Yard"].map((l) => /*#__PURE__*/
    React.createElement("li", { key: l }, /*#__PURE__*/React.createElement("a", { href: "#", onClick: e => {e.preventDefault();setPage("shop");} }, l, /*#__PURE__*/React.createElement("i", { className: "fas fa-chevron-right" })))))), /*#__PURE__*/





    React.createElement("div", { className: "footer-col" }, /*#__PURE__*/
    React.createElement("h4", null, "Learn"), /*#__PURE__*/
    React.createElement("ul", null,
    ["How-To Video Guides", "Step-by-Step Tutorials", "Project Calculators", "Tool Buying Guides", "Pro Tips Blog", "Safety Guidelines", "Brand Directory", "Tool Comparison"].map((l) => /*#__PURE__*/
    React.createElement("li", { key: l }, /*#__PURE__*/React.createElement("a", { href: "#", onClick: e => {e.preventDefault();setPage("howto");} }, l, /*#__PURE__*/React.createElement("i", { className: "fas fa-chevron-right" }))))), /*#__PURE__*/


    React.createElement("div", { style: { marginTop: 16 } }, /*#__PURE__*/
    React.createElement("div", { className: "footer-badge" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-award" }), /*#__PURE__*/React.createElement("span", null, "Best DIY Resource 2025")))), /*#__PURE__*/




    React.createElement("div", { className: "footer-col" }, /*#__PURE__*/
    React.createElement("h4", null, "Support"), /*#__PURE__*/
    React.createElement("ul", null,
    ["Contact Us", "Track My Order", "Returns & Refunds", "FAQs", "Find a Store", "Pro Accounts", "Gift Cards", "Accessibility", "Sitemap"].map((l) => /*#__PURE__*/
    React.createElement("li", { key: l }, /*#__PURE__*/React.createElement("a", { href: "#", onClick: e => {e.preventDefault();setPage("contact");} }, l, /*#__PURE__*/React.createElement("i", { className: "fas fa-chevron-right" }))))), /*#__PURE__*/


    React.createElement("div", { style: { marginTop: 16 } }, /*#__PURE__*/
    React.createElement("div", { className: "footer-badge" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-phone" }), /*#__PURE__*/React.createElement("span", null, "1-800-TOOLBOX")), /*#__PURE__*/
    React.createElement("div", { className: "footer-badge", style: { marginTop: 8 } }, /*#__PURE__*/React.createElement("i", { className: "fas fa-clock" }), /*#__PURE__*/React.createElement("span", null, "Mon\u2013Sat 8AM\u20138PM EST"))))), /*#__PURE__*/




    React.createElement("hr", { className: "footer-divider" }), /*#__PURE__*/


    React.createElement("div", { className: "footer-bottom" }, /*#__PURE__*/
    React.createElement("div", { className: "footer-bottom-left" }, /*#__PURE__*/
    React.createElement("p", null, "\xA9 2025 ToolBox Inc. All rights reserved. \xA0", /*#__PURE__*/
    React.createElement("a", { href: "#" }, "Privacy Policy"), " \xA0\xB7\xA0", /*#__PURE__*/
    React.createElement("a", { href: "#" }, "Terms of Service"), " \xA0\xB7\xA0", /*#__PURE__*/
    React.createElement("a", { href: "#" }, "Accessibility"), " \xA0\xB7\xA0", /*#__PURE__*/
    React.createElement("a", { href: "#" }, "Do Not Sell My Info")), /*#__PURE__*/

    React.createElement("p", { style: { marginTop: 5, color: "var(--text-secondary)" } }, "ToolBox Inc., 1234 Builder Way, Atlanta, GA 30301. Prices and availability subject to change.")), /*#__PURE__*/

    React.createElement("div", { className: "footer-bottom-right" }, /*#__PURE__*/
    React.createElement("p", { className: "made-by" }, "Designed & built by ", /*#__PURE__*/
    React.createElement("strong", null, "Marjory D Marquez"), " \xA0\xB7\xA0", /*#__PURE__*/
    React.createElement("a", { href: "https://github.com/marjorydmarquez", target: "_blank", rel: "noopener noreferrer" }, /*#__PURE__*/
    React.createElement("i", { className: "fab fa-github" }), "GitHub Profile")), /*#__PURE__*/


    React.createElement("div", { className: "payment-icons" }, /*#__PURE__*/
    React.createElement("span", { style: { fontSize: 11, color: "var(--text-secondary)", marginRight: 4 } }, "We accept:"), /*#__PURE__*/
    React.createElement("i", { className: "fab fa-cc-visa", title: "Visa" }), /*#__PURE__*/
    React.createElement("i", { className: "fab fa-cc-mastercard", title: "Mastercard" }), /*#__PURE__*/
    React.createElement("i", { className: "fab fa-cc-amex", title: "Amex" }), /*#__PURE__*/
    React.createElement("i", { className: "fab fa-cc-paypal", title: "PayPal" }), /*#__PURE__*/
    React.createElement("i", { className: "fab fa-apple-pay", title: "Apple Pay" }))))));





}

// ── APP ──────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toasts, setToasts] = useState([]);

  function toast(msg) {
    const id = Date.now();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }
  function addCart(p) {
    setCart(c => {
      const ex = c.find(i => i.id === p.id);
      return ex ? c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...c, { ...p, qty: 1 }];
    });
    toast(`🛒 ${p.name} added to cart!`);
  }
  function toggleFav(p) {
    const has = favorites.some(f => f.id === p.id);
    setFavorites(f => has ? f.filter(x => x.id !== p.id) : [...f, p]);
    toast(has ? "💔 Removed from favorites" : `❤️ ${p.name} saved!`);
  }

  const pages = {
    home: /*#__PURE__*/React.createElement(HomePage, { onCart: addCart, onFav: toggleFav, favorites: favorites, setPage: setPage }),
    shop: /*#__PURE__*/React.createElement(ShopPage, { onCart: addCart, onFav: toggleFav, favorites: favorites }),
    howto: /*#__PURE__*/React.createElement(HowToPage, null),
    info: /*#__PURE__*/React.createElement(InfoPage, null),
    contact: /*#__PURE__*/React.createElement(ContactPage, { onToast: toast }),
    cart: /*#__PURE__*/React.createElement(CartPage, { cart: cart, setCart: setCart, onToast: toast, setPage: setPage }),
    favorites: /*#__PURE__*/React.createElement(FavoritesPage, { favorites: favorites, setFavorites: setFavorites, onCart: addCart, onToast: toast }),
    settings: /*#__PURE__*/React.createElement(SettingsPage, null) };


  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement(TopBar, null), /*#__PURE__*/
    React.createElement(Navbar, { setPage: setPage, cartCount: cart.reduce((s, i) => s + i.qty, 0), favCount: favorites.length }), /*#__PURE__*/
    React.createElement(NavTabs, { page: page, setPage: setPage }),
    pages[page] || pages.home, /*#__PURE__*/
    React.createElement(Footer, { setPage: setPage }), /*#__PURE__*/
    React.createElement(Toasts, { list: toasts })));


}

ReactDOM.createRoot(document.getElementById("root")).render( /*#__PURE__*/React.createElement(App, null));