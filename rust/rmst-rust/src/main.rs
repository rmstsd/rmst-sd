mod study;
use std::time::Instant;

use enigo::*;
use study::z_enum::enm;
use tokio::time::{Duration, sleep, timeout};
// #[tokio::main]
fn main() {
  println!("Before sleep");

  // let closure = || println!("异步任务");
  // let hand = tokio::spawn(async move {
  //   sleep(Duration::from_millis(1000)).await;
  //   closure();
  // });

  // hand.abort();

  // // 主线程继续执行其他逻辑
  // println!("Main thread continues");

  // // 这里为了确保主线程不会过早退出，简单等待1500毫秒
  // sleep(Duration::from_millis(3000)).await;

  enm();
}
