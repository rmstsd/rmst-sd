#![allow(warnings)]

use serde::{Deserialize, Deserializer, Serialize, de};
use serde_json::{Value, json};
#[derive(Debug, Serialize, Deserialize)]
struct EdPath {
  path: String,
}

#[derive(Debug, Serialize, Deserialize)]
enum SorO {
  String(String),
  edPath(EdPath),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SettingData {
  cmdPath: String,
  editorPaths: Option<Vec<String>>,
  projectPaths: Option<Vec<String>>,
  notes: Option<Vec<String>>,
  url: Vec<String>,
}

// 自定义反序列化器，过滤无效的 URL
fn filter_invalid_url<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
where
  D: Deserializer<'de>,
{
  let url = Deserialize::deserialize(deserializer)?;
  dbg!(&url);
  Ok(url)
  // // 只接受以 "http" 开头的 URL，否则返回默认值
  // if url.starts_with("http") {
  //   Ok(url)
  // } else {
  //   Ok("我问问".to_string())
  //   // Err(serde::de::Error::custom("武侠"))
  // }
}

// 可以通过该函数兼容不同类型或者直接报错
fn deserialize_with_string<'de, D>(deserializer: D) -> Result<i64, D::Error>
where
  D: Deserializer<'de>,
{
  let v: Value = Deserialize::deserialize(deserializer)?;

  if v.is_string() {
    let r = v.as_str().ok_or(de::Error::custom("转换失败"))?;
    let r: i64 = r.parse().map_err(|e| de::Error::custom("转换失败"))?;
    Ok(r)
  } else if v.is_i64() {
    let r = v.as_i64().ok_or(de::Error::custom("转换失败"))?;
    Ok(r)
  } else {
    Ok(0)
  }
}

fn main() {
  dbg!(&"start");

  set_window_icon(
    "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png"
      .to_string(),
  );
  return;

  let jsonVal: Value = json!({
    "cmdPath": "%LOCALAPPDATA%\\Microsoft\\WindowsApps\\wt.exe",
    "editorPaths": [
      // {
      //   "path": "D:\\VS Code\\Code.exe"
      // }
    ],
    "projectPaths": [
      "E:\\",
    ],
    "notes": [
      "2864617610@qq.com",

    ],
    "historyOpenedUrls": [
      "https://chat.deepseek.com/"
    ],
    "count": 7,
    "url": "chat.deepseek.com/"
  });

  let settingData: SettingData = serde_json::from_value(jsonVal).unwrap();

  dbg!(&settingData);

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
}

// use image::ImageFormat::Png;
// use image::load_from_memory;
use reqwest::get;
use std::io::Cursor;
// use tauri::{AppHandle, Manager, WindowBuilder};

async fn set_window_icon(url: String) -> Result<(), String> {
  dbg!(&1111);

  // 从 URL 下载图片
  // let response = get(url).await.map_err(|e| e.to_string())?;
  // let bytes = response.bytes().await.map_err(|e| e.to_string())?;
  // dbg!(&13);
  // dbg!(&bytes);

  // 使用 image 库解码图片
  // let img = load_from_memory(&bytes).map_err(|e| e.to_string())?;
  // let rgba = img.to_rgba8();
  // let (width, height) = img.dimensions();

  // // 创建 Tauri 可用的图标格式
  // let icon = tauri::Icon::Rgba {
  //   rgba: rgba.into_raw(),
  //   width,
  //   height,
  // };

  // // 获取主窗口并设置图标
  // let window = app.get_window("main").ok_or("Main window not found")?;
  // window.set_icon(Some(icon)).map_err(|e| e.to_string())?;

  use reqwest;
  use tokio::io::AsyncWriteExt;

  #[tokio::main]
  async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 在线图片的 URL
    let image_url =
      "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png";

    // 发送 HTTP 请求获取图片
    let response = reqwest::get(image_url).await?;

    // 检查响应状态
    if !response.status().is_success() {
      return Err(format!("请求失败: {}", response.status()).into());
    }

    // 将响应内容转换为字节数组
    let image_bytes = response.bytes().await?;

    // 打印字节数组的长度
    println!("成功获取图片，字节长度: {}", image_bytes.len());

    Ok(())
  }

  Ok(())
}
