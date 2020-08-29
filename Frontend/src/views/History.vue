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
          <a href="/" class="modify-link-text">
            <img src="../assets/images/icons/fork.png" style="width: 40px; height: 40px;" />
          </a>
        </b-col>
      </b-row>
      <b-row class="sidemenu-header-box text-center align-items-center">
        <b-col xl="12">
          <a href="/history" class="modify-link-text">
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

    <div id="page-content-wrapper">
      <b-container fluid>
        <!-- Header -->
        <b-row style="margin-left:0px;">
          <b-col xl="12" md="12" sm="12" xs="12" class="navbarOne">
            <b-container>
              <b-row>
                <b-col
                  xl="10"
                  lg="8"
                  md="8"
                  sm="8"
                  class="col-8 text-center"
                  style="margin-top: 5px;"
                >
                  <p style="font-size: 30px">Fantasy POS | History</p>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
        <!-- End Header -->
        <!-- Modal -->
        <b-modal id="modal-lg" size="md" :title="this.modalTitle" hide-footer>
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
              <b-form-select v-model="form.id_category" class="mb-3">
                <b-form-select-option
                  v-for="(valueCategory, index) in categorys"
                  :key="index"
                  :value="`${valueCategory.category_id}`"
                >{{valueCategory.category_name}}</b-form-select-option>
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Status" label-for="input-3">
              <b-form-select v-model="form.status" id="input-3" :options="selectOptionStatus"></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4" label="Price" label-for="input-4">
              <b-form-input v-model="form.price" id="input-4" placeholder="Price"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="8">
                <b-button type="submit" v-if="buttonModalSave" variant="success">Save</b-button>
                <b-button type="button" v-else variant="info" @click="editProduct()">Edit</b-button>
              </b-col>
              <b-col sm="4" align-self="end">
                <b-button
                  type="button"
                  v-b-modal.modal-category
                  variant="primary"
                  style="margin: auto;"
                >Add Category</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-modal>
        <!-- End Modal -->
        <!-- Modal Category-->
        <b-modal id="modal-category" size="md" title="Add Category" hide-footer>
          <b-alert :show="varAlert">{{this.varAlertMessage}} Product Success</b-alert>
          <b-form v-on:submit.prevent="add_category">
            <b-form-group id="input-group-4" label="Price" label-for="input-4">
              <b-form-input v-model="form_category.name" id="input-4" placeholder="Category name"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="success">Save</b-button>
          </b-form>
        </b-modal>
        <!-- End Modal -->
        <!-- Content -->
        <b-row style="margin-left:0px;">
          <b-col xl="12" md="12" sm="12" class="background-content">
            <!-- Food Items -->
            <b-row>
              <b-col
                xl="12"
                md="12"
                sm="12"
                style="padding-right: 30px;padding-left: 30px;padding-top: 20px;"
              >
                <b-container fluid>a</b-container>
              </b-col>
              <!-- End Food Items -->
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
      page: 1,
      limit: 3,
      products: [],
      categorys: [],
      cart: [],
      invoice: Math.floor(Math.random() * 1000000000 + 1),
      search: '',
      sort: '',
      sortText: 'Sort',
      varAlertMessage: '',
      modalTitle: 'Add Product',
      productId: '',
      buttonModalSave: true,
      perPage: 4,
      currentPage: 1,
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
      form_category: {
        name: ''
      },
      varAlert: false,
      totalRows: null
    }
  },
  computed: {
    rows() {
      return this.totalRows
    }
  },
  created() {
    this.get_products()
    this.get_category()
  },
  methods: {
    checkout() {
      const setCart = {
        orders: [...this.cart]
      }
      axios
        .post('http://127.0.0.1:3009/order', setCart)
        .then((response) => {})
        .catch((error) => {
          console.log(error)
        })
    },
    qtyPlus(data) {
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.qty += 1
      incrementData.price = data.product_price * data.qty
      incrementData.ppn = (data.price * 5) / 100
    },
    qtyMin(data) {
      const incrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      incrementData.qty -= 1
    },
    addToCart(data) {
      const setCart = {
        invoice: this.invoice,
        product_id: data.id,
        product_name: data.name,
        product_image: data.image,
        product_price: data.price,
        price: data.price * 1,
        ppn: (data.price * 5) / 100,
        qty: 1
      }
      const fixedData = [...this.cart, setCart]
      const addedItem = fixedData.find((item) => item.product_id === data.id)
      const existItem = this.cart.find((item) => item.product_id === data.id)
      if (existItem) {
        addedItem.qty += 1
      } else {
        this.cart = [...this.cart, setCart]
      }
    },
    TotalCart() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].qty
      }
      return total
    },
    reset_cart() {
      this.cart = []
    },
    get_category() {
      axios
        .get('http://127.0.0.1:3009/category')
        .then((response) => {
          this.categorys = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    get_products() {
      axios
        .get(
          `http://127.0.0.1:3009/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
        )
        .then((response) => {
          this.products = response.data.data
          this.totalRows = response.data.pagination.totalData
          // console.log(response)
          // this.perPage = response.data.pagination.totalPage
          // console.log(response.data.pagination.totalPage)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sort_category() {
      this.sortText = 'Category'
      this.sort = 'id_category'
      this.get_products()
    },
    sort_asc() {
      this.sortText = 'Name (A-Z)'
      this.sort = 'name asc'
      this.get_products()
    },
    sort_desc() {
      this.sort = 'Name (Z-A)'
      this.sort = 'name desc'
      this.get_products()
    },
    sort_date_asc() {
      this.sort = 'Date (Newest)'
      this.sort = 'created asc'
      this.get_products()
    },
    sort_date_desc() {
      this.sort = 'Date (Oldest)'
      this.sort = 'created desc'
      this.get_products()
    },
    sort_price_asc() {
      this.sortText = 'Price (Lowest)'
      this.sort = 'price ASC'
      this.get_products()
    },
    sort_price_desc() {
      this.sortText = 'Price (Highest)'
      this.sort = 'price DESC'
      this.get_products()
    },
    search_product() {
      if (this.search === '') {
        this.get_products()
      } else {
        axios
          .get(`http://127.0.0.1:3009/product/search?search=${this.search}`)
          .then((response) => {
            this.products = response.data.data
            // console.log(this.products)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    add_category() {
      axios
        .post('http://127.0.0.1:3009/category', this.form_category)
        .then((response) => {
          this.form_category = []
          this.get_category()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProduct() {
      this.modalTitle = 'Add Product'
      axios
        .post('http://127.0.0.1:3009/product', this.form)
        .then((response) => {
          this.varAlertMessage = 'Add'
          this.varAlert = true
          this.form = []
          this.get_products()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setUpdateProduct(data) {
      this.modalTitle = 'Edit Product'
      this.buttonModalSave = false
      this.varAlert = false
      this.form = {
        name: data.name,
        image: data.image,
        id_category: data.category_id,
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
          this.form = [] // Check this if error
          this.buttonModalSave = true
          this.get_products()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(id) {
      axios
        .delete(`http://127.0.0.1:3009/product/${id}`)
        .then((response) => {
          this.get_products()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handlePage(pages) {
      this.page = pages
      this.get_products()
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
