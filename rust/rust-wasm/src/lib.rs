// 库包
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  // pub fn alert(s: &str);
  // pub fn confirm(s: &str);
  pub fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(nums: Vec<u32>) -> Vec<u32> {
  // confirm(&format!("confirm Hello, {}!", name));

  let mut nums = nums;

  // log(&format!("{}", nums));

  return nums;
}
