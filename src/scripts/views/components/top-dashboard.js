class TopDashboard extends HTMLElement {
  async connectedCallback() {
    this.render();
    await this.fetchAndUpdateUserData();
  }

  async fetchAndUpdateUserData() {
    const token = localStorage.getItem('accessToken');
    const idFarm = localStorage.getItem('idFarm');

    if (!token) {
      window.location.href = './login.html';
    } else {
      fetch(`https://farmfresh-backend.vercel.app/api/farmers/${idFarm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(farm => {
          if (farm && farm.owner) {
            document.querySelector('.profile-pic img').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.profile-pic p').textContent = `Hello, ${farm.owner}`;
          } else if (farm && farm.username) {
            document.querySelector('.profile-pic img').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.profile-pic p').textContent = `Hello, ${farm.username}`;
          } else {
            document.querySelector('.profile-pic img').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.profile-pic p').textContent = 'Hello!';
          }
        })
        .catch(error => {
          alert('Kesalahan mengambil data profil:', error);
        });
    }
  }

  render() {
    this.innerHTML = `
      <div class="top-dashboard">
        <!-- Bagian 1: menu -->
        <div class="item-menu">
          <ul>
            <li>
              <a href="#/store"><i class="fas fa-cog"></i></a>
            </li>
            <li>
              <a href="#" id="logout"><i class="fas fa-sign-out-alt"></i></a>
            </li>
          </ul>
        </div>

        <!-- Bagian 2: Profile Pic -->
        <div class="profile-pic">
          <p>Hello, Esa Faizal Gibran</p>
          <img src="https://via.placeholder.com/100" alt="Avatar" />
        </div>
      </div>
    `;
  }
}

customElements.define("top-dashboard", TopDashboard);
