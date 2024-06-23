class LocationMenu extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="location-container">
                <div class="search-map-container">
                    <div class="search-form">
                        <form id="storeForm">
                        <label for="storeLocation">Store Location:</label>
                        <input
                            type="text"
                            id="storeLocation"
                            name="storeLocation"
                            required
                        />
            
                        <label for="contactNumber">Contact Number:</label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            required
                        />
            
                        <button type="submit">Save</button>
                        </form>
                    </div>
                    <div class="search-data"></div>

                </div>
        
                <div class="map-container">
                    <iframe
                        id="googleMap"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31684.132902468027!2d107.56507321083984!3d-6.948221999999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6279d52ed8b%3A0xfbc31838ba12ddbf!2sUniversitas%20Teknologi%20Bandung!5e0!3m2!1sen!2sid!4v1718451145339!5m2!1sen!2sid"
                        width="1300"
                        height="450"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
          `;
  }
}

customElements.define("location-menu", LocationMenu);
