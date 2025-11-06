import { useEffect, useState } from 'react'
import style from './BlockOrientation.module.scss'
import { on } from '@telegram-apps/sdk-react'

export function BlockOrientation() {
  const [block, setBlock] = useState(window.innerHeight < window.innerWidth)

  useEffect(() => {
    on('viewport_changed', (e) => {
      setBlock(e.height < e.width)
    })
  }, [])

  if (!block) return null

  return (
    <div className={style.blockOrientation}>
      <span>Поверните ваш телефон</span>
    </div>
  )
}
