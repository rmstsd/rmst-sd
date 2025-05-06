use std::{
  any::Any,
  ffi::OsString,
  fs::{metadata, read_dir},
  path::Path,
};
use tokio::time::{Duration, Instant, sleep};

async fn set_time_out(f: impl Fn() -> (), d: Duration) {
  sleep(d).await;
  f();
}

#[tokio::main]
async fn test() {
  sleep(Duration::from_secs(3)).await;
  println!("aaaa");
}

fn main() {
  test();

  dbg!(&22);

  // 执行外部命令示例
  // let output = Command::new(r"D:\VS Code\Code.exe")
  //   .arg(r"E:\rmst-sd\demo-scase")
  //   .output()
  //   .expect("Failed to execute command");

  // if output.status.success() {
  //   println!("打开成功");
  // } else {
  //   println!("打开失败");
  // }

  return;

  let dir = r"E:\";

  let path = Path::new(dir);
  let r = metadata(path).expect("路径错误");
  dbg!(&r.is_dir());

  let ans: std::fs::ReadDir = read_dir(path).expect("msg");

  let ans: Vec<String> = ans
    .into_iter()
    .map(|item| {
      let nv_item = item.unwrap().file_name();
      nv_item.to_string_lossy().to_string()
    })
    .filter(|item| vec!["rmst", "trick"].iter().any(|jk| item.contains(jk)))
    .collect();

  dbg!(&ans);

  // for entry in ans {
  //   if let Ok(entry) = entry {
  //     let file_name = entry.file_name();

  //     file_name

  //     // println!("File or directory name: {}", file_name.to_string_lossy());
  //   }
  // }

  return;

  assert_eq!(None.unwrap_or(1), 1);

  let x: Option<u32> = None;
  let y: Option<u32> = Some(12);

  assert_eq!(x.unwrap_or_default(), 0);
  assert_eq!(y.unwrap_or_default(), 12);
}

use port_killer::kill;
use serde_json::{Value, from_value, json};

fn maiaan() {
  let json_value: Value = json!([1, 2, "three", 4]);

  match from_value::<Vec<i32>>(json_value) {
    Ok(vec) => println!("Success: {:?}", vec),
    Err(e) => println!("Error: {}", e),
  }
  // 输出: Error: invalid type: string "three", expected i32 at line 1 column 10
}

use std::process::Command;
fn kill_process_by_port(port: u16) -> Result<(), std::io::Error> {
  #[cfg(target_os = "windows")]
  {
    // 在 Windows 上查找占用指定端口的进程 ID
    let output = Command::new("cmd")
      .args(&["/C", &format!("netstat -ano | findstr :{}", port)])
      .output()?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    for line in output_str.lines() {
      let parts: Vec<&str> = line.split_whitespace().collect();
      if parts.len() >= 5 {
        let pid_str = parts[4];
        if let Ok(pid) = pid_str.parse::<u32>() {
          // 杀死找到的进程
          Command::new("taskkill")
            .args(&["/F", "/PID", &pid.to_string()])
            .output()?;
        }
      }
    }
  }
  #[cfg(target_os = "linux")]
  {
    // 在 Linux 上查找占用指定端口的进程 ID
    let output = Command::new("sh")
      .arg("-c")
      .arg(&format!("lsof -t -i:{}", port))
      .output()?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    for line in output_str.lines() {
      if let Ok(pid) = line.parse::<u32>() {
        // 杀死找到的进程
        Command::new("kill")
          .args(&["-9", &pid.to_string()])
          .output()?;
      }
    }
  }
  #[cfg(target_os = "macos")]
  {
    // 在 macOS 上查找占用指定端口的进程 ID
    let output = Command::new("sh")
      .arg("-c")
      .arg(&format!("lsof -t -i:{}", port))
      .output()?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    for line in output_str.lines() {
      if let Ok(pid) = line.parse::<u32>() {
        // 杀死找到的进程
        Command::new("kill")
          .args(&["-9", &pid.to_string()])
          .output()?;
      }
    }
  }
  Ok(())
}
