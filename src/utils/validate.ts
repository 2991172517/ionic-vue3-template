//在ion-list添加ref
//在ion-item上添加需要验证的prop
//ref应该传xxxref.value进来

export function Validate(ref: any, data: any, rules: any) {
  let valid = true;
  const children = ref.$el.children;
  for (const child of children) {
    if (child.tagName == "ION-ITEM") {
      const required = rules[child.attributes.prop.value].required || false;
      const validator =
        rules[child.attributes.prop.value].validator || validateRequired;
      const val = data[child.attributes.prop.value].trim();

      child.classList.remove("ion-valid");
      child.classList.remove("ion-invalid");
      if (required) {
        if (validator(val)) {
          child.classList.add("ion-valid");
        } else {
          child.classList.add("ion-invalid");
          child.classList.add("ion-touched");
          valid = false;
        }
      }
    }
  }

  return valid;
}

//默认验证方法
function validateRequired(val: any) {
  return val ? true : false;
}
