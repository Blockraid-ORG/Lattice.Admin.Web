'use client'
import { Icon } from '@/components/icon'
import useSideMenu from '@/store/useSideMenu'

export default function BtnCollapseMenu() {
  const { setIsOpen, isOpen } = useSideMenu()
  return (
    <button onClick={setIsOpen} className='hidden md:block'>
      {
        isOpen ? (<Icon className='text-2xl' name={'line-md:menu-fold-left'} />) : (<Icon className='text-2xl' name={'line-md:menu-fold-right'} />)
      }
    </button>
  )
}
