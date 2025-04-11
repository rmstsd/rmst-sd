pub fn z_match() {
  #[derive(Debug)] // 这样可以立刻看到州的名称
  enum UsState {
    Alabama,
    Alaska,
    // --snip--
  }

  enum Coin {
    Penny,
    Nickl,
    Dime,
    Quarter(UsState),
  }

  let ans = calInC(Coin::Penny);
  println!("{ans:#?}");

  let ans2 = calInC(Coin::Quarter(UsState::Alabama));
  println!("--2 -> {ans2:#?}");

  fn calInC(coin: Coin) -> u8 {
    match coin {
      Coin::Penny => {
        println!("- penny");
        let nn = 1;
        return nn;
      }
      Coin::Nickl => 2,
      Coin::Dime => 3,
      Coin::Quarter(state) => {
        println!("state-> {state:#?}");

        66
      }
    }
  }

  println!("----------------------");

  fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
      None => None,
      Some(val) => Some(val + 1),
    }
  }

  let f = Some(5);
  let six = plus_one(f);
  println!("{six:#?}");

  let non = plus_one(None);
  println!("{non:#?}");

  println!("-------------------");

  let dice = 88;
  match dice {
    3 => {
      println!("{dice:#?}");
    }
    7 => {
      println!("{dice:#?}");
    }
    _ => {
      println!("下划线");
    }
  }

  let config_max = Some(3u8);
  if let Some(max) = config_max {
    println!("The maximum is configured to be {max}");
  }
}
