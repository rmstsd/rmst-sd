#![allow(warnings)]

use rand::Rng;
use std::{clone, cmp::Ordering, collections::HashMap, io, net::ToSocketAddrs, string};

fn main() {
  println!("------------------ main start");

  // let mut x = 5;
  // println!("The value of x is: {x}");
  // x = 6;
  // println!("The value of x is: {x}");

  // const DD_UU: u32 = 5;
  // println!("{DD_UU}");

  let y = {
    let x = 3;
    x + 1
  };

  // game()

  let n = 4;
  if n == 4 {
    // println!("{n:?}");
  }

  let anss = five();
  // println!("{anss:?}");

  let mut count = 0;
  let a = loop {
    count += 1;

    if count > 10 {
      break count * 2;
    }
  };

  let a = (1, 2);
  let b = (1, 2);

  let eq = a == b;

  {
    let s1 = String::from("hello");
    let mut s2 = s1;

    let a = 5;
    let b = a;

    // s2.push_str("aaa");

    // println!("{s1:?}");
    // println!("{s2:?}");
  }

  {
    let s = String::from("asd");
    fn1(s.clone());
    // println!("{s:?}");

    let x = 2;
    fn2(x);
    // println!("{x:?}");
  }

  {
    let mut a = String::from("as");

    let r1 = &mut a;
    // println!("{r1:?}");

    let r2 = &mut a;
    // println!("{r2:?}");

    // println!("{r1:?} {r2:?}");

    let mut s = String::from("hello");

    let r2 = &s; // 没问题
    let r3 = &mut s; // 大问题

    // println!("{r2:?}");

    let size: usize = fun(&mut a);

    fn fun(s: &mut String) -> usize {
      s.push_str("aaa");

      s.len()
    }
  }
  let a = [1, 2, 3, 4, 5];
  let slice = &a[1..3];
  assert_eq!(slice, &[2, 3]);

  {
    // 数组

    let mut v = vec![100, 32, 57];
    for i in &mut v {
      *i += 1; // * 解引用运算符
    }

    // println!("{v:?}");
  }

  {
    // 枚举
    #[derive(Debug)]
    enum Ss {
      Int(i32),
      Tesx(String),
    }

    let v = vec![Ss::Int(3), Ss::Tesx(String::from("sdgfh收到开个会地方"))];

    println!("{:?}", v);
  }

  {
    println!(
      "------------ hash map
      "
    );
    // hash map

    let mut sc = HashMap::new();
    sc.insert("a", 88);
    sc.insert("b", 10);
    sc.insert("c", 10);

    // println!("-- {sc:?}");

    let ac = sc.get("a").unwrap();
    // println!("{ac:?}");

    let fname = String::from("aa");

    let mut hm = HashMap::new();
    hm.insert(fname, 8);

    let ss = hm.entry(String::from("aa")).or_insert(0);
    let ss = hm.entry(String::from("bb")).or_insert(2);

    let wd = "a";

    let sp = wd.split("");

    let mut mp: HashMap<&str, i32> = HashMap::new();

    for item in wd.split("") {
      if item == "" {
        continue;
      }

      let count = mp.entry(item).or_insert(0);
      *count += 1;
    }
    // println!("{mp:?}");
  }

  {
    let a = "a".to_string();
    let b = "b".to_string();
    let c = "c".to_string();

    let d = format!("{a}-{b}-{c}");

    println!("{a:?}");
    println!("{b:?}");
    println!("{c:?}");
    println!("{d:?}");
  }
}

fn first_word(s: &str) -> i32 {
  1
}
fn fn1(s: String) {
  // println!("{s:?}");
}

fn fn2(n: i32) {
  // println!("{n:?}");
}

fn five() -> i32 {
  let v = 90;

  if v > 9 && v < 11 {
    return 5;
  } else {
    6
  }
}

fn game() {
  println!("main start");

  let sn = rand::rng().random_range(1..=100);

  println!("sn - {sn}");

  loop {
    println!("请输入你的数字");

    let mut guess = String::new();

    io::stdin()
      .read_line(&mut guess)
      .expect("Failed to read line");

    println!("You guessed: {} 哈哈", guess.trim());

    let guess: u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => {
        println!("-- 你输入的不是数字");
        continue;
        // println!(err)
      }
    };

    match guess.cmp(&sn) {
      Ordering::Less => println!("太小"),
      Ordering::Greater => println!("太大"),
      Ordering::Equal => {
        println!("相等");
        break;
      }
    }
  }

  // let x = 1;
  // let y = 2;

  // println!("x = {x} and y + 2 = {y}", y + 2);
}
