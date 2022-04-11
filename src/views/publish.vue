

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
          >{{ item.create_time }} {{ item.brand_name }}查看了此信息，{{
            info.status == "0" ? "未跟进" : info.status == "1" ? "已跟进" : ""
          }}</van-swipe-item
        >
      </van-swipe>
    </van-notice-bar>
    <div class="van-address-edit">
      <div class="">
        <van-form>
          <van-cell-group inset>
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
            <van-field
              v-model="info.jieduan"
              name="装修阶段"
              label="*装修阶段"
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
      <van-tree-select
        height="600"
        @click-item="handleTree"
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="brandList"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref } from "vue";
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
import { useRoute, useRouter } from "vue-router";
import {
  editInfo,
  addInfo,
  getTimeList,
  getInfo,
  getLogInfo,
} from "@/service/index";
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
      brandList: [],
      brand_code:"",
      self_brand_code:"",
      timeList: [],
      id: "",
      info: {
        address: "",
        nature: "0",
        name: "",
        phone: "",
        fangan: "0",
        is_all_see: "1",
        mianji: "",
        style: "",
        jieduan: "",
      },
    });

    onMounted(async () => {
      const { type, id,selfBrandCode } = route.query;
      state.type = type;
      state.id = id || "";
      state.brand_code = getLocal("brand_code");
      state.self_brand_code = selfBrandCode;

      state.brandList = JSON.parse(getLocal("brandList"));

      if (id) await handleGetInfo();
      await handleGetTimeList();
      handleGetLogList();
    });
    const handleGetLogList = async () => {
      const params = {
        info_id: state.id,
        brand_code: state.brand_code,
        self_brand_code: state.self_brand_code,
      };
      await getLogInfo(params).then((data) => {
        state.logList = data.list;
      });
    };
    const handleGetInfo = async () => {
      const params = {
        info_id: state.id,
      };
      await getInfo(params).then((data) => {
        state.info = data.info;
      });
    };
    const handleGetTimeList = async () => {
      await getTimeList().then((data) => {
        state.timeList = data.list;

        state.brandList.forEach((item) => {
          item.is_show = false;
          item.text = item.brand_name;
          item.children = [];
          state.timeList.forEach((time) => {
            if (time.from === item.brand_code ) {
              time.is_show = item.is_show === "1";
              item.children.push(time);
            }
          });
        });
        if (state.info.is_all_see == 0) {
          var arrSee = state.info.see_list.split(",");
          arrSee.forEach((see) => {
            var brand_code = see.split(" ")[0];
            var day = see.split(" ")[1];
            state.brandList.forEach((item) => {
              item.children.forEach((child) => {
                if (child.from === brand_code && child.day === day) {
                  state.activeIds.push(child.id);
                  child.is_show = true;
                }
              });
            });
          });
        }
      });
    };
    const handlePopup = async () => {
      console.log(2);
      var choosebrandList = [];
      state.brandList.forEach((item) => {
        item.children.forEach((child) => {
          if (child.is_show) {
            choosebrandList.push(child.from + " " + child.day);
          }
        });
      });
      if (choosebrandList.length === 0) {
        state.info.is_all_see = "1";
      }
      state.info.see_list = choosebrandList.toString();
      console.log(choosebrandList.toString());
    };
    const onSave = async () => {
      console.log(state.info);
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
      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
          state.info.phone
        )
      ) {
        return Toast.fail("请输入正确的手机号");
      }
      if (state.info.phone2) {
        if (
          !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
            state.info.phone2
          )
        ) {
          return Toast.fail("请输入正确的手机号");
        }
      }

      await (state.type == "add"
        ? addInfo({ brand_code: state.brand_code, ...state.info })
        : editInfo({ brand_code: state.brand_code, ...state.info })
      ).then(() => {
        Toast("保存成功");
        setTimeout(() => {
          router.back();
        }, 1000);
      });

      // setTimeout(() => {
      //   router.back()
      // }, 1000)
    };

    const handleSelectBrand = async () => {
      state.show = true;
    };

    const handleTree = async (item) => {
      state.activeIds = [];
      state.brandList.forEach((list) => {
        if (list.brand_code !== item.from) return;
        list.children.forEach((see) => {
          if (item.id === see.id) {
            list.is_show = !see.is_show;
            see.is_show = !see.is_show;
          } else {
            see.is_show = false;
          }
        });
      });
      state.brandList.forEach((list) => {
        list.children.forEach((see) => {
          if (see.is_show) {
            state.activeIds.push(see.id);
          }
        });
      });
    };
    return {
      items,
      activeIndex,
      ...toRefs(state),
      onSave,
      handleSelectBrand,
      handleGetInfo,
      handleTree,
      handlePopup,
      handleGetTimeList,
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
