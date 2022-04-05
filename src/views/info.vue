

<template>
  <div class="address-edit-box">
    <s-header name="查看信息" isComfirmBack @callback="handleFollow(false)"></s-header>
    <div class="van-address-edit">
      <div class="">
        <van-form >
          <van-cell-group inset>
              <van-field
                v-model="info.address"
                rows="2"
                autosize
                readonly
                label="地址"
                type="textarea"
                maxlength="100"

              />
              <van-field
                v-model="info.natureDes"
                name="性质"
                readonly
                label="性质"
              />
            <van-field
              v-model="info.name"
              name="客户姓名"
              label="客户姓名"
              readonly
            />
            <van-field
              v-model="info.phone"
              name="客户手机号"
              readonly
              label="客户手机号"
            />
            <van-field
              v-model="info.phone2"
              name="客户手机号2"
              readonly
              label="客户手机号2"
            />
          
            <van-field
              v-model="info.mianji"
              name="房屋面积"
              label="房屋面积"
              readonly
            />
            <van-field
              v-model="info.style"
              name="装修风格"
              label="装修风格"
              readonly
            />
            <van-field
              v-model="info.jieduan"
              name="装修阶段"
              label="装修阶段"
              readonly
            />
            <van-field
              v-model="info.yusuan"
              name="装修预算"
              label="装修预算"
              readonly
            />
            <van-field
              v-model="info.design_name"
              name="设计师姓名"
              label="设计师姓名"
              readonly
            />
            <van-field
              v-model="info.design_phone"
              name="设计师电话"
              label="设计师电话"
              readonly
            />
            <van-field
              v-model="info.fanganDes"
              name="装修方案"
              label="装修方案"
              readonly
            />
           
            <van-cell-group inset>
              <van-field
                v-model="info.remark"
                rows="2"
                autosize
                label="备注"
                type="textarea"
                maxlength="100"
                readonly
              />
            </van-cell-group>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" @click="onFollow(true)">
              跟进
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { Toast,Dialog } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute } from "vue-router";
import { get, post } from '@/service/index'
import { natureList,fanganList } from '@/common/js/utils'
import { getLocal } from '@/common/js/utils'

export default {
  components: {
    sHeader,
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      natureList:natureList,
      fanganList:fanganList,
      info: {}
    });

    onMounted(async () => {
      const kehuId = getLocal('kehuId')
      const { type,infoId } = route.query
      state.type = type
      state.infoId = infoId
      state.kehuId = kehuId;
      state.info = {
        address:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        nature: 0,
        name:"22",
        phone:"33",
        phone2:"33444",
        fangan:2,
        mianji: '120平方',
        style: '日式',
        jieduan: '还没开始',
        yusuan: '100W',
        design_name: '陈林',
        design_phone: '15158696740',
        remark: '的撒打算说的',
        see_list: '1,2',
        is_all_see: 0,
        see_type: 3,
        brand_code: 'dsa'
      }
      state.info.fanganDes = state.fanganList.filter(item=> item.value === state.info.fangan)[0].name
      state.info.natureDes = state.natureList.filter(item=> item.value === state.info.nature)[0].name
      handleRead()
      getInfo();
    });

    const onFollow = async () => {
      Dialog.confirm({
        title: '系统提示',
        message:
          `确定跟进吗`,
      }).then(() => {
        handleFollow(true)
      })
      .catch(() => {
      });
    };
    const handleFollow = async (result) => {
      await post({t:"updateKehuInfoState",state: result ? 1 : 0}).then(()=>{
        console.log(111)
        Toast("保存成功");
      });
    };
    const handleRead = async () => {
      const params = {
        t: 'insertKehuInfoRead',
        kehu_id: state.kehuId,
        info_id: state.infoId
      };
      post(params).then(()=>{
        
      });
    };
    const getInfo = async () => {
    
      const params = {
        t: "getInfo",
        info_id: "",
      };
      await get(params);
      Toast("保存成功");
      // setTimeout(() => {
      //   router.back()
      // }, 1000)
    };
   
   
    
    return {
      ...toRefs(state),
      getInfo,
      onFollow,
      handleRead
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
.address-edit-box {
  .van-address-edit {
    .van-cell {
      font-size: 12px;

    }
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }
    .van-switch--on {
      background: @primary;
    }
  }
}
</style>
