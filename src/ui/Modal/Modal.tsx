import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import style from './Modal.module.scss'
import Portal from '../Portal/Portal'
import { classNames } from '../../utils/classNames'
import { Button } from '../Button'

interface ModalProps {
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
  hiddenClose?: boolean
  isSpecial?: boolean
  bigCLose?: boolean
}

function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    lazy,
    isSpecial = false,
    hiddenClose = false,
    bigCLose = false,
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [isMouned, setIsMouned] = useState(false)

  //для первого монтирования если передал lazy
  useEffect(() => {
    if (isOpen) {
      setIsMouned(true)
    }
  }, [isOpen])

  const timeRef = useRef<ReturnType<typeof setTimeout>>()

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timeRef.current = setTimeout(() => {
        setIsClosing(false)
        onClose()
      }, 300)
    }
  }, [onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
      document.body.classList.add(style.bodyOpen)
    }

    return () => {
      clearTimeout(timeRef.current)
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove(style.bodyOpen)
    }
  }, [isOpen, onKeyDown])

  //для первого монтирования

  if (lazy && !isMouned) {
    return null
  }
  const mods: Record<string, boolean | undefined> = {
    [style.open]: isOpen,
    [style.close]: isClosing,
    [style.special]: isSpecial,
  }

  return (
    <Portal>
      <div className={classNames(style.modal, mods, ['app_modal'])}>
        <div className={style.overlay} onClick={closeHandler}>
          <div className={style.content} onClick={onContentClick}>
            {bigCLose && (
              <Button onClick={closeHandler} className={style.btnClose}>
                {/* <CloseCrossSvg className={style.close} /> */}
              </Button>
            )}
            {hiddenClose && (
              <Button onClick={closeHandler} className={style.closeCross}>
                {/* <CrossModalSvg /> */}
              </Button>
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal
