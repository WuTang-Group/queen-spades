<template>
  <div>
    <Header></Header>
    <div class="wish-list-container dark-layout">
      <h1 class="wish-list-title">我的愿望清单</h1>
      <div class="wish-list-items-container">
        <template v-if="list.length === 0">
          <div class="empty-list">
            请添加心愿单
          </div>
        </template>
        <template v-else>
          <div class="product-list-item"
            v-for="item in list"
            :key="item.id">
            <div class="product-left">
              <div class="product-info" @click="switchProductInfo(item.slug)">
                <div class="product-image-wrap">
                  <img class="product-image" :src="item.thumbnail" />
                </div>
                <div class="product-info-wrap">
                  <span class="product-desc">{{item.product_name_en}}</span>
                  <span class="product-desc">{{item.product_name}}</span>
                  <span class="product-desc">{{item.spec}}</span>
                </div>
              </div>
              <div class="product-sale-price" v-if="item.sale_price">
                <span class="product-price">
                  ¥ {{item.sale_price | formatMoneyFilter}}
                </span>
                <span class="product-origin-price">
                  ¥ {{item.price | formatMoneyFilter}}
                </span>
              </div>
              <div class="product-price" v-else>
                ¥ {{item.price | formatMoneyFilter}}
              </div>
            </div>
            <div class="product-right">
              <div class="product-cart">
                <div class="button-wrap button-w-180 button-w-mobile-140 button-wrap-custom" @click="addToCart(item.id)">
                  <span class="button-text">添加至购物车</span>
                </div>
              </div>
              <div class="product-delete">
                <span class="delete-button" @click="deleteWishFromList(item.id)">删除</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="pagination-container pagination-mobile" v-if="listTotal > 0">
          <ul class="pagination" @click="pageChange">
            <li class="page-item">
              <a class="previous" @click="previousPage">前一页</a>
            </li>
            <li class="page-item"
                :class="{'active': listQuery.page === item }"
                :key="item"
                v-for="item in pageTotal" 
            >
              <a class="" :data-count="item">{{item}}</a>
            </li>
            <li class="page-item">
              <a class="next" @click="nextPage">后一页</a>
            </li>
          </ul>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getWishList, deleteWish } from "~/api/wish";
import { saveWishToCart } from "~/api/cart";
import { formatMoney } from '@/filter'
import { mapState, mapMutations } from 'vuex'
import { getShoppingCartData, addShoppingCart } from "~/api/cart";

let defaultListQuery = {
  page: 1,
  page_limit: 6
}

export default {
  name: "WishList",
  components: { Header, Footer },
  async asyncData({ params }) {
    const { data } = await getWishList(defaultListQuery)

    let list = []
    let listTotal = 0

    if(data.code === 20001 && data.data && data.data.data) {
      list = data.data.data
      listTotal = data.data.total
    }
    
    return { 
      list,
      listTotal
    }
  },
  filters: {
    formatMoneyFilter: formatMoney
  },
  data () {
    return {
      listQuery: defaultListQuery,
      list:[],
      listTotal: 0,
      pageTotal: 0     // 根据listTotal和page_limit计算分页总共有多少页
    };
  },
  created () {
    // 计算分页相关数据
    this.caculatePaginationData()
  },
  mounted () { },
  methods: {
    ...mapMutations({
      setWishInfo: "SET_WISH_INFO",
      setCartInfo: 'SET_CART_INFO'
    }),
    // 获取wishlist
    getList(){
      const that = this

      getWishList(that.listQuery).then(({data}) => {

        if(data.code === 20001 && data.data && data.data.data) {
          let list = data.data.data

          if(list.length === 0 && that.listQuery.page > 1) {

            that.listQuery.page--
            that.getList()
          } else {

            that.list = list
            that.listTotal = data.data.total

            // 每次获取完商品总数需重新计算分页信息
            that.caculatePaginationData()
          }

          // 将心愿单数据存储全局状态，header处需要心愿单数量
          that.setWishInfo(data.data)
          
        } else {
          that.$message({
            message: '获取心愿列表失败',
            type: 'error'
          });
        }
      }).catch(err=>{
        that.$message({
          message: '获取心愿列表失败',
          type: 'error'
        });
      })
    },

    // 删除心愿单
    deleteWishFromList(id){
      const that = this
      const params = {
        product_id: id
      }

      deleteWish(params).then(({data})=>{
        if(data.code === 20001) {
          that.$message({
            message: '删除心愿单成功',
            type: 'success'
          })

          that.getList()
        }

      }).catch(err => {
        that.$message({
          message: '删除心愿单失败',
          type: 'error'
        });
      })
    },

    // 获取购物车信息，添加到全局状态中
    getShoppingCart() {
      const that = this
      getShoppingCartData().then(res => {
        if (res.data.code === 20001) {
          that.setCartInfo(res.data.data)
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
      .catch(e => {
        console.log('获取购物车列表失败: error ', e)
      });
    },

    // 添加到购物车
    addToCart(id){
      const that = this
      const params = {
        product_list: [{
          product_id: id
        }]
      }
      
      saveWishToCart(params).then(({data})=>{
        if(data.code === 20001) {
          that.getShoppingCart();
          that.$message({
            message: '添加购物车成功',
            type: 'success'
          })
        } else {
          that.$message({
            message: data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        that.$message({
          message: '添加购物车失败',
          type: 'error'
        });
      })
    },

    // 计算分页相关数据
    caculatePaginationData(){
      // 计算分页总页数
      this.pageTotal = Math.ceil(this.listTotal / this.listQuery.page_limit)
    },

    // 跳转详情页面
    switchProductInfo(slug) {
      this.$router.push(`/rapid-response-booster?slug=${slug}`)
    },

    // 切换前一页
    previousPage(e){
      if(this.listQuery.page > 1) {
        this.listQuery.page--

        // 重新获取数据
        this.getList()
      }
      
      // 阻止事件冒泡
      e.stopPropagation();
    },

    // 切换后一页
    nextPage(e){
      if(this.pageTotal > this.listQuery.page) {
        this.listQuery.page++

        // 重新获取数据
        this.getList()
      }
      
      // 阻止事件冒泡
      e.stopPropagation();
    },
    
    // 分页切换事件
    pageChange(e){
      let target = e.target||e.srcElement;
      let page = Number(target.getAttribute('data-count'));
      this.listQuery.page = page;

      // 重新获取数据
      this.getList()
      
      // 阻止事件冒泡
      e.stopPropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
.wish-list-container {
  width: 1140px;
  margin: 0 auto 70px;

  .wish-list-title {
    color: white;
    font-size:22px;
    font-weight:500;
    margin: 70px 0 0;
    font-family:JXiHei, serif;
  }
}

.wish-list-items-container {
  width: 100%;

  .empty-list {
    width: 100%;
    height: 200px;
    color: #aaa;
    font-family:JXiHei, serif;
    font-size:16px;
    font-weight:400;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-list-item {
    border-bottom: 1px solid #938d8c;
    padding: 30px 0;
    display: flex;

    .product-left {
      width: 60%;
      display: flex;
      align-items: center;

      .product-info {
        width: 70%;
        display: flex;
        cursor: pointer;

        .product-image-wrap {
          width: 100px;
          height: 100px;

          .product-image {
            width: 100%;
            height: 100%;
          }
        }

        .product-info-wrap {
          margin-left: 16px;
          display: flex;
          flex-direction: column;

          .product-desc {
            color: white;
            font-family:"Mont ExtraLight", serif;
            font-size:14px;
            font-weight:400;
            padding-bottom: 10px;
          }

          .product-sub-desc {
            color: #938d8c;
            font-family:"Mont ExtraLight", serif;
            font-size:12px;
            font-weight:400;
          }
        }
      }

      .product-price {
        width: 30%;
        font-size:16px;
        font-weight:700;
        font-family:JXiHei, serif;
        margin-bottom: 0;
        text-align: left;
      }

      .product-origin-price {
        color: #ddd;
        font-size:12px;
        font-weight:700;
        font-family:JXiHei, serif;
        text-decoration: line-through;
      }
    }

    .product-right {
      width: 40%;
      display: flex;
      align-items: center;

      .product-cart,
      .product-delete {
        width: 50%;
      }

      .product-cart {
        display: flex;
        justify-content: center;
      }

      .product-delete {
        color: #aaa;
        text-align: center;

        .delete-button {
          font-family:JXiHei, serif;
          font-size:14px;
          font-weight:400;
          cursor: pointer;
        }
      }

      .product-delete:hover {
        color: white;
      }
    }
  }
}
.button-wrap {
  text-align: center;
  border: 1px solid #fff;
  border-radius: 3px;
  background: rgba(0,0,0,.1);
  cursor: pointer;
}

.button-wrap:hover {
  background-color: white;
}

.button-w-180 {
  width: 168px;
}

.button-wrap .button-text{
  display: inline-block;
  color: white;
  font-size: 14px;
  padding: 8px 20px;
  letter-spacing: 0.3px;
  font-family: M Ying Hei PRC W48 W3,Helvetica Neue LT W06_25 UltLt,Helvetica Neue,Helvetica,Arial,sans-serif;
  position: relative;
  top: 2px;
}

.button-wrap:hover .button-text{
  color: #000;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  .page-item {

    .previous,
    .next,
    a {
      cursor: pointer;
    }
  }
}


@media screen and (max-width: 1200px) {
  .wish-list-container {
    width: 1000px;
  }
}

@media screen and (max-width: 1100px) {
  .wish-list-container {
    width: 860px;
  }
}

@media screen and (max-width: 960px) {
  .wish-list-container {
    width: 768px;

    .product-list-item {
    
      .product-left {
        flex-direction: column;
        align-items: flex-start;

        .product-info {
          width: 100%;
        }

        .product-sale-price {
          width: 100%;
          position: relative;
          top: 14px;
          left: 92px;
        }

        .product-price{
          width: 100%;
        }
      }
    }
  }
}

@media screen and (max-width: 868px) {
  .wish-list-container {
    width: 500px;
    .product-list-item {

      .product-right {
        flex-direction: column-reverse;
        align-items: flex-end;
        justify-content: space-between;

        .product-cart,
        .product-delete {
          width: 100%;
        }

        .product-cart {
          justify-content: flex-end;
        }

        .product-delete {
          text-align: right;
        }
      }
    }
  }

  .pagination-mobile {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 600px) {
  .wish-list-container {
    width: 330px;
    .product-list-item {
      .product-left {
        .product-info {
          flex-direction: column;

          .product-info-wrap {
            margin-left: 0;
            margin-top: 10px;
          }
        }

        .product-sale-price {
          top: 4px;
          left: 0;
        }
      }

      .product-right {

        .product-cart {

          .button-w-mobile-140 {
            width: 120px;
          }
          .button-wrap .button-text{
            padding: 8px 10px;
          }
        }
      }
    }
  }
}
</style>
