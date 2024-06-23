class SideNav extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="sidenav">
                <div class="web-name">
                    <h1>FarmFresh</h1>
                    <p>Store Side</p>
                </div>
                <div class="side-menu">
                    <a href="#/home"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="#/store"><i class="fas fa-store"></i> Store</a>
                    <a href="#/item"><i class="fas fa-list"></i> Item List</a>
                    <a href="#/history"><i class="fas fa-history"></i> Order History</a>
                    <a href="#/location"
                    ><i class="fas fa-map-marker-alt"></i> Location</a
                    >
                    <a href="#/review"><i class="fas fa-star"></i> Review</a>
                    <a href="#"><i class="fas fa-comments"></i> Chat</a>
                </div>
            </div>
        `;
  }
}

customElements.define("side-nav", SideNav);
