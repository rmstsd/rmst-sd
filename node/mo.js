import { MongoClient } from 'mongodb'

async function main() {
  // MongoDB 连接 URI
  const uri = 'mongodb://localhost:10088' // 请根据你的 MongoDB 服务器地址进行修改

  // 创建一个新的 MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    // 连接到 MongoDB 服务器
    await client.connect()

    console.log('成功连接到服务器')

    // 指定数据库
    const database = client.db('runoob')

    // 这里可以执行数据库操作，例如创建集合或插入文档
    const collection = database.collection('exampleCollection')
    const doc = { name: 'Example', type: 'Test' }
    const result = await collection.insertOne(doc)

    console.log(`新文档已创建，ID 为: ${result.insertedId}`)
  } finally {
    // 确保在完成后关闭连接
    await client.close()
  }
}

main().catch(console.error)
