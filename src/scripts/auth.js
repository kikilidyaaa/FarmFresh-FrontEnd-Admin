document.addEventListener("DOMContentLoaded", () => {
  // Handle Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        const response = await fetch('https://farmfresh-backend.vercel.app/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          alert('Login berhasil!');
          localStorage.setItem('accessToken', responseData.accessToken);
          localStorage.setItem('idFarm', responseData.idFarm);
          window.location.href = './index.html';
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Terjadi kesalahan, silakan coba lagi.');
      }
    });
  }

  // Function to toggle password visibility
  const togglePassword = () => {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }
  };

  // Event listener for Show/Hide password toggle
  const toggleIcon = document.querySelector('.toggle-password');
  if (toggleIcon) {
    toggleIcon.addEventListener('click', togglePassword);
  }
  
  // Handle Registration
  const registrasiForm = document.getElementById('registrasiForm');
  if (registrasiForm) {
    registrasiForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        const response = await fetch('https://farmfresh-backend.vercel.app/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Registrasi berhasil!');
          window.location.href = './login.html';
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Terjadi kesalahan, silakan coba lagi.');
      }
    });
  }

  // Handle Logout
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idFarm');
      window.location.href = './login.html';
    });
  }
});
