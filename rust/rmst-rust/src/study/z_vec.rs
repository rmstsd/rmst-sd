pub fn z_vec() {
  let num = 55;
  let mut list = vec![1, 2, 3, num];

  // let v_squared = list.iter().map(|x: &i32| x * x).collect();
  // let v_even = list.iter().filter(|x| *x % 2 == 0).collect();

  println!("{num:#?}");

  for item in &mut list {
    *item += 1; // * 解引用运算符
  }

  println!("{list:#?}");

  println!("{num:#?}");
}
