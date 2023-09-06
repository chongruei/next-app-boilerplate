export async function getMessages(locale: string) {
  let localeDir = locale

  if (localeDir === 'zh-TW') localeDir = 'zh_TW'
  if (localeDir === 'zh-CN') localeDir = 'zh_CN'

  return (await import(`locales/${localeDir}.json`)).default
}
