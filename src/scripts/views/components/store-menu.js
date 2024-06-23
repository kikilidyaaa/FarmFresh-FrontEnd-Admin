class StoreMenu extends HTMLElement {
  connectedCallback() {
    this.render();
    this.fetchProfile();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="container">
        <div class="header">
          <div class="profile-picture">
            <img class="profileImage" src="https://via.placeholder.com/100" alt="Profile Picture" />
          </div>
          <div class="profile-info">
            <h1 class="store-name">SayurBox</h1>
            <p class="store-email">sayurbox25@gmail.com</p>
          </div>
          <input type="file" id="profileImageInput" style="display: none;" />
          <button id="add-profil">Add Profil</button>
        </div>
        <div class="form">
          <div class="form-row">
            <div class="form-group">
              <label for="owner">Owner</label>
              <input type="text" id="owner" placeholder="Owner of the store" />
            </div>
            <div class="form-group">
              <label for="store-name">Store Name</label>
              <input type="text" id="store-name" placeholder="Store Name" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" placeholder="Your Address" />
            </div>
            <div class="form-group">
              <label for="country">Country</label>
              <input type="text" id="country" placeholder="Your Country" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="contact">Contact</label>
              <input type="text" id="contact" placeholder="Your Contact" />
            </div>
            <div class="form-group">
              <label for="timezone">Time Zone</label>
              <input type="text" id="timezone" placeholder="Your Time Zone" />
            </div>
          </div>
          <div class="buttons">
            <button id="save">Save</button>
            <button id="edit">Edit</button>
          </div>
        </div>
        <div class="email-section">
          <h2>My Email Address</h2>
          <div class="email form-group">
            <input id="store-email" type="text" placeholder="Your Email" style="width: 200px;" />
            <button id="add-email">+ Add Email Address</button>
          </div>
        </div>
      </div>
    `;
  }

  fetchProfile() {
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
          if (farm) {
            document.querySelector('.profileImage').src = farm.image || 'https://via.placeholder.com/100';
            document.querySelector('.store-name').textContent = farm.storeName || 'Store Name not available';
            document.querySelector('.store-email').textContent = farm.email || 'Email not available';
            document.querySelector('#store-email').value = farm.email || 'Email not available';
            document.querySelector('#owner').value = farm.owner || '';
            document.querySelector('#store-name').value = farm.storeName || '';
            document.querySelector('#address').value = farm.address || '';
            document.querySelector('#country').value = farm.country || '';
            document.querySelector('#contact').value = farm.contact || '';
            document.querySelector('#timezone').value = farm.timeZone || '';
          }
        })
        .catch(error => {
          alert('Kesalahan mengambil data profil:', error);
        });
    }
  }

  addEventListeners() {
    this.querySelector('#save').addEventListener('click', () => this.updateProfile());
    this.querySelector('#edit').addEventListener('click', () => this.updateProfile());
    this.querySelector('#add-profil').addEventListener('click', () => this.addProfileImage());
    this.querySelector('#profileImageInput').addEventListener('change', () => this.uploadProfileImage());
    this.querySelector('#add-email').addEventListener('click', () => this.updateEmail());
  }

  async uploadProfileImage() {
    const token = localStorage.getItem('accessToken');
    const idFarm = localStorage.getItem('idFarm');
    const imageInput = this.querySelector('#profileImageInput');
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('farmId', idFarm);
  
    try {
      const response = await fetch('https://farmfresh-backend.vercel.app/api/farmers/uploadImage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
      this.imageUrl = result.imageUrl;
      document.querySelector('.profileImage').src = this.imageUrl;
      alert('Gambar profil berhasil diperbaharui');
    } catch (error) {
      alert('Kesalahan memperbaharui gambar profil', error);
    }
  }

  async updateEmail() {
    const token = localStorage.getItem('accessToken');
    const idFarm = localStorage.getItem('idFarm');
    const newEmail = this.querySelector('#store-email').value;

    if (!token) {
      window.location.href = './login.html';
      return;
    }

    try {
      const response = await fetch(`https://farmfresh-backend.vercel.app/api/farmers/${idFarm}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const result = await response.json();
      const user = firebase.auth().currentUser;
      await user.updateEmail(newEmail);

      alert('Email berhasil diperbaharui');
    } catch (error) {
      alert('Kesalahan memperbaharui email:', error);
    }
  }

  updateProfile() {
    const token = localStorage.getItem('accessToken');
    const idFarm = localStorage.getItem('idFarm');

    if (!token) {
      window.location.href = './login.html';
      return;
    }

    const profileData = {
      storeName: this.querySelector('#store-name').value,
      owner: this.querySelector('#owner').value,
      address: this.querySelector('#address').value,
      country: this.querySelector('#country').value,
      contact: this.querySelector('#contact').value,
      timeZone: this.querySelector('#timezone').value,
      image: this.imageUrl,
    };

    fetch(`https://farmfresh-backend.vercel.app/api/farmers/${idFarm}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then(response => response.json())
      .then(data => {
        this.fetchProfile();
        alert('Profil berhasil diperbarui');
        window.location.reload();
      })
      .catch(error => {
        alert('Kesalahan memperbaharui profil:', error);
      });
  }

  addProfileImage() {
    this.querySelector('#profileImageInput').click();
  }
}

customElements.define('store-menu', StoreMenu);