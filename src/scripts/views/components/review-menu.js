class ReviewMenu extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
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
                            <img
                            src="https://via.placeholder.com/100"
                            alt="Avatar"
                            class="profile-review"
                            />
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
          `;
    }
  }
  
  customElements.define("review-menu", ReviewMenu);
  