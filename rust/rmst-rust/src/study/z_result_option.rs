pub fn rp() {
  let vec = vec![1, 2, 3, 4, 5];
  let slice = &vec[1..4]; // 同样得到 &[i32]

  let ans = get_first(slice);
  println!("{ans:#?}");
}

fn get_first(items: &[i32]) -> Option<i32> {
  let first = items.first()?; // 如果是None，直接返回None
  Some(*first)
}
