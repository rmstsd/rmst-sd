pub fn vec() {
  let mut v = vec![100, 32, 57];
  for i in &mut v {
    *i += 1; // * 解引用运算符
  }
}
