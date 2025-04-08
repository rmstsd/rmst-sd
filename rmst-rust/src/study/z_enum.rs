pub fn en() {
  // 枚举
  #[derive(Debug)]
  enum Ss {
    Int(i32),
    Tesx(String),
  }

  let v = vec![Ss::Int(3), Ss::Tesx(String::from("sdgfh收到开个会地方"))];

  // println!("{:?}", v);

  let ss = "asd";
  let f = ss.chars().next();

  dbg!(f);

  {
    let s = "世 Hello, 世界!";
    let chars: Vec<char> = s.chars().collect();

    println!("{chars:#?}");

    if (!chars.is_empty()) {
      println!("第一个字符是: {}", chars[0]);
    }
  }
}
