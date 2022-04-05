

<template>
  <div class="address-edit-box">
    <s-header :name="`${type == 'add' ? '发布信息' : '编辑信息'}`"></s-header>
   
    <div class="van-address-edit">
      <div class="">
        <van-form >
          <van-cell-group inset>
              <van-field
                v-model="info.address"
                rows="2"
                autosize
                label="地址"
                type="info.address"
                maxlength="100"
                placeholder="请填写地址"
                show-word-limit

              />
            <van-field
              v-model="info.name"
              name="客户姓名"
              label="客户姓名"
              placeholder="请填写客户姓名"
            />
            <van-field
              v-model="info.phone"
              name="客户手机号"
              label="客户手机号"
              placeholder="请输入客户手机号"
            />
            <van-field
              v-model="info.phone2"
              name="客户手机号2"
              label="客户手机号2"
              placeholder="客户手机号2"
            />
            <van-field name="radio" label="性质">
              <template #input>
                <van-radio-group v-model="info.nature" direction="horizontal">
                  <van-radio :name="0">毛坯</van-radio>
                  <van-radio :name="1">二改房</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="info.mianji"
              name="房屋面积"
              label="房屋面积"
              placeholder="请输入房屋面积"
            />
            <van-field
              v-model="info.style"
              name="装修风格"
              label="装修风格"
              placeholder="请输入装修风格"
            />
            <van-field
              v-model="info.jieduan"
              name="装修阶段"
              label="装修阶段"
              placeholder="请输入装修阶段"
            />
            <van-field
              v-model="info.yusuan"
              name="装修预算"
              label="装修预算"
              placeholder="请输入装修预算"
            />
            <van-field
              v-model="info.design_name"
              name="设计师姓名"
              label="设计师姓名"
              placeholder="请输入设计师姓名"
            />
            <van-field
              v-model="info.design_phone"
              name="设计师电话"
              label="设计师电话"
              placeholder="请输入设计师电话"
            />
            <van-field name="radio" label="装修方案">
              <template #input>
                <van-radio-group v-model="info.fangan" direction="horizontal">
                  <van-radio :name="0">全包</van-radio>
                  <van-radio :name="1">半包</van-radio>
                  <van-radio :name="2">全案</van-radio>

                </van-radio-group>
              </template>
            </van-field>
            <van-field name="radio" label="可见范围">
              <template #input>
                <van-radio-group v-model="info.is_all_see" direction="horizontal">
                  <van-radio :name="1">全部可见</van-radio>
                  <van-radio :name="0" @click="handleSelectBrand">指定可见</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-cell-group inset>
              <van-field
                v-model="info.remark"
                rows="2"
                autosize
                label="备注"
                type="textarea"
                maxlength="100"
                placeholder="请输入备注"
                show-word-limit
              />
            </van-cell-group>
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" @click="onSave">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
   
    <van-popup v-model:show="show"  @close="handlePopup" position="bottom" :style="{ height: '80%' }">
      <van-tree-select
      @click-item="handleTree"
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="seeList"
    />
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from "vue";
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute } from "vue-router";
import { get, post } from '@/service/index'
import {verify} from "@/common/js/verify";

export default {
  components: {
    sHeader,
  },
  setup() {
    // const activeIds = ref([2]);
    const activeIndex = ref(0);
    const items = [];
    const route = useRoute()
    const state = reactive({
      type: 'add',
      show: false,
      activeIds:[],
      seeList: [
        {
          text: "光大墙纸",
          des: "gdqz",
          isShow: false,
          children: [
            { text: "当天可见", id: 1, from: "gdqz", isShow: false,day: 1 },
            { text: "3天后可见", id: 2, from: "gdqz", isShow: false,day: 3 },
            { text: "7天后可见", id: 3, from: "gdqz", isShow: false,day: 7 },
          ],
        },
        {
          text: "光大墙纸",
          des: "sss",
          isShow: false,
          children: [
            { text: "当天可见", id: 4, from: "sss", isShow: false,day: 1 },
            { text: "3天后可见", id: 5, from: "sss", isShow: false,day: 3 },
            { text: "7天后可见", id: 6, from: "sss", isShow: false,day: 7 },
          ],
        },
      ],
      info:{
        address:"",
        nature: 0,
        name:"",
        phone:"",
        fangan:2,
        is_all_see: 1
      },
    });
    const username = ref("");
    const password = ref("");

    onMounted(async () => {
      const { type } = route.query
      state.type = type
      getBranchList();
    });
    const handlePopup = async() => {
      console.log(2)
      var chooseSeeList = []
      state.seeList.forEach(item=>{
        item.children.forEach(child=>{
          if(child.isShow) {
            chooseSeeList.push(child.from + " " + child.day)
          }
        })
      })
      if(chooseSeeList.length === 0) {
        state.info.is_all_see = 1
      }
      state.info.see_list = chooseSeeList.toString()
      console.log(chooseSeeList.toString())
    }
    const onSave = async () => {
      console.log(verify)
        const params = {
          address: state.info.address,
          name:state.info.name,
          phone:state.info.phone,
          mianji:state.info.mianji,
          style:state.info.style,
          jieduan:state.info.jieduan,
        };
       
      var done = true;
      var result = "";
      for (var item in params) {
        if (done === false) {
          return;
        }

        result = verify(item, params[item]);
        if (!result.done) {
          Toast.fail(result.value)
        }
        done = result.done;
      }
      if (!done) {
        return;
      }
     
      post((state.type == "add" ? {t:"addInfo",...state.info} : {t: "editInfo",...state.info})).then(()=>{
        console.log(111)
      Toast("保存成功");

      });

      // setTimeout(() => {
      //   router.back()
      // }, 1000)
    };
    const getBranchList = async () => {
    
      const params = {
        t: "getBranchList"
      };
      await get(params);
      Toast("保存成功");
      // setTimeout(() => {
      //   router.back()
      // }, 1000)
    };
    const handleSelectBrand = async () => {
      state.show = true;
    
    };
  
    const handleTree = async (item) => {
      state.activeIds = []
      state.seeList.forEach((list)=>{
        if(list.des !== item.from) return;
        list.children.forEach((see)=>{
          if(item.id === see.id) {
            list.isShow = !see.isShow;
            see.isShow = !see.isShow;
          } else {
            see.isShow = false
          }
        })
      })
      state.seeList.forEach((list)=>{
        list.children.forEach((see)=>{
          if(see.isShow) {
            state.activeIds.push(see.id);
          }
        })
      })
     
    };
    return {
      items,
      activeIndex,
      username,
      password,
      ...toRefs(state),
      getBranchList,
      onSave,
      handleSelectBrand,
      handleTree,
      handlePopup
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
