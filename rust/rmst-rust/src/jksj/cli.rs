pub fn cli_index() {
  main();
}

fn main() {
  let data = vec![10, 42, 9, 8];
  let v = 42;
  if let Some(pos) = find_pos(data, v) {
    println!("Found {} at {}", v, pos);
  };

  v;
}

fn find_pos(data: Vec<u32>, v: u32) -> Option<usize> {
  for (pos, item) in data.iter().enumerate() {
    if *item == v {
      return Some(pos);
    }
  }

  None
}
