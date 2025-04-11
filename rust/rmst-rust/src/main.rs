#![allow(warnings)]

mod study;
use study::{z_enum::en, z_match::z_match, z_result_option::rp, z_struct::st};

use rand::Rng;
use std::{cmp::Ordering, collections::HashMap, io::stdin};

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
    // st();
    // en();
    // z_match();
    rp()
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

    stdin().read_line(&mut guess).expect("Failed to read line");

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
