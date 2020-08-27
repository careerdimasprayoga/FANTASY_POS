<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidemenu -->
    <div class="sidemenu-box" id="sidemenu-wrapper">
      <b-row
        class="sidemenu-header-box text-center align-items-center"
        style="border-bottom: #cecece 1px solid;"
      >
        <b-col xl="12">
          <a href class="modify-link-text">Menu</a>
        </b-col>
      </b-row>
      <b-row class="sidemenu-header-box text-center align-items-center">
        <b-col xl="12">
          <a href class="modify-link-text">
            <img src="../assets/images/icons/fork.png" style="width: 40px; height: 40px;" />
          </a>
        </b-col>
      </b-row>
      <b-row class="sidemenu-header-box text-center align-items-center">
        <b-col xl="12">
          <a href class="modify-link-text">
            <img src="../assets/images/icons/clipboard.png" style="width: 40px; height: 40px;" />
          </a>
        </b-col>
      </b-row>
      <b-row class="sidemenu-header-box text-center align-items-center">
        <b-col xl="12">
          <b-button v-b-modal.modal-lg style="background-color: transparent; border: none;">
            <img src="../assets/images/icons/add.png" style="width: 40px; height: 40px;" />
          </b-button>
        </b-col>
      </b-row>
    </div>
    <!-- End sidemenu -->
    <!-- Modal -->
    <b-modal id="modal-lg" size="lg" :title="this.modalTitle">
      <b-alert :show="varAlert">{{this.varAlertMessage}} Product Success</b-alert>
      <b-form v-on:submit.prevent="addProduct">
        <!-- .prevent mengatasi reload -->
        <b-form-group id="input-group-1" label="Product Name" label-for="input-1">
          <b-form-input
            v-model="form.name"
            id="input-1"
            type="text"
            required
            placeholder="Product Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image" label-for="input-2">
          <b-form-input v-model="form.image" id="input-2" required placeholder="Image"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Category" label-for="input-3">
          <b-form-select v-model="form.id_category" id="input-3" :options="selectOptionCategory"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Status" label-for="input-3">
          <b-form-select v-model="form.status" id="input-3" :options="selectOptionStatus"></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="Price" label-for="input-4">
          <b-form-input v-model="form.price" id="input-4" placeholder="Price"></b-form-input>
        </b-form-group>

        <b-button type="submit" v-if="buttonModalSave" variant="primary">Save</b-button>
        <b-button type="button" v-else variant="info" @click="editProduct()">Edit</b-button>
      </b-form>
    </b-modal>
    <!-- End Modal -->

    <div id="page-content-wrapper">
      <b-container fluid>
        <!-- Header -->
        <b-row style="margin-left:0px;">
          <b-col xl="8" md="7" sm="7" xs="12" class="navbarOne">
            <b-container>
              <b-row>
                <b-col xl="1" lg="2" md="2" sm="2" class="col-2" style="margin-top: 15px;">
                  <button class="btn-custom" id="menu-toggle">
                    <img src="../assets/images/icons/menu.png" style="width: 30px; height: 30px" />
                  </button>
                </b-col>
                <b-col
                  xl="10"
                  lg="8"
                  md="8"
                  sm="8"
                  class="col-8 text-center"
                  style="margin-top: 5px;"
                >
                  <p style="font-size: 30px">Food Items</p>
                </b-col>
                <b-col xl="1" lg="2" md="2" sm="2" xs="1" class="col-2" style="margin-top: 15px;">
                  <button class="btn-custom">
                    <img src="../assets/images/icons/find.png" style="width: 30px; height: 30px" />
                  </button>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col xl="4" md="5" sm="5" class="navbarTwo text-center">
            <div class="d-flex justify-content-center">
              <p style="font-size: 30px; margin-top: 5px">Cart</p>
              <div
                style="width: 30px; height: 30px; background-color: #57CAD5; border-radius: 50px; margin-top: 15px; margin-left:5px;"
              >
                <p style="font-size: 25px; margin-top: -5px;color:white;">{{this.cart.length}}</p>
              </div>
            </div>
          </b-col>
        </b-row>

        <!-- End Header -->
        <!-- Content -->
        <b-row style="margin-left:0px;">
          <b-col xl="12" md="12" sm="12" class="background-content">
            <!-- Food Items -->
            <b-row>
              <b-col
                xl="8"
                md="7"
                sm="7"
                style="padding-right: 30px;padding-left: 30px;padding-top: 20px;"
              >
                <b-container fluid>
                  <b-row>
                    <b-col xl="12" style="margin-bottom: 15px;">
                      <b-form inline class="float-right" v-on:submit.prevent="search_product">
                        <b-input
                          id="inline-form-input-name"
                          class="mb-2 mr-sm-2 mb-sm-0"
                          placeholder="Search Product"
                          v-model="search"
                        ></b-input>

                        <!-- <b-dropdown
                          id="sort"
                          :text="sortText"
                          class="m-2 sort-btn"
                          variant="primary"
                        >
                          <b-dropdown-item-button @click="sortCategory()" active>Category</b-dropdown-item-button>
                          <b-dropdown-divider></b-dropdown-divider>
                          <b-dropdown-group id="dropdown-group-1" header="Name">
                            <b-dropdown-item-button @click="sortNameAsc()">A-Z</b-dropdown-item-button>
                            <b-dropdown-item-button @click="sortNameDesc()">Z-A</b-dropdown-item-button>
                          </b-dropdown-group>
                          <b-dropdown-divider></b-dropdown-divider>
                          <b-dropdown-group id="dropdown-group-2" header="Date">
                            <b-dropdown-item-button @click="sortDateAsc()">Oldest</b-dropdown-item-button>
                            <b-dropdown-item-button @click="sortDateDesc()">Newest</b-dropdown-item-button>
                          </b-dropdown-group>
                          <b-dropdown-divider></b-dropdown-divider>
                          <b-dropdown-group id="dropdown-group-3" header="Price">
                            <b-dropdown-item-button @click="sortPriceAsc()">Lowest</b-dropdown-item-button>
                            <b-dropdown-item-button @click="sortPriceDesc()">Highest</b-dropdown-item-button>
                          </b-dropdown-group>
                        </b-dropdown>-->
                        <b-button type="submit" variant="primary">Find</b-button>
                      </b-form>
                    </b-col>

                    <b-col xl="4" lg="6" md="12" v-for="(item, index) in products" :key="index">
                      <b-card
                        v-bind:img-src="require(`../assets/images/products/${item.image}`)"
                        img-alt="Image"
                        img-top
                        class="custom-card"
                      >
                        <b-card-text class="custom-card-text-name font-book">{{item.name}}</b-card-text>
                        <b-card-text class="custom-card-text-price font-medium">{{item.price}}</b-card-text>
                        <b-button variant="primary" @click="addToCart(item)" size="sm">Add</b-button>
                        <b-button
                          variant="info"
                          v-b-modal.modal-lg
                          @click="setUpdateProduct(item)"
                          size="sm"
                        >Edit</b-button>
                        <b-button variant="danger" @click="deleteProduct(item.id)" size="sm">Delete</b-button>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
              <!-- End Food Items -->
              <!-- Cart -->
              <b-col xl="4" md="5" sm="5" xs="12" style="background-color: white;">
                <b-row>
                  <b-col xl="12" v-if="cart.length > 0">
                    <div class="mt-3 mr-3" v-for="(item, index) in cart" :key="index">
                      <b-card
                        v-bind:img-src="require(`../assets/images/products/${item.product_image}`)"
                        img-alt="Card image"
                        img-left
                        class="custom-card-cart custom-padding-cart-body"
                      >
                        <b-card-text style="font-family: AirbnbMedium;">{{item.product_name}}</b-card-text>

                        <b-button
                          variant="primary"
                          size="sm"
                          class="cart-qty"
                          @click="qtyMin(item)"
                        >-</b-button>
                        <b-button
                          variant="primary"
                          size="sm"
                          class="cart-qty"
                          style="background-color:white; font-weight: italic; border-left: none; border-right: none;"
                        >{{item.qty}}</b-button>
                        <b-button
                          variant="primary"
                          size="sm"
                          class="cart-qty"
                          @click="qtyPlus(item)"
                        >+</b-button>
                        <b-button
                          variant="primary"
                          size="sm"
                          style="margin-left: 60px; font-family: airBnbMedium; background-color: white; color: black; border: none;"
                        >Rp. {{item.product_price * item.qty}}</b-button>
                      </b-card>
                    </div>
                  </b-col>

                  <b-col xl="12" v-else>
                    <div class="text-center">
                      <img
                        src="../assets/images/icons/food_sidebar.png"
                        style="width: 250px; margin-top: 50px;"
                        class="col-12"
                        md="12"
                        sm="12"
                        xs="12"
                      />
                      <p
                        style="font-size: 25px; font-weight: bold; line-height: 10pt; margin-top: -20px;"
                      >Your cart is empty</p>
                      <p
                        style="font-size: 15px; font-weight: bold;color: #CECECE;"
                      >Please add some items from the menu</p>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <!-- End Cart -->
            </b-row>
          </b-col>
        </b-row>
        <footer style="background-color: white;">
          <b-row>
            <b-col xl="12" class="footers text-center">
              <p style="margin-top: 10px;">Built with love by Dimas Prayoga</p>
            </b-col>
          </b-row>
        </footer>
        <!-- End Content -->
      </b-container>
    </div>
    <!-- end wrapper -->
  </div>
  <!-- end flex -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'Axios',
  data() {
    return {
      page: 3,
      limit: 4,
      products: [],
      cart: [],
      search: '',
      varAlertMessage: '',
      modalTitle: 'Add Product',
      productId: '',
      buttonModalSave: true,
      selectOptionCategory: [
        { value: '1', text: 'Food' },
        { value: '0', text: 'Drink' }
      ],
      selectOptionStatus: [
        { value: '1', text: 'Active' },
        { value: '0', text: 'Non Active' }
      ],
      form: {
        name: '',
        image: '',
        id_category: '',
        price: '',
        status: ''
      },
      varAlert: false
    }
  },
  created() {
    this.get_products()
  },
  methods: {
    qtyPlus(data) {
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.qty += 1
      console.log(this.cart)
    },
    qtyMin(data) {
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.qty -= 1
      console.log(this.cart)
    },
    addToCart(data) {
      const setCart = {
        product_id: data.id,
        product_name: data.name,
        product_image: data.image,
        product_price: data.price,
        qty: 1
      }
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
      console.log(data.image)
    },
    get_products() {
      axios
        .get(
          `http://127.0.0.1:3009/product?page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    search_product() {
      if (this.search === '') {
        this.get_products()
      } else {
        axios
          .get(`http://127.0.0.1:3009/product/search?search=${this.search}`)
          .then((response) => {
            this.products = response.data.data
            console.log(this.products)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    addProduct() {
      this.modalTitle = 'Add Product'
      axios
        .post('http://127.0.0.1:3009/product', this.form)
        .then((response) => {
          this.varAlertMessage = 'Add'
          this.varAlert = true
        })
        .catch((error) => {
          console.log(error)
        })
      location.reload()
    },
    setUpdateProduct(data) {
      this.modalTitle = 'Edit Product'
      this.buttonModalSave = false
      this.varAlert = false
      this.form = {
        name: data.name,
        image: data.image,
        id_category: data.id_category,
        price: data.price,
        status: data.status
      }
      this.productId = data.id
    },
    editProduct(data) {
      axios
        .patch(`http://127.0.0.1:3009/product/${this.productId}`, this.form)
        .then((response) => {
          this.varAlertMessage = 'Edit'
          this.varAlert = true
        })
        .catch((error) => {
          console.log(error)
        })
      location.reload()
    },
    deleteProduct(id) {
      axios
        .delete(`http://127.0.0.1:3009/product/${id}`)
        .then((response) => {
          this.varAlert = true
        })
        .catch((error) => {
          console.log(error)
        })
      location.reload()
    }
  }
}
</script>

<style scoped>
/* Global */
@font-face {
  font-family: 'AirbnbMedium';
  src: url('../assets/fonts/AirbnbCerealMedium.ttf');
}
@font-face {
  font-family: 'AirbnbBook';
  src: url('../assets/fonts/AirbnbCerealBook.ttf');
}
.font-medium {
  font-family: AirbnbMedium;
}
.font-book {
  font-family: AirbnbBook;
}
/* Modify Bootstrap */
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
}
.card-img-left .card-body {
  padding-top: 0px;
}
/* Wrapper */
#wrapper {
  overflow: hidden;
}
.background-content {
  background-color: rgba(190, 195, 202, 0.3);
  height: 100%;
}
/* Custom Style */
.custom-card {
  background-color: transparent;
  border: none;
  font-size: 16pt;
}
.custom-card img {
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.custom-card-cart img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  margin: auto;
  margin-left: 10px;
}
@media (max-width: 576px) {
  .custom-card img {
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
@media (min-width: 992px) {
  .custom-card img {
    width: 240px;
    height: 180px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.custom-card-text-name {
  margin-left: -10px;
  margin-top: -15px;
}
.custom-card-text-price {
  margin-left: -10px;
  margin-top: -20px;
}
.btn-custom {
  background-color: transparent;
  border: none;
}
.custom-padding-cart-body .card-body {
  padding-top: 5px;
}
.cart-qty {
  border-radius: 0;
  border: 1px solid #82de3a;
  background-color: rgba(130, 222, 58, 0.2);
  color: #82de3a;
  font-family: AirbnbMedium;
  font-weight: bold;
}
/* Navbar */
.navbarOne {
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 4px 5px -2px gray;
  border-left: #cecece 1px solid;
  border-right: #cecece 1px solid;
  z-index: 1;
}
.navbarTwo {
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 4px 5px -2px gray;
  border-left: #cecece 1px solid;
  border-right: #cecece 1px solid;
  z-index: 1;
}
@media (max-width: 576px) {
  .navbarOne {
    box-shadow: none;
  }
  .navbarTwo {
    box-shadow: none;
  }
}
/* Sidemenu */
.sidemenu-box {
  width: 90px;
  height: 100%;
}
#sidemenu-wrapper {
  min-height: 100vh;
  margin-left: 0;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}
.sidemenu-header-box {
  height: 70px;
  font-size: 25px;
}
.modify-link-text {
  text-decoration: none;
  color: black;
}
.modify-link-text:hover {
  text-decoration: none;
  color: black;
}
#page-content-wrapper {
  width: 100%;
}
#wrapper.toggled #sidemenu-wrapper {
  /* margin-left: 0; */
  margin-left: -6rem;
}
/* Footer */
.footers {
  width: 100%;
  height: 50px;
}
</style>
