#![allow(warnings)]

fn main() {
  let mut s: String = String::from("Hello, world!");

  let rs: &str;

  let r4 = &s;
  rs = ff(r4);

  dbg!(&rs);

  fn ff<'a>(r4: &'a str) -> &'a str {
    r4
  }
}
