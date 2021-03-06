import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 6,
    total_rows: 9, // null
    products: []
  },
  mutations: {
    data_product(state, payload) {
      state.products = payload.msg
      state.products = payload.data
      // state.totalRows = payload.pagination.totalData
    },
    s_change_page(state, payload) {
      state.page = payload
    }
  },
  actions: {
    get_products(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product?page=${context.state.page}&limit=${context.state.limit}`
        )
        .then((response) => {
          context.commit('data_product', response.data)
          //   console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    add_product(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3009/product', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    get_product(state) {
      return state.products
    },
    getTotalRows(state) {
      return state.total_rows
    },
    getCart(state) {
      return state.cart
    }
  }
}
