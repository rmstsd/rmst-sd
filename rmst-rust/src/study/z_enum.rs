pub fn en() {
  println!("{:?}", "en");

  // 枚举
  #[derive(Debug)]
  enum Ss {
    Int(i32),
    Tesx(String),
  }

  let v = vec![Ss::Int(3), Ss::Tesx(String::from("sdgfh收到开个会地方"))];

  // println!("{:?}", v);
}
