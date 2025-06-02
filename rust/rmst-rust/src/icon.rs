use reqwest;
use reqwest::Client;
use std::io::Cursor;

pub async fn download_icon(url: &str) -> Result<(), Box<dyn std::error::Error>> {
  // 使用Tauri的HTTP客户端下载图片
  let response = Client::new().get(url).send().await?;

  // 获取图片字节数据
  let bytes = response.bytes().await?.to_vec();

  // 从字节创建Image对象
  // let image = Image::from_bytes(&bytes)?;

  convert_image_to_png_bytes(url).await;

  Ok(())
}

/// 将网络图片转换为PNG格式的字节数据
pub async fn convert_image_to_png_bytes(url: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
  // 下载图片
  // let response = reqwest::get(url).await?;
  // let image_data = response.bytes().await?;
  // 使用Tauri的HTTP客户端下载图片
  let response = Client::new().get(url).send().await?;

  // 获取图片字节数据
  let bytes = response.bytes().await?.to_vec();
  // 读取图片
  let img = image::load_from_memory(&bytes).unwrap();

  dbg!(&22);

  // 转换为PNG格式并存储为字节
  let mut png_bytes = Vec::new();
  img.write_to(&mut Cursor::new(&mut png_bytes), image::ImageFormat::Png)?;

  Ok(png_bytes)
}
