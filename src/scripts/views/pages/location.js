import '../components/location-menu';

const Location = {
  async render() {
    return `
      <location-menu></location-menu>
    `;
  },

  async afterRender() {
    // Mendapatkan elemen form dan data
    const storeForm = document.getElementById('storeForm');
    const searchData = document.querySelector('.search-data');

    // Memproses submit form
    storeForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Mendapatkan nilai dari input
      const storeLocation = document.getElementById('storeLocation').value;
      const contactNumber = document.getElementById('contactNumber').value;

      // Mengambil tanggal dan waktu saat ini
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });

      // Simpan data ke local storage
      const searchDataObject = {
        storeLocation: storeLocation,
        contactNumber: contactNumber,
        savedAt: formattedDate
      };

      // Simpan ke local storage dengan key "searchData"
      localStorage.setItem('searchData', JSON.stringify(searchDataObject));

      // Hapus data lama dari tampilan
      searchData.innerHTML = '';

      // Tampilkan data terbaru di tengah halaman
      const newSearchResult = `
        <div class="search-result">
          <p><strong>Store Location:</strong> ${searchDataObject.storeLocation}</p>
          <p><strong>Contact Number:</strong> ${searchDataObject.contactNumber}</p>
          <p><strong>Saved At:</strong> ${searchDataObject.savedAt}</p>
        </div>
      `;
      searchData.insertAdjacentHTML('beforeend', newSearchResult);

      storeForm.reset();
    });

    // Fungsi untuk memuat data terakhir saat halaman dimuat
    if (localStorage.getItem('searchData')) {
      const searchDataObject = JSON.parse(localStorage.getItem('searchData'));

      // Tampilkan data terakhir di tengah halaman
      const newSearchResult = `
        <div class="search-result">
          <p><strong>Store Location:</strong> ${searchDataObject.storeLocation}</p>
          <p><strong>Contact Number:</strong> ${searchDataObject.contactNumber}</p>
          <p><strong>Saved At:</strong> ${searchDataObject.savedAt}</p>
        </div>
      `;
      searchData.insertAdjacentHTML('beforeend', newSearchResult);
    }
  },
};

export default Location;
