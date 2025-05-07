pub fn enm() {
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

  // dbg!(f);

  {
    let s = "世 Hello, 世界!";
    let chars: Vec<char> = s.chars().collect();

    // println!("{chars:#?}");

    if (!chars.is_empty()) {
      // println!("第一个字符是: {}", chars[0]);
    }
  }

  #[derive(Debug)]
  enum IpAddrKind {
    v4(u8, u8, u8, u8),
    v6(String),
  }

  let four = IpAddrKind::v4(11, 244, 55, 66);
  let six = IpAddrKind::v6(String::from("33:44"));

  println!("{four:#?}");
  println!("{six:#?}");

  #[derive(Debug)]
  enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),              // 元组
    ChangeColor(i32, i32, i32), // 元组
  }

  impl Message {
    fn call(&self) {
      println!("self- {self:#?}");
    }
  }

  let m = Message::Write(String::from("hello"));
  m.call();

  m;

  let some_num = Some(5);
  dbg!(some_num.unwrap());
  some_num;
  println!("{some_num:?} {}", some_num.unwrap());

  let some_str = Some("ui");
  println!("{some_str:#?}");

  let mut abc: Option<bool> = None;
  abc = Some(true);
  println!("{abc:#?}");
}
