'use client'
import {useState , useRef , useEffect} from 'react'
import {FaAngleDown , FaX} from 'react-icons/fa6'
import { useDetectClickOutside } from 'react-detect-click-outside';
import moves from '@/utils/moves'
import styles from './input-dropdown.module.scss'

export default (props) => {
  const [dropdown , setDropdown] = useState(moves)
  const [status , setStatus] = useState(false)
  const [seletectedItem , setSelectedItem] = useState("")
  const [text , setText] = useState("")
  const inputRef = useRef()
  const closeDropdown = () => setStatus(false)
  const componentRef = useDetectClickOutside({ onTriggered: closeDropdown });

  const selectItem = async (item) => {
    await setSelectedItem(item)
    setStatus(false)
    props.selectedData(item)
  }

  useEffect(() => {
    if(!status)
      setText("")
  } , [status])

  useEffect(() => {
    setDropdown(moves.filter(item => item.value.toLowerCase().includes(text)))
  } , [text])

  return (
    <div className={`relative ${status ? 'cursor-text' : 'cursor-pointer'}`} onClick={() => setStatus(true)} ref={componentRef}>
      <div className={styles.inputDropdown}>
        {
          status ? 
          <div className='flex-1 w-[100%]'>
            <input ref={inputRef} type="text" className='w-[100%] text-white bg-black border-none outline-none bg-transparent' onChange={(e) => setText(e.target.value)} autoFocus />
          </div> : <div>{seletectedItem ? seletectedItem : 'Search...'}</div>
        }
        <div>
          { status ? <FaX onClick={() => setStatus(false)} className='cursor-pointer text-white' /> : <FaAngleDown /> }
        </div>
      </div>
      {
      status ? 
        <div className='border border-blue-800 rounded-lg mt-2 absolute w-[100%] z-10 top-10 left-0 bg-black'>
          {text && <div onClick={() => selectItem(text)} className='hover:bg-slate-900 transition duration-200 cursor-pointer p-2 rounded-lg w-100'><span>{text}</span></div> }
          {dropdown.map((item , id) => <div key={id} onClick={() => {selectItem(item)}} className='hover:bg-slate-900 transition duration-200 cursor-pointer p-2 rounded-lg w-100'><span>{item}</span></div>)}
        </div> : null
      }
    </div>
  )
}

// cursor-pointer rounded-lg bg-blue-950 border border-blue-300 text-blue-300 px-2 py-1 text-sm inline-block m-2