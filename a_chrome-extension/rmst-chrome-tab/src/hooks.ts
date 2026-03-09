import { useState, useEffect } from 'react'

// 工具函数：带过期时间的 localStorage 操作
const storageUtils = {
  /**
   * 设置 localStorage（带过期时间）
   * @param key 存储键名
   * @param value 存储值（支持任意可序列化类型）
   * @param expire 过期时间（单位：秒），不传则永久有效
   */
  set: (key: string, value: any, expire?: number) => {
    try {
      const data = {
        value,
        // 过期时间戳：当前时间 + 过期秒数（转毫秒），不传则为 null
        expire: expire ? Date.now() + expire * 1000 : null
      }
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('localStorage 设置失败：', error)
    }
  },

  /**
   * 获取 localStorage 值
   * @param key 存储键名
   * @returns 存储值（过期则返回 null）
   */
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      const data = JSON.parse(item)
      // 无过期时间 || 未过期 → 返回值
      if (data.expire === null || Date.now() < data.expire) {
        return data.value
      }

      // 已过期 → 删除数据并返回 null
      localStorage.removeItem(key)
      return null
    } catch (error) {
      console.error('localStorage 获取失败：', error)
      localStorage.removeItem(key) // 解析失败时清理脏数据
      return null
    }
  },

  /**
   * 删除指定 localStorage
   * @param key 存储键名
   */
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('localStorage 删除失败：', error)
    }
  },

  /**
   * 清空所有 localStorage
   */
  clear: () => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('localStorage 清空失败：', error)
    }
  }
}

/**
 * React Hooks：带过期时间的 localStorage
 * @param key 存储键名
 * @param initialValue 初始值
 * @param expire 过期时间（单位：秒），不传则永久有效
 * @returns [value, setValue, removeValue]：值、设置方法、删除方法
 */
function useLocalStorageWithExpire<T>(
  key: string,
  initialValue: T,
  expire?: number
): [T, (value: T | ((prevValue: T) => T)) => void, () => void] {
  // 初始化状态：优先从 localStorage 读取，无则用初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    const value = storageUtils.get(key)
    return value !== null ? (value as T) : initialValue
  })

  // 设置值：更新状态 + 写入 localStorage
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // 处理函数式更新
      const newValue = value instanceof Function ? value(storedValue) : value
      setStoredValue(newValue)
      storageUtils.set(key, newValue, expire)
    } catch (error) {
      console.error('设置 localStorage 失败：', error)
    }
  }

  // 删除值：重置状态 + 移除 localStorage
  const removeValue = () => {
    setStoredValue(initialValue)
    storageUtils.remove(key)
  }

  // 监听 key 变化（可选）
  useEffect(() => {
    const value = storageUtils.get(key)
    if (value !== null) {
      setStoredValue(value as T)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}
