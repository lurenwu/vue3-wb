

<template>
  <div class="address-edit-box">
    <s-header :name="`${type == 'add' ? '发布信息' : '编辑信息'}`"></s-header>
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
      v-if="logList.length > 0"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in logList" :key="index"
          >{{ item.create_time }} {{ item.brand_name }}查看了此信息,{{
            item.status == "0"
              ? "未跟进"
              : item.status == "1"
              ? "已跟进"
              : item.status == "2"
              ? "已放弃"
              : item.status == "3"
              ? "已成交"
              : ""
          }}&nbsp;&nbsp;<span
            @click="
              handleGoRouter('logList', {
                id: item.id,
                info_id: item.info_id,
                selfBrandCode: self_brand_code,
                brandCode: brand_code,
              })
            "
            >查看</span
          ></van-swipe-item
        >
      </van-swipe>
    </van-notice-bar>
    <div class="van-address-edit">
      <div class="">
        <van-form>
          <van-cell-group>
            <van-field
              v-model="info.address"
              rows="2"
              autosize
              label="*地址"
              type="info.address"
              maxlength="100"
              placeholder="请填写地址"
              show-word-limit
            />
            <van-field
              v-model="info.name"
              name="客户姓名"
              label="*客户姓名"
              placeholder="请填写客户姓名"
            />
            <van-field
              v-model="info.phone"
              name="客户手机号"
              label="*客户手机号"
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
                  <van-radio name="0">毛坯</van-radio>
                  <van-radio name="1">二改房</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="info.mianji"
              name="房屋面积"
              label="*房屋面积"
              placeholder="请输入房屋面积"
            />
            <van-field
              v-model="info.style"
              name="装修风格"
              label="*装修风格"
              placeholder="请输入装修风格"
            />
            <van-field name="radio" label="装修阶段">
              <template #input>
                <van-radio-group v-model="info.jieduan" direction="horizontal">
                  <van-radio name="0">刚开工</van-radio>
                  <van-radio name="1">水电</van-radio>
                  <van-radio name="2">木工</van-radio>
                  <van-radio name="2">油漆</van-radio>
                </van-radio-group>
              </template>
            </van-field>
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
                  <van-radio name="0">全包</van-radio>
                  <van-radio name="1">半包</van-radio>
                  <van-radio name="2">全案</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field name="radio" label="可见范围">
              <template #input>
                <van-radio-group
                  v-model="info.is_all_see"
                  direction="horizontal"
                >
                  <van-radio name="1">全部可见</van-radio>
                  <van-radio name="0" @click="handleSelectBrand"
                    >指定可见</van-radio
                  >
                  <van-radio name="2">取消可见</van-radio>
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
            <van-button class="btn" round block type="primary" @click="onSave">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>

    <van-popup
      v-model:show="show"
      @close="handlePopup"
      position="bottom"
      :style="{ height: '600px' }"
    >
      <div class="popup-comfirm" @click="handlePopup">确定</div>
      <div class="van-tree-select" style="height: 600px">
        <div class="van-sidebar van-tree-select__nav">
          <a
            class="
              van-sidebar-item 
              van-tree-select__nav-item"
              @click="curTime = item.day"
              :class="{'van-sidebar-item--select': curTime == item.day }" v-for="(item, index) in parentTimeList" :key="index"
            ><div class="van-badge__wrapper van-sidebar-item__text"  >
              {{item.text}}
            </div></a
          >
        </div>
        <div class="van-tree-select__content">
          <div class="van-ellipsis van-tree-select__item" :class="{'van-tree-select__item--active': curBrandList.indexOf(item.brand_code) > -1 }" v-for="(item, index) in brandList" :key="index" @click="handleTreeChoose(item.brand_code)">{{item.brand_name}}</div>
        </div>
      </div>
      <!-- <van-tree-select
        height="600"
        @click-item="handleTree"
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="parentTimeList"
      /> -->
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from "vue";
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute, useRouter } from "vue-router";
import { Dialog } from "vant";

import { editInfo, addInfo, getInfo, getLogInfo } from "@/service/index";
import { verify } from "@/common/js/verify";
import { getLocal } from "@/common/js/utils";

export default {
  components: {
    sHeader,
  },
  setup() {
    // const activeIds = ref([2]);
    const activeIndex = ref(0);
    const items = [];
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      type: "add",
      show: false,
      activeIds: [],
      logList: [],
      brand_code: "",
      self_brand_code: "",
      curBrandList:[],
      curTime:1,
      parentTimeList: [
        { text: "当天可见", id: 1, day: 1 },
        { text: "3天可见", id: 2, day: 3 },
        { text: "7天可见", id: 3, day: 7 },
      ],
      brandList: [],
      id: "",
      info_id: "",
      info: {
        address: "",
        nature: "0",
        name: "",
        phone: "",
        fangan: "0",
        is_all_see: "1",
        mianji: "",
        style: "",
        jieduan: "0",
      },
    });

    onMounted(async () => {
      const { type, id, info_id, brandCode } = route.query;
      state.type = type;
      state.id = id || "";
      state.self_brand_code = getLocal("brand_code");
      state.info_id = info_id;
      state.brand_code = brandCode;
      state.brandList = JSON.parse(getLocal("brandList"));
      state.brandList.forEach((item,index)=>{
            if(item.brand_code === state.self_brand_code) {
              state.brandList.splice(index,1)
            }
        })
      if (id) {
        await handleGetInfo();
        handleGetLogList();
      }
      await handleGetTimeList();
    });
    const handleGetLogList = async () => {
      const params = {
        info_id: state.info_id,
        brand_code: state.brand_code,
        self_brand_code: state.self_brand_code,
      };
      await getLogInfo(params).then((data) => {
        state.logList = data.list;
      });
    };
    const handleGetInfo = async () => {
      const params = {
        info_id: state.info_id,
        self_brand_code: state.self_brand_code,
        brand_code: state.brand_code,
      };
      await getInfo(params).then((data) => {
        state.info = data.info;
      });
    };
    const handleGetTimeList = async () => {
      if (state.info.is_all_see == 0) {
        var arrSee = state.info.see_list.split(",");
        arrSee.forEach((see) => {
          var brand_code = see.split(" ")[0];
          state.curBrandList.push(brand_code);
          state.curTime =  see.split(" ")[1];
          console.log(state.curTime)
        });
      }
    };
    const handlePopup = async () => {
      state.show = false;
      var choosebrandList = [];
      state.curBrandList.forEach((item) => {
          choosebrandList.push(item + " " + state.curTime);
      });
      if (choosebrandList.length === 0) {
        state.info.is_all_see = "1";
      }
      state.info.see_list = choosebrandList.toString();
      console.log(choosebrandList.toString());
    };
    const onSave = async () => {
      const params = {
        address: state.info.address,
        name: state.info.name,
        phone: state.info.phone,
        mianji: state.info.mianji,
        style: state.info.style,
        jieduan: state.info.jieduan,
      };

      var done = true;
      var result = "";
      for (var item in params) {
        if (done === false) {
          return;
        }

        result = verify(item, params[item]);
        if (!result.done) {
          Toast.fail(result.value);
        }
        done = result.done;
      }
      if (!done) {
        return;
      }
      if (!/^[1]([3-9])[0-9]{9}$/.test(state.info.phone)) {
        return Toast.fail("请输入正确的手机号");
      }
      if (state.info.phone2) {
        if (!/^[1]([3-9])[0-9]{9}$/.test(state.info.phone2)) {
          return Toast.fail("请输入正确的手机号");
        }
      }
      Dialog.confirm({
        title: "温馨提示",
        message: `确定${state.type == "add" ? "发布" : "更新"}吗`,
      })
        .then(async () => {
          await (state.type == "add"
            ? addInfo({ brand_code: state.self_brand_code, ...state.info })
            : editInfo({ brand_code: state.self_brand_code, ...state.info })
          ).then(() => {
            Toast("保存成功");
            setTimeout(() => {
              router.replace({ name: "infoList" });
            }, 1000);
            setTimeout(() => {
              window.location.reload();
            }, 1100);
          });
          // 数据返回有问题
          // setTimeout(() => {
          //   router.back()
          // }, 1000)
        })
        .catch(() => {});
    };

    const handleSelectBrand = async () => {
      state.show = true;
    };
    const handleGoRouter = async (path, query) => {
      router.push({ path: path, query: query });
    };
   
    const handleTreeChoose = async(item) => {
      if(state.curBrandList.indexOf(item) > -1) {
        state.curBrandList.splice(item,1)
      } else {
        state.curBrandList.push(item)
      }
    }
    return {
      items,
      activeIndex,
      ...toRefs(state),
      onSave,
      handleSelectBrand,
      handleGetInfo,
      handlePopup,
      handleGetTimeList,
      handleGoRouter,
      handleTreeChoose
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
      padding: 10px 5px;
    }
    .van-radio--horizontal {
      margin-right: 8px;
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
.notice-swipe {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
}
.popup-comfirm {
  text-align: right;
  padding: 10px 20px;
  font-size: 14px;
  color: #ee0a24;
}
</style>
