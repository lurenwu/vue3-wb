

<template>
  <div class="login login-container">
    <s-header noback :name="type == 'login' ? '登录' : '注册'" ></s-header>
    <div class="logo"></div>
    <div v-if="type == 'login'" class="login-body login">

      <van-form @submit="onSubmit">
      <div class="form-box">

        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>

        <div style="margin: 16px;">
          <van-button class="btn" round block color="#1989fa" native-type="submit">登录</van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { login,getBrandList } from '@/service/index'
import { setLocal } from '@/common/js/utils'
import { Toast } from 'vant'

export default {
  setup() {
   
    const state = reactive({
      username: '',
      password: '',
      type: 'login',
      brandList:[]
    })

    const handleGetBrandList = async () => {
      getBrandList().then((data)=>{
        state.brandList = data.list;
        setLocal("brandList",JSON.stringify(state.brandList))
        window.location.href = '/#/infoList'
        // window.location.href = '/#/brand'
      

      });
     
    };

    // 提交登录或注册表单
    const onSubmit = async (values) => {
      // setLocal('brand_code', "htydb")
      setLocal('tipNum', 0)
      login({
        "username": values.username,
        "password": values.password
      }).then((data)=>{
        if(data.list.length === 0) {
          Toast.fail('用户名或者密码错误，请检查~')
        } else {
          setLocal('userInfo', JSON.stringify(data.list[0]))
          setLocal('brand_code', data.list[0].brand_code)
          handleGetBrandList()
        }
      });
     

      // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
    }

    return {
    
      ...toRefs(state),
      onSubmit,
      handleGetBrandList
    }
  },
  components: {
    sHeader
  }
}
</script>

<style lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
    background: url("../assets/login-bg.jpg") no-repeat;
    .form-box {
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 30px;
    }
}
  .login {
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 80px auto 20px;
    }
    .login-body {
      padding: 0 20px;
    }
    .login {
      .link-register {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .register {
      .link-login {
        font-size: 14px;
        margin-bottom: 20px;
        color: #1989fa;
        display: inline-block;
      }
    }
    .verify-bar-area {
      margin-top: 24px;
      .verify-left-bar {
        border-color: #1baeae;
      }
      .verify-move-block {
        background-color: #1baeae;
        color: #fff;
      }
    }
    .verify {
      >div {
        width: 100%;
      }
      display: flex;
      justify-content: center;
      .cerify-code-panel {
        margin-top: 16px;
      }
      .verify-code {
        width: 40%!important;
        float: left!important;
      }
      .verify-code-area {
        float: left!important;
        width: 54%!important;
        margin-left: 14px!important;
        .varify-input-code {
          width: 90px;
          height: 38px!important;
          border: 1px solid #e9e9e9;
          padding-left: 10px;
          font-size: 16px;
        }
        .verify-change-area {
          line-height: 44px;
        }
      }
    }
  }
</style>
