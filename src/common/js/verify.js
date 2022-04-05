var TYPE = {
  address: "客户地址",
  name: "客户姓名",
  phone: "客户联系电话",  
  mianji: "房屋面积",
  style: "装修风格",
  jieduan: "装修阶段",
};
/**
 * 验证
 *
 * @param {string} key 类型
 * @param {string} value 值
 * @returns {object}
 */
export function verify(key, value) {
  var result = {
    value: "", //  返回的错误值
    done: true //  返回的状态
  };
  if (value === "") {
    result.done = false;
    result.value = "请输入" + TYPE[key];
    return result;
  }
  //   if (typeof rule[key] === "function") {
  //     var verify = rule[key](value);
  //     if (typeof verify === "string") {
  //       result.done = false;
  //       result.value = verify;
  //     }
  //   }
  return result;
}
