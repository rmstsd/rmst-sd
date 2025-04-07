use std::{clone, string};
#[derive(Debug)]
struct Rgb(i32, i32, i32);

pub fn st() {
  let c = "d";

  let u1 = build_user(String::from("人美声甜"), String::from("rmst@qq.com"));
  println!("{u1:?}");

  let u2 = User {
    username: "aa".to_string(),
    ..u1
  };

  u1.active;

  println!("{u2:?}");

  let red = Rgb(255, 0, 0);
  println!("{red:?}");

  {
    // struct U2 {
    //   name: &str, // 需要生命周期
    // }
    // let u2 = U2 { name: "asdasd" };
  }

  stArea()
}

fn stArea() {
  println!("-----------------");

  #[derive(Debug)]
  struct Rect {
    width: u32,
    height: u32,
  }

  impl Rect {
    fn square(size: u32) -> Self {
      Self {
        width: size,
        height: size,
      }
    }

    // 在 impl 里定义的函数都是关联函数（associated functions）
    fn area2(&self) -> u32 {
      self.width * self.height
    }

    fn can_hold(&self, other: &Rect) -> bool {
      self.width > other.width && self.height > other.height
    }
  }

  let rect = Rect {
    width: 10,
    height: 10,
  };

  let rect2 = Rect {
    width: 50,
    height: 5,
  };

  // println!("{:?}", area(&rect));

  // println!("{rect:#?}");

  let ans = rect.area2();
  dbg!(ans);

  // println!("{rect:#?}");
  dbg!(rect2.can_hold(&rect));

  println!("------");

  let zzre = Rect::square(400);
  dbg!(zzre);

  fn area(rect: &Rect) -> u32 {
    rect.width * rect.height
  }
}

#[derive(Debug)]
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u64,
}
#[derive(Debug)]
struct Love {
  aa: bool,
  bb: bool,
}

fn build_user(username: String, email: String) -> User {
  User {
    active: true,
    username,
    email,
    sign_in_count: 1,
  }
}
