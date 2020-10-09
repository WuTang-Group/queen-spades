<template>
  <div>
    <Header></Header>
    <div class="house-container" :style="{backgroundImage: 'url(https://www.laprairie.com.cn/dw/image/v2/AAOT_PRD/on/demandware.static/-/Sites/default/dw78123b6b/The_House_Background-2.png?sw=1920)'}">
      <p class="title title-slider">
        THE HOUSE
      </p>
      <div class="house-items-container">
        <div class="house-item-box"
            v-for="(item, index) in houseItemList"
            @mouseenter="enterHouseItem"
            :key="index">
          <div class="item-image-box"
              :class="item.direct === 'right'? 'item-image-box-right': item.direct === 'left'? 'item-image-box-left':''"
              :data-index="index+1">
            <img class="item-image" :src="item.imageUrl">
          </div>
          <div class="item-content-box">
            <p class="item-title item-title-slider"
              :class="item.direct === 'right'? 'item-title-right': item.direct === 'left'? 'item-title-left':''">
              {{item.title}}
            </p>
            <p class="item-desc"
              :class="item.direct !== 'front'? 'item-hidden': ''">
              {{item.desc}}
            </p>
            <div class="button-wrap button-w-140 button-wrap-custom"
                :class="item.direct !== 'front'? 'item-hidden': ''">
              <a class="button-text" @click="switchPage({path:'/editorials-category', query: {slug:item.slug, name:item.title}})">
                探索
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "~/plugins/axios";
import { getThehouseCategory } from "~/api/category";

const rotateDirect = ['right', 'front', 'left']

export default {
  name: 'House',
  components: { Header, Footer },
  async asyncData () {
    const { data=[] } = await getThehouseCategory();
    let result = [];

    if(data && data.data.length > 0) {
      result = data.data.map((item, index)=>{
        let itemObj = {
          imageUrl: item.banner,
          title: item.name,
          desc: item.sub_title,
          slug: item.slug,
          direct: rotateDirect[index]
        }
        return itemObj
      })
    } else {
      that.$message({
        message: "获取分类页面失败",
        type: 'error'
      });
    }

    return {
      houseItemList: result
    }
  },
  data (){
    return {
      houseItemList: []
    }
  },
  created () {
  },
  mounted() {
    
  },
  methods: {

    enterHouseItem(ev){
      const that = this
      const target = ev.target || ev.element
      const houseIndex = target.firstElementChild.getAttribute('data-index')
      switch (houseIndex) {
        case '1':
          this.houseItemList[0].direct = 'front'
          this.houseItemList[1].direct = 'left'
          this.houseItemList[2].direct = 'left'
          break
        case '2':
          this.houseItemList[0].direct = 'right'
          this.houseItemList[1].direct = 'front'
          this.houseItemList[2].direct = 'left'
          break
        case '3':
          this.houseItemList[0].direct = 'right'
          this.houseItemList[1].direct = 'right'
          this.houseItemList[2].direct = 'front'
          break
        default:
          this.houseItemList[0].direct = 'right'
          this.houseItemList[1].direct = 'front'
          this.houseItemList[2].direct = 'left'
      }
    },
    
    // 跳转页面
    switchPage(pageInfo) {
      this.$router.push(pageInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
  .house-container {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    .title {
      color:#fff;
      font-family:"Helvetica Neue LT W06_35 Thin", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size:30px;
      font-weight:400;
      text-align: center;
      letter-spacing: 0.3px;
      padding-top: 20px;
      padding-bottom: 20px;
      margin-bottom: 25px;
      position: relative;
    }

    .title-slider::after {
      content: "";
      display: block;
      width: 45px;
      border-bottom: 1px solid #969696;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }

    .house-items-container {
      max-width: 1920px;
      padding-bottom: 30px;
      margin: 0 auto;
      display: flex;
      justify-content: center;

      .house-item-box {
        width: 500px;
        height: 785px;
        padding: 0 15px;
        box-sizing: border-box;
        position: relative;
        perspective:1000px;

        .item-image-box {
          min-width: 100%;
          min-height: 100%;
          transition: .6s;
          transform-style: preserve-3d;
          position: relative;
          transform: scale(.9);
          overflow: hidden;

          .item-image {
            display:block;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
          }
        }

        .item-image-box-left {
          transform: rotateY(-25deg) scale(.79);
        }

        .item-image-box-right {
          transform: rotateY(25deg) scale(.79);
        }

        .item-content-box {
          width:100%;
          position: absolute;
          left: 50%;
          bottom: 100px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;

          .item-title {
            color:#fff;
            font-family:"Helvetica Neue LT W06_35 Thin", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size:30px;
            font-weight:200;
            text-align: center;
            letter-spacing: 2px;
            line-height: 28px;
            padding-bottom: 14px;
            margin: 30px 0 0;
            position: relative;
            left: 0;
            right: 0;
            transition: 1.2s cubic-bezier(.19,1,.22,1);
          }

          .item-title-left {
            left: 26%;
          }

          .item-title-right {
            left: -26%;
          }

          .item-title-left::after,
          .item-title-right::after {
            border-width: 0px !important;
          }

          .item-title-slider::after {
            content: "";
            display: block;
            width: 45px;
            border-bottom: 1px solid #969696;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
          }

          .item-desc {
            color: white;
            font-family:"Helvetica Neue LT W06_35 Thin", "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size:15px;
            height:42px;
            letter-spacing:0.3px;
            line-height:21px;
            margin-top:14px;
            transition: 1.2s cubic-bezier(.19,1,.22,1);
          }

          .item-hidden {
            opacity: 0;
          }
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
  transition: 0.3s ease-in-out;
}

.button-w-220 {
  width: 220px;
}

.button-w-140 {
  width: 140px;
}

.button-wrap .button-text{
  display: inline-block;
  color: white;
  font-size: 14px;
  padding: 11px 20px;
  text-transform: capitalize;
  letter-spacing: 0.3px;
  font-family: M Ying Hei PRC W48 W3,Helvetica Neue LT W06_25 UltLt,Helvetica Neue,Helvetica,Arial,sans-serif;
}

.button-wrap:hover .button-text{
  color: #000;
}

@media screen and (max-width: 1800px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 450px;
        height: 705px;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 410px;
        height: 644px;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 370px;
        height: 581px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 330px;
        height: 518px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .house-container {

    .house-items-container {

      .house-item-box {
        width: 290px;
        height: 455px;

        .item-content-box {
          bottom: 80px;
          .item-title {
            font-size: 26px;
          }
        }
      }
    }

    .button-wrap-custom {
      width: 120px;

      .button-text {
        padding: 9px 16px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 250px;
        height: 392px;
      }
    }

    .button-wrap-custom {
      width: 110px;
    }
  }
}

@media screen and (max-width: 800px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 210px;
        height: 329px;

        .item-content-box {
          bottom: 60px;

          .item-title {
            font-size: 22px;
          }

          .item-desc {
            font-size: 12px;
          }
        }
      }
    }

    .button-wrap-custom {
      width: 110px;
    }
  }
}

@media screen and (max-width: 700px) {
  .house-container {

    .house-items-container {

      .house-item-box {
        width: 170px;
        height: 266px;

        .item-content-box {
          bottom: 40px;

          .item-title {
            font-size: 20px;
          }

          .item-desc {
            font-size: 10px;
          }
        }
      }
    }

    .button-wrap-custom {
        width: 90px;

      .button-text {
        font-size: 12px;
        padding: 8px 14px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .house-container { 

    .house-items-container {

      .house-item-box {
        width: 130px;
        height: 204px;

        .item-content-box {
          bottom: 24px;

          .item-title {
            font-size: 14px;
          }

          .item-desc {
            font-size: 6px;
          }
        }
      }
    }

    .button-wrap-custom {
        width: 70px;

      .button-text {
        font-size: 10px;
        padding: 4px 10px;
      }
    }
  }
}
</style>