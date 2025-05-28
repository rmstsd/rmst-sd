use reqwest::Client;

pub async fn download_icon(url: &str) -> Result<(), Box<dyn std::error::Error>> {
  // 使用Tauri的HTTP客户端下载图片
  let response = Client::new().get(url).send().await?;

  // 获取图片字节数据
  let bytes = response.bytes().await?.to_vec();

  // 从字节创建Image对象
  // let image = Image::from_bytes(&bytes)?;

  Ok(())
}
