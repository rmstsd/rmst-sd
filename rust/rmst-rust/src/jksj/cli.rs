use std::rc::Rc;

pub fn cli_index() {
  main();
}

fn main() {
  let mut data = vec![1, 2, 3];
  let data1 = vec![&data[0]];
  // data.push(4);
  &data1;

  let s1 = String::from("aa");
  let s2 = "b".to_string();

  let res: &str = max(&s1, &s2);

  dbg!(res);

  let result = get_max(&s1);
  println!("bigger one: {}", result);
}

fn get_max(s1: &String) -> &str {
  max(s1, "Cynthia")
}

fn max<'a>(s1: &'a str, s2: &'a str) -> &'a str {
  if (s1 > s2) {
    return &s1;
  };

  return &s2;
}

fn push_local(data: &mut Vec<u32>) {
  let v = 3;
  data.push(v);
}

fn sum(data: &Vec<u32>) -> u32 {
  data.iter().fold(0, |acc, item| acc + item)
}

fn find_pos(data: Vec<u32>, v: u32) -> Option<usize> {
  for (pos, item) in data.iter().enumerate() {
    if *item == v {
      return Some(pos);
    }
  }

  None
}
