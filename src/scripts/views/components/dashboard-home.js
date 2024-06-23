class DashboardHome extends HTMLElement {
  async connectedCallback() {
    this.render();
    this.fetchAndUpdateUserData();
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
            document.querySelector('.welcome-dashboard p').textContent = `Hi, ${farm.owner}. Welcome back to FarmFresh Admin!`;
          } else if (farm && farm.username) {
            document.querySelector('.profile-pic img').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.welcome-dashboard p').textContent = `Hi, ${farm.username}. Welcome back to FarmFresh Admin!`;
          } else {
            document.querySelector('.profile-pic img').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.welcome-dashboard p').textContent = 'Hi, Welcome back to FarmFresh Admin!';
          }
        })
        .catch(error => {
          alert('Kesalahan mengambil data profil:', error);
        });
    }
  }

  render() {
    this.innerHTML = `
      <div class="dashboard-content">
        <div class="second-dashboard">
          <!-- Bagian 1: welcome text -->
          <div class="welcome-dashboard">
            <h1>Dashboard</h1>
            <p>Hi, Esa. Welcome back to FarmFresh Admin!</p>
          </div>

          <!-- Bagian 2: tanggal section -->
          <div class="date-container">
            <div class="icon-container">
              <i class="far fa-calendar"></i>
            </div>
            <div class="text-container">
              <h3 id="currentDay"></h3>
              <p id="currentTime"></p>
            </div>
          </div>
        </div>

        <div class="dashboard-mainContent">
          <!-- Bagian 1: Total Items -->
          <div class="item-container">
            <div class="icons-container">
              <i class="fas fa-leaf"></i>
            </div>
            <div class="texts-container">
              <h2>0</h2>
              <h3>Total Items</h3>
            </div>
          </div>

          <!-- Bagian 2: Total Order -->
          <div class="item-container total-order">
            <div class="icons-container">
              <i class="fas fa-box"></i>
            </div>
            <div class="texts-container">
              <h2>0</h2>
              <h3>Total Orders</h3>
            </div>
          </div>

          <!-- Bagian 3: Total Revenue -->
          <div class="item-container total-revenue">
            <div class="icons-container">
              <i class="fas fa-comment-dollar"></i>
            </div>
            <div class="texts-container">
              <h2>0</h2>
              <h3>Total Revenue</h3>
            </div>
          </div>
        </div>

        <div class="dashboard-review">
          <!-- Bagian 1: Review Text -->
          <div class="review-text">
            <h1>Customer Review</h1>
            <p>Feedback for better result</p>
          </div>

          <!-- Bagian 2: Review Card -->
          <div class="review-container">
            <!-- profile -->
            <div class="profile-review-container">
              <div class="pic-container">
                <img src="https://via.placeholder.com/100" alt="Avatar" class="profile-review" />
              </div>
              <div class="name-container">
                <h3>Esa Faizal Gibran</h3>
                <p>2 days ago</p>
              </div>
            </div>

            <!-- Deskripsi -->
            <div class="description-container">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                corporis provident neque omnis quas ipsum deleniti. Incidunt,
                possimus consequuntur sit ut modi suscipit! Debitis omnis, officia
                illum ut eligendi libero!
              </p>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("dashboard-home", DashboardHome);
